/**
 * Floating 1winex AI chat widget UI.
 * Mounted lazily after idle — see js/chat-widget-loader.js.
 */
import { MAX_MESSAGE_LENGTH, WIDGET_ID } from './constants';
import { streamChat } from './api';
import { collectPageContext } from './context';
import { createFocusTrap } from './focus-trap';
import { applyExternalLinkAttrs, renderMarkdown } from './markdown';
import { loadMessages, loadTheme, loadUnread, saveMessages } from './storage';
import { getSuggestedQuestions } from './suggestions';
import { injectStyles } from './styles';
import type { ChatMessage } from './types';

function uid(): string {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function formatTime(ts: number): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(ts));
  } catch {
    return '';
  }
}

const ICONS = {
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
};

/** Support-agent avatar — relative to js/chat-widget.js, not host-root /images. */
const ANNA_AVATAR_SRC = new URL(/* @vite-ignore */ '../images/chat/anna.webp?v=3', import.meta.url).href;

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function mountChatWidget(): void {
  if (document.getElementById(WIDGET_ID)) return;

  injectStyles();

  let messages: ChatMessage[] = loadMessages();
  let open = false;
  let abort: AbortController | null = null;
  let streamingId: string | null = null;

  const root = document.createElement('div');
  root.id = WIDGET_ID;
  root.className = 'aw-chat';
  root.dataset.theme = loadTheme();
  root.setAttribute('data-nosnippet', '');
  // Toggle stays accessible when closed; panel is hidden from AT until open.

  root.innerHTML = `
    <div class="aw-chat__panel" role="dialog" aria-modal="true" aria-labelledby="aw-chat-title" aria-hidden="true" hidden>
      <div class="aw-chat__header">
        <div class="aw-chat__brand">
          <img class="aw-chat__brand-avatar" src="${ANNA_AVATAR_SRC}" alt="Anna" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">Anna</strong>
            <span>Ask about 1win bonuses, payouts &amp; the app</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="Close chat">${ICONS.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="${MAX_MESSAGE_LENGTH}" placeholder="Ask a question…" aria-label="Message"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="Send message">Send</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="Open chat with Anna" aria-expanded="false" aria-controls="aw-chat-panel">
      ${ICONS.chat}
      <span class="aw-chat__badge" hidden aria-hidden="true"></span>
    </button>
  `;

  document.body.appendChild(root);

  const panel = root.querySelector('.aw-chat__panel') as HTMLElement;
  panel.id = 'aw-chat-panel';
  const messagesEl = root.querySelector('.aw-chat__messages') as HTMLElement;
  const form = root.querySelector('.aw-chat__composer') as HTMLFormElement;
  const textarea = form.querySelector('textarea') as HTMLTextAreaElement;
  const sendBtn = form.querySelector('.aw-chat__send') as HTMLButtonElement;
  const toggleBtn = root.querySelector('.aw-chat__toggle') as HTMLButtonElement;
  const badgeEl = toggleBtn.querySelector('.aw-chat__badge') as HTMLElement;

  const trap = createFocusTrap(panel);
  let lastFocus: HTMLElement | null = null;
  /** Bumped per paint; stale async markdown results must not overwrite newer DOM. */
  const paintGenById = new Map<string, number>();
  let streamPaintRaf = 0;
  /** Unread assistant reply while the panel is closed (persisted across pages). */
  let unread = loadUnread();

  function persist() {
    saveMessages(
      messages.filter((m) => m.status !== 'streaming'),
      unread
    );
  }

  function scrollToUserMessage(userId: string) {
    const el = messagesEl.querySelector(`[data-id="${userId}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function syncUnreadBadge() {
    const show = unread && !open;
    root.classList.toggle('has-unread', show);
    badgeEl.hidden = !show;
    badgeEl.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (open) {
      toggleBtn.setAttribute('aria-label', 'Close chat with Anna');
    } else if (show) {
      toggleBtn.setAttribute('aria-label', 'Open chat with Anna — new message');
    } else {
      toggleBtn.setAttribute('aria-label', 'Open chat with Anna');
    }
  }

  function markUnread() {
    if (open) return;
    unread = true;
    persist();
    syncUnreadBadge();
  }

  function setOpen(next: boolean) {
    open = next;
    root.classList.toggle('is-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');

    if (open) {
      unread = false;
      persist();
      lastFocus = document.activeElement as HTMLElement;
      // Trap focuses the close button; skip textarea.focus() (opens mobile keyboard).
      trap.activate();
    } else {
      trap.deactivate();
      (lastFocus || toggleBtn).focus();
    }
    syncUnreadBadge();
  }

  async function paintMessage(msg: ChatMessage, el?: HTMLElement) {
    const gen = (paintGenById.get(msg.id) ?? 0) + 1;
    paintGenById.set(msg.id, gen);

    let node = el;
    if (!node) {
      node = document.createElement('div');
      node.className = `aw-msg aw-msg--${msg.role}`;
      node.dataset.id = msg.id;
      messagesEl.appendChild(node);
    }

    const bubble = document.createElement('div');
    bubble.className = 'aw-msg__bubble';

    if (msg.role === 'assistant') {
      if (msg.status === 'streaming' && !msg.content) {
        bubble.innerHTML = `<span class="aw-typing" aria-label="Anna is typing"><i></i><i></i><i></i></span>`;
      } else {
        try {
          const html = await renderMarkdown(msg.content || '');
          if (paintGenById.get(msg.id) !== gen) return;
          bubble.innerHTML = html;
          applyExternalLinkAttrs(bubble);
        } catch {
          if (paintGenById.get(msg.id) !== gen) return;
          bubble.textContent = msg.content || '';
        }
      }
    } else {
      bubble.textContent = msg.content;
    }

    if (paintGenById.get(msg.id) !== gen) return;

    const meta = document.createElement('div');
    meta.className = 'aw-msg__meta';
    meta.textContent = formatTime(msg.createdAt);

    node.replaceChildren(bubble, meta);
  }

  async function renderAll(options?: { anchorUserId?: string }) {
    const prevScrollTop = messagesEl.scrollTop;
    messagesEl.replaceChildren();
    if (messages.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'aw-chat__empty';
      const chips = getSuggestedQuestions().map(
        (q) =>
          `<button type="button" class="aw-chat__suggest" data-suggest="${escapeAttr(q)}">${escapeAttr(q)}</button>`
      ).join('');
      empty.innerHTML = `
        <strong>Hi, I&rsquo;m Anna — how can I help?</strong>
        <p>Ask about casino reviews, bonuses, or payments — or pick a suggestion:</p>
        <div class="aw-chat__suggests" role="group" aria-label="Suggested questions">${chips}</div>
      `;
      messagesEl.appendChild(empty);
      return;
    }
    for (const m of messages) {
      await paintMessage(m);
    }
    if (options?.anchorUserId) {
      scrollToUserMessage(options.anchorUserId);
    } else {
      // Keep viewport stable across history remounts (initial load).
      messagesEl.scrollTop = prevScrollTop;
    }
  }

  function setComposerStreaming(active: boolean) {
    sendBtn.className = 'aw-chat__send';
    sendBtn.textContent = 'Send';
    sendBtn.type = 'submit';
    sendBtn.disabled = active;
    sendBtn.setAttribute('aria-label', 'Send message');
    sendBtn.onclick = null;
  }

  function paintAssistantNow(assistant: ChatMessage) {
    if (streamPaintRaf) {
      cancelAnimationFrame(streamPaintRaf);
      streamPaintRaf = 0;
    }
    const el = messagesEl.querySelector(`[data-id="${assistant.id}"]`) as HTMLElement | null;
    return paintMessage(assistant, el || undefined);
  }

  /** Coalesce streaming paints to one per frame; assistant content is mutated in place. */
  function scheduleAssistantPaint(assistant: ChatMessage) {
    if (streamPaintRaf) return;
    streamPaintRaf = requestAnimationFrame(() => {
      streamPaintRaf = 0;
      void paintAssistantNow(assistant);
    });
  }

  async function runAssistant(history: ChatMessage[]) {
    const assistant: ChatMessage = {
      id: uid(),
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
      status: 'streaming',
    };
    messages = [...history, assistant];
    streamingId = assistant.id;
    setComposerStreaming(true);
    // Append placeholder in place — avoid full remount flicker.
    await paintMessage(assistant);
    const lastUser = [...history].reverse().find((m) => m.role === 'user');
    if (lastUser) scrollToUserMessage(lastUser.id);

    abort = new AbortController();
    const payload = {
      messages: history
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .filter((m) => m.status !== 'error')
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) })),
      pageContext: collectPageContext(),
    };

    await streamChat(
      payload,
      {
        onDelta: (delta) => {
          assistant.content += delta;
          assistant.status = 'streaming';
          scheduleAssistantPaint(assistant);
          // First tokens while closed → unread badge on the toggle.
          if (assistant.content) markUnread();
        },
        onDone: () => {
          const hadContent = Boolean(assistant.content);
          assistant.status = hadContent ? 'ok' : 'error';
          if (!hadContent) assistant.content = 'No response received.';
          streamingId = null;
          abort = null;
          setComposerStreaming(false);
          persist();
          // Always re-paint final text so a stale streaming paint cannot leave truncated UI.
          void paintAssistantNow(assistant);
          markUnread();
        },
        onError: (errMsg) => {
          assistant.content = errMsg;
          assistant.status = 'error';
          streamingId = null;
          abort = null;
          setComposerStreaming(false);
          persist();
          void paintAssistantNow(assistant);
          markUnread();
        },
      },
      abort.signal
    );
  }

  async function sendUser(text: string) {
    const content = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content || streamingId) return;

    const empty = messagesEl.querySelector('.aw-chat__empty');
    if (empty) empty.remove();

    const user: ChatMessage = {
      id: uid(),
      role: 'user',
      content,
      createdAt: Date.now(),
      status: 'ok',
    };
    const next = [...messages, user];
    messages = next;
    persist();
    await paintMessage(user);
    await runAssistant(next);
  }

  // —— Events ——
  function spinToggle() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Drop enter so click spin isn't blocked by the one-shot appear animation
    toggleBtn.classList.remove('aw-chat__toggle--spin', 'aw-chat__toggle--enter');
    // Restart animation on rapid clicks
    void toggleBtn.offsetWidth;
    toggleBtn.classList.add('aw-chat__toggle--spin');
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    toggleBtn.classList.add('aw-chat__toggle--enter');
  }

  toggleBtn.addEventListener('animationend', (e) => {
    if (e.animationName === 'aw-toggle-spin') {
      toggleBtn.classList.remove('aw-chat__toggle--spin');
    }
    if (e.animationName === 'aw-toggle-enter') {
      toggleBtn.classList.remove('aw-chat__toggle--enter');
    }
  });

  toggleBtn.addEventListener('click', () => {
    spinToggle();
    setOpen(!open);
  });

  root.querySelector('[data-action="close"]')!.addEventListener('click', () => setOpen(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textarea.value;
    textarea.value = '';
    void sendUser(text);
  });

  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  messagesEl.addEventListener('click', async (e) => {
    const suggestBtn = (e.target as HTMLElement).closest('.aw-chat__suggest') as HTMLButtonElement | null;
    if (suggestBtn) {
      const q = suggestBtn.getAttribute('data-suggest') || suggestBtn.textContent || '';
      void sendUser(q);
      return;
    }

    const btn = (e.target as HTMLElement).closest('.aw-code-copy') as HTMLButtonElement | null;
    if (!btn) return;
    const pre = btn.closest('pre');
    const code = pre?.querySelector('code');
    const text = code?.textContent || '';
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
      setTimeout(() => {
        btn.textContent = 'Copy';
      }, 1200);
    } catch {
      btn.textContent = 'Failed';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
    }
  });

  // Click / tap outside the panel collapses the chat (all viewports).
  document.addEventListener(
    'pointerdown',
    (e) => {
      if (!open) return;
      if (streamingId) return;
      const t = e.target as Node | null;
      if (!t) return;
      if (panel.contains(t) || toggleBtn.contains(t)) return;
      setOpen(false);
    },
    true
  );

  void renderAll();
  syncUnreadBadge();
}
