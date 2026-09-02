import type { PageContext } from './types';

const MAX_SNIPPET = 3500;

/**
 * Collect a short, visible-text snippet from the current review page.
 * Skips nav/footer/script noise so the model gets useful body copy only.
 */
export function collectPageContext(): PageContext {
  const title = document.title || '';
  const url = location.href;

  const main =
    document.querySelector('main') ||
    document.querySelector('article') ||
    document.querySelector('.review-content') ||
    document.querySelector('.page-content') ||
    document.body;

  const clone = main.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll(
      'script, style, noscript, nav, header, footer, .site-header, .site-footer, [id="1winex-chat-root"], [aria-hidden="true"]'
    )
    .forEach((el) => el.remove());

  const text = (clone.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_SNIPPET);

  return { title, url, snippet: text };
}
