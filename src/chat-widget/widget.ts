/**
 * Floating 1winex AI chat widget UI.
 * Mounted lazily after idle — see js/chat-widget-loader.js.
 */
import { CHAT_SITE, MAX_MESSAGE_LENGTH, WIDGET_ID } from './constants';
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
    const locale = {
      en: 'en',
      ru: 'ru-RU',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      uk: 'uk-UA',
      it: 'it-IT',
      az: 'az-AZ',
      bn: 'bn-BD',
    }[uiLang()];
    return new Intl.DateTimeFormat(locale, {
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

function uiLang(): 'en' | 'ru' | 'es' | 'fr' | 'de' | 'uk' | 'it' | 'az' | 'bn' {
  const raw = (document.documentElement.lang || '').toLowerCase();
  if (raw.startsWith('uk')) return 'uk';
  if (raw.startsWith('ru')) return 'ru';
  if (raw.startsWith('es')) return 'es';
  if (raw.startsWith('fr')) return 'fr';
  if (raw.startsWith('de')) return 'de';
  if (raw.startsWith('it')) return 'it';
  if (raw.startsWith('az')) return 'az';
  if (raw.startsWith('bn')) return 'bn';
  return 'en';
}

function chatCopy() {
  const lang = uiLang();
  if (lang === 'ru') {
    return {
      name: 'Анна',
      subtitle: 'Справочный помощник 1win',
      close: 'Закрыть чат',
      placeholder: 'Задайте вопрос о 1win…',
      message: 'Сообщение',
      send: 'Отправить',
      sendMessage: 'Отправить сообщение',
      open: 'Открыть чат с Анной',
      closeAnna: 'Закрыть чат с Анной',
      openUnread: 'Открыть чат с Анной — новое сообщение',
      typing: 'Анна печатает',
      hello: 'Здравствуйте! Я Анна, справочный помощник 1win.',
      intro:
        'Я могу объяснить бонусы, игры, спорт, платежи и установку приложения по информации этого сайта. У меня нет доступа к вашему аккаунту, поэтому я не могу пополнять счёт, выводить средства, менять лимиты или проводить KYC-верификацию.',
      suggests: 'Выберите частый вопрос',
      noResponse: 'Не удалось получить ответ. Попробуйте ещё раз.',
      copied: 'Скопировано',
      copy: 'Копировать',
      failed: 'Не скопировано',
    };
  }
  if (lang === 'es') {
    return {
      name: 'Anna',
      subtitle: 'Asistente informativa de 1win',
      close: 'Cerrar chat',
      placeholder: 'Pregunta sobre 1win…',
      message: 'Mensaje',
      send: 'Enviar',
      sendMessage: 'Enviar mensaje',
      open: 'Abrir chat con Anna',
      closeAnna: 'Cerrar chat con Anna',
      openUnread: 'Abrir chat con Anna — mensaje nuevo',
      typing: 'Anna está escribiendo',
      hello: 'Hola, soy Anna, tu guía de 1win.',
      intro:
        'Puedo explicar bonos, juegos, deportes, pagos e instalación de la app con la información de este sitio. No puedo acceder a tu cuenta ni realizar depósitos o retiros, cambiar límites ni gestionar la verificación KYC.',
      suggests: 'Elige una pregunta frecuente',
      noResponse: 'No pude obtener una respuesta. Inténtalo de nuevo.',
      copied: 'Copiado',
      copy: 'Copiar',
      failed: 'No se pudo copiar',
    };
  }
  if (lang === 'fr') {
    return {
      name: 'Anna',
      subtitle: 'Assistante d’information de 1win',
      close: 'Fermer le chat',
      placeholder: 'Posez une question sur 1win…',
      message: 'Message',
      send: 'Envoyer',
      sendMessage: 'Envoyer le message',
      open: 'Ouvrir le chat avec Anna',
      closeAnna: 'Fermer le chat avec Anna',
      openUnread: 'Ouvrir le chat avec Anna — nouveau message',
      typing: 'Anna écrit',
      hello: 'Bonjour, je suis Anna, votre guide 1win.',
      intro:
        'Je peux expliquer les bonus, les jeux, le sport, les paiements et l’installation de l’app à partir des informations de ce site. Je n’ai pas accès à votre compte et je ne peux ni effectuer de dépôts ou de retraits, ni modifier vos limites, ni gérer votre vérification KYC.',
      suggests: 'Choisissez une question fréquente',
      noResponse: 'Je n’ai pas pu obtenir de réponse. Réessayez.',
      copied: 'Copié',
      copy: 'Copier',
      failed: 'Copie impossible',
    };
  }
  if (lang === 'de') {
    return {
      name: 'Anna',
      subtitle: '1win-Infoassistentin',
      close: 'Chat schließen',
      placeholder: 'Frage zu 1win stellen…',
      message: 'Nachricht',
      send: 'Senden',
      sendMessage: 'Nachricht senden',
      open: 'Chat mit Anna öffnen',
      closeAnna: 'Chat mit Anna schließen',
      openUnread: 'Chat mit Anna öffnen — neue Nachricht',
      typing: 'Anna schreibt',
      hello: 'Hallo, ich bin Anna, dein 1win-Guide.',
      intro:
        'Ich erkläre Boni, Spiele, Sport, Zahlungen und App-Installation anhand dieser Website. Ich habe keinen Kontozugriff und kann weder Ein- noch Auszahlungen vornehmen, Limits ändern oder KYC-Prüfungen verwalten.',
      suggests: 'Häufige Frage auswählen',
      noResponse: 'Ich konnte keine Antwort abrufen. Versuch es erneut.',
      copied: 'Kopiert',
      copy: 'Kopieren',
      failed: 'Kopieren fehlgeschlagen',
    };
  }
  if (lang === 'uk') {
    return {
      name: 'Анна',
      subtitle: 'Довідкова помічниця 1win',
      close: 'Закрити чат',
      placeholder: 'Запитайте про 1win…',
      message: 'Повідомлення',
      send: 'Надіслати',
      sendMessage: 'Надіслати повідомлення',
      open: 'Відкрити чат з Анною',
      closeAnna: 'Закрити чат з Анною',
      openUnread: 'Відкрити чат з Анною — нове повідомлення',
      typing: 'Анна пише',
      hello: 'Вітаю! Я Анна, довідкова помічниця 1win.',
      intro:
        'Я можу пояснити бонуси, ігри, спорт, платежі та встановлення додатка за інформацією цього сайту. Я не маю доступу до вашого акаунта й не можу поповнювати рахунок, виводити кошти, змінювати ліміти або проводити KYC-верифікацію.',
      suggests: 'Виберіть поширене запитання',
      noResponse: 'Не вдалося отримати відповідь. Спробуйте ще раз.',
      copied: 'Скопійовано',
      copy: 'Копіювати',
      failed: 'Не скопійовано',
    };
  }
  if (lang === 'it') {
    return {
      name: 'Anna',
      subtitle: 'Assistente informativa 1win',
      close: 'Chiudi chat',
      placeholder: 'Chiedi informazioni su 1win…',
      message: 'Messaggio',
      send: 'Invia',
      sendMessage: 'Invia messaggio',
      open: 'Apri la chat con Anna',
      closeAnna: 'Chiudi la chat con Anna',
      openUnread: 'Apri la chat con Anna — nuovo messaggio',
      typing: 'Anna sta scrivendo',
      hello: 'Ciao, sono Anna, la tua guida 1win.',
      intro:
        'Posso spiegare bonus, giochi, sport, pagamenti e installazione dell’app usando le informazioni del sito. Non posso accedere al tuo account né effettuare depositi o prelievi, modificare i limiti né gestire la verifica KYC.',
      suggests: 'Scegli una domanda frequente',
      noResponse: 'Non ho ricevuto una risposta. Riprova.',
      copied: 'Copiato',
      copy: 'Copia',
      failed: 'Copia non riuscita',
    };
  }
  if (lang === 'az') {
    return {
      name: 'Anna',
      subtitle: '1win məlumat bələdçisi',
      close: 'Söhbəti bağla',
      placeholder: '1win haqqında soruşun…',
      message: 'Mesaj',
      send: 'Göndər',
      sendMessage: 'Mesaj göndər',
      open: 'Anna ilə söhbəti aç',
      closeAnna: 'Anna ilə söhbəti bağla',
      openUnread: 'Anna ilə söhbəti aç — yeni mesaj',
      typing: 'Anna yazır',
      hello: 'Salam, mən Anna, 1win bələdçinizəm.',
      intro:
        'Bu saytdakı məlumata əsasən bonusları, oyunları, idmanı, ödənişləri və tətbiqin quraşdırılmasını izah edə bilərəm. Hesabınıza girişim yoxdur və depozit qoya, vəsait çıxara, limitləri dəyişə və ya KYC prosesini idarə edə bilmirəm.',
      suggests: 'Tez-tez verilən suallardan birini seçin',
      noResponse: 'Cavab alınmadı. Yenidən cəhd edin.',
      copied: 'Kopyalandı',
      copy: 'Kopyala',
      failed: 'Kopyalanmadı',
    };
  }
  if (lang === 'bn') {
    return {
      name: 'Anna',
      subtitle: '1win তথ্য সহকারী',
      close: 'চ্যাট বন্ধ করুন',
      placeholder: '1win সম্পর্কে প্রশ্ন করুন…',
      message: 'বার্তা',
      send: 'পাঠান',
      sendMessage: 'বার্তা পাঠান',
      open: 'Anna-র সাথে চ্যাট খুলুন',
      closeAnna: 'Anna-র সাথে চ্যাট বন্ধ করুন',
      openUnread: 'Anna-র সাথে চ্যাট — নতুন বার্তা',
      typing: 'Anna লিখছেন',
      hello: 'হ্যালো, আমি Anna, আপনার 1win গাইড।',
      intro:
        'এই সাইটের তথ্য ব্যবহার করে আমি বোনাস, গেম, স্পোর্টস, পেমেন্ট ও অ্যাপ ইনস্টলেশন সম্পর্কে বুঝিয়ে বলতে পারি। আপনার অ্যাকাউন্টে আমার অ্যাক্সেস নেই, তাই আমি আপনার হয়ে ডিপোজিট বা উইথড্রয়াল করতে, লিমিট বদলাতে বা KYC যাচাই সম্পন্ন করতে পারি না।',
      suggests: 'একটি সাধারণ প্রশ্ন বেছে নিন',
      noResponse: 'উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।',
      copied: 'কপি হয়েছে',
      copy: 'কপি',
      failed: 'কপি হয়নি',
    };
  }
  return {
    name: 'Anna',
    subtitle: '1win information assistant',
    close: 'Close chat',
    placeholder: 'Ask about 1win…',
    message: 'Message',
    send: 'Send',
    sendMessage: 'Send message',
    open: 'Open chat with Anna',
    closeAnna: 'Close chat with Anna',
    openUnread: 'Open chat with Anna — new message',
    typing: 'Anna is typing',
    hello: 'Hi, I’m Anna, your 1win guide.',
    intro:
      'I can explain bonuses, games, sports, payments and app installation using this site. I cannot access your account, make deposits or withdrawals, change limits, or manage KYC.',
    suggests: 'Choose a common question',
    noResponse: 'I could not get a response. Please try again.',
    copied: 'Copied',
    copy: 'Copy',
    failed: 'Copy failed',
  };
}

export function mountChatWidget(): void {
  if (document.getElementById(WIDGET_ID)) return;

  injectStyles();
  const ui = chatCopy();

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
          <img class="aw-chat__brand-avatar" src="${ANNA_AVATAR_SRC}" alt="${ui.name}" width="48" height="48" decoding="async" />
          <div class="aw-chat__brand-text">
            <strong id="aw-chat-title">${ui.name}</strong>
            <span>${ui.subtitle}</span>
          </div>
        </div>
        <div class="aw-chat__header-actions">
          <button type="button" class="aw-chat__icon-btn" data-action="close" aria-label="${ui.close}">${ICONS.close}</button>
        </div>
      </div>
      <div class="aw-chat__messages" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form class="aw-chat__composer" autocomplete="off">
        <textarea name="message" rows="1" maxlength="${MAX_MESSAGE_LENGTH}" placeholder="${ui.placeholder}" aria-label="${ui.message}"></textarea>
        <button type="submit" class="aw-chat__send" aria-label="${ui.sendMessage}">${ui.send}</button>
      </form>
    </div>
    <button type="button" class="aw-chat__toggle" aria-label="${ui.open}" aria-expanded="false" aria-controls="aw-chat-panel">
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
      toggleBtn.setAttribute('aria-label', ui.closeAnna);
    } else if (show) {
      toggleBtn.setAttribute('aria-label', ui.openUnread);
    } else {
      toggleBtn.setAttribute('aria-label', ui.open);
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
        bubble.innerHTML = `<span class="aw-typing" aria-label="${ui.typing}"><i></i><i></i><i></i></span>`;
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
        <strong>${ui.hello}</strong>
        <p>${ui.intro}</p>
        <div class="aw-chat__suggests" role="group" aria-label="${ui.suggests}">${chips}</div>
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
    sendBtn.textContent = ui.send;
    sendBtn.type = 'submit';
    sendBtn.disabled = active;
    sendBtn.setAttribute('aria-label', ui.sendMessage);
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
      site: CHAT_SITE,
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
          if (!hadContent) assistant.content = ui.noResponse;
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
      btn.textContent = ui.copied;
      setTimeout(() => {
        btn.textContent = ui.copy;
      }, 1200);
    } catch {
      btn.textContent = ui.failed;
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
