/**
 * Markdown rendering is code-split: marked + DOMPurify load on first assistant reply.
 * highlight.js loads only when a fenced code block is present.
 */

let markedReady: typeof import('marked') | null = null;
let purifyReady: typeof import('dompurify') | null = null;
let hljsReady: Awaited<ReturnType<typeof loadHljs>> | null = null;

async function loadHljs() {
  const mod = await import('highlight.js/lib/core');
  return mod.default;
}

async function ensureMarkdown() {
  if (!markedReady || !purifyReady) {
    const [markedMod, purifyMod] = await Promise.all([
      import('marked'),
      import('dompurify'),
    ]);
    markedReady = markedMod;
    purifyReady = purifyMod;
    markedMod.marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }
  return {
    marked: markedReady!.marked,
    DOMPurify: purifyReady!.default,
  };
}

async function ensureHighlight() {
  if (hljsReady) return hljsReady;
  const hljs = await loadHljs();
  const langs = await Promise.all([
    import('highlight.js/lib/languages/javascript'),
    import('highlight.js/lib/languages/typescript'),
    import('highlight.js/lib/languages/json'),
    import('highlight.js/lib/languages/bash'),
    import('highlight.js/lib/languages/xml'),
    import('highlight.js/lib/languages/css'),
    import('highlight.js/lib/languages/python'),
  ]);
  const names = ['javascript', 'typescript', 'json', 'bash', 'xml', 'css', 'python'];
  names.forEach((name, i) => hljs.registerLanguage(name, langs[i].default));
  // CSS is inlined in styles.ts (.hljs-*) — avoid Vite emitting a .css import
  // that browsers cannot resolve from a plain ES module on static hosting.
  hljsReady = hljs;
  return hljs;
}

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre', 'blockquote',
    'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'table', 'thead',
    'tbody', 'tr', 'th', 'td', 'hr', 'span', 'button', 'div',
  ],
  ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'data-lang', 'type', 'aria-label'],
};

/** External http(s) links (bonus partners, third-party). */
export const EXTERNAL_LINK_REL = 'nofollow noopener noreferrer';

const SITE_HOSTS = new Set(['1winex.com', 'www.1winex.com']);

/** Skip non-navigational or in-page anchors. */
function isNavigationalHref(href: string): boolean {
  if (!href || href.startsWith('#')) return false;
  if (/^(mailto|tel|javascript|data):/i.test(href)) return false;
  return true;
}

/**
 * Internal = 1winex.com / www, current location.hostname, or relative path
 * (/, ./, ../, or hostless path like casinos.html).
 */
export function isInternalHref(href: string): boolean {
  const h = href.trim();
  if (!isNavigationalHref(h)) return false;

  // Relative / same-document path (no scheme, not protocol-relative)
  if (!/^https?:\/\//i.test(h) && !h.startsWith('//')) {
    // Other schemes already filtered; treat remaining hostless URLs as internal
    if (/^[a-z][a-z0-9+.-]*:/i.test(h)) return false;
    return true;
  }

  try {
    const absolute = h.startsWith('//') ? `https:${h}` : h;
    const host = new URL(absolute).hostname.toLowerCase();
    if (SITE_HOSTS.has(host)) return true;
    if (typeof location !== 'undefined' && location.hostname) {
      if (host === location.hostname.toLowerCase()) return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Set target/rel on assistant markdown links after sanitize.
 * External: target=_blank rel="nofollow noopener noreferrer"
 * Internal (1winex.com / relative): same tab, no target/rel rewrite
 */
export function applyExternalLinkAttrs(root: ParentNode): void {
  root.querySelectorAll('a[href]').forEach((el) => {
    const a = el as HTMLAnchorElement;
    const href = (a.getAttribute('href') || '').trim();
    if (!isNavigationalHref(href)) return;
    // Only rewrite http(s), protocol-relative, and relative paths
    const isHttpish = /^https?:\/\//i.test(href) || href.startsWith('//');
    const isRelative =
      !isHttpish && !/^[a-z][a-z0-9+.-]*:/i.test(href);
    if (!isHttpish && !isRelative) return;

    if (isInternalHref(href)) {
      a.removeAttribute('target');
      a.removeAttribute('rel');
      return;
    }

    a.setAttribute('target', '_blank');
    a.setAttribute('rel', EXTERNAL_LINK_REL);
  });
}

function withExternalLinkAttrs(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  applyExternalLinkAttrs(tmp);
  return tmp.innerHTML;
}

/**
 * Render markdown → sanitized HTML. Adds copy buttons on <pre> blocks.
 */
export async function renderMarkdown(md: string): Promise<string> {
  const { marked, DOMPurify } = await ensureMarkdown();
  const raw = await marked.parse(md || '');
  let html = DOMPurify.sanitize(String(raw), PURIFY_CONFIG);

  if (/<pre[\s>]/i.test(html)) {
    const hljs = await ensureHighlight();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.querySelectorAll('pre code').forEach((block) => {
      const el = block as HTMLElement;
      const langMatch = (el.className || '').match(/language-([\w-]+)/);
      const lang = langMatch?.[1];
      try {
        if (lang && hljs.getLanguage(lang)) {
          el.innerHTML = hljs.highlight(el.textContent || '', { language: lang }).value;
        } else {
          el.innerHTML = hljs.highlightAuto(el.textContent || '').value;
        }
      } catch {
        /* leave plain */
      }
      const pre = el.parentElement;
      if (pre && pre.tagName === 'PRE' && !pre.querySelector('.aw-code-copy')) {
        pre.setAttribute('data-lang', lang || 'code');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'aw-code-copy';
        btn.setAttribute('aria-label', 'Copy code');
        btn.textContent = 'Copy';
        pre.appendChild(btn);
      }
    });
    html = DOMPurify.sanitize(tmp.innerHTML, PURIFY_CONFIG);
  }

  return withExternalLinkAttrs(html);
}

/** Escape plain user text for safe HTML insertion (no markdown). */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
