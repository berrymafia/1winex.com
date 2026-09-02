/**
 * Classify whether a chat turn should prefer the current page snippet
 * or the site-wide static corpus.
 *
 * Modes:
 * - page — question is about the brand/page the visitor is on
 * - site — compare / catalog / other brand / hub browsing
 */

/** Slugs that are site sections, not casino brands. */
export const NON_BRAND_SLUGS = new Set([
  'index',
  'casinos',
  'bonuses',
  'payments',
  'games',
  'mobile',
  'responsible-gambling',
  'terms',
  'privacy',
  'cookies',
  'about',
  'games-slots',
  'games-live',
  'games-crash',
  'games-originals',
  'games-table',
  'games-roulette',
  'games-blackjack',
  'games-baccarat',
  'games-video-poker',
]);

/** Aliases that appear on brand pages but are not brand names. */
const GENERIC_ALIAS = new Set([
  'safety',
  'license',
  'legit',
  'safe',
  'bonus',
  'bonuses',
  'promo',
  'welcome bonus',
  'claim bonus',
  'crypto',
  'app',
  'apk',
  'android',
  'ios',
  'mobile',
  'slots',
  'crash',
  'games',
  'payments',
  'withdrawal',
  'deposit',
  'payout',
  'faq',
  'help',
  'questions',
  'home',
  'reviews',
  'directory',
  'brands',
  'about',
  'about us',
  'who we are',
  'contact',
  'terms',
  'privacy',
  'cookies',
  'data',
  'tos',
  'responsible',
  'gambling',
  '18+',
]);

/** JS \\b is ASCII-only — use explicit edges for Cyrillic phrases. */
const EDGE = '(?:^|[\\s,.!?…:;()\\[\\]«»"\'—–-])';
const EDGE_END = '(?:$|[\\s,.!?…:;()\\[\\]«»"\'—–-])';

const SITE_WIDE_RE = new RegExp(
  `${EDGE}(?:` +
    [
      'compar(?:e|ison|ing)',
      'versus',
      'vs\\.?',
      'which\\s+(?:is\\s+)?best',
      'best\\s+casinos?',
      'top\\s+casinos?',
      'recommend(?:ed)?\\s+casinos?',
      'other\\s+casinos?',
      'alternatives?',
      'catalog(?:ue)?',
      'directory',
      'ranking',
      'rating',
      'list\\s+of',
      'между',
      'сравни(?:ть|те|ение)?',
      'сравнени[ея]',
      'какой\\s+лучше',
      'какая\\s+лучше',
      'какие\\s+лучше',
      'что\\s+лучше',
      'лучш(?:ий|ая|ие|ее)\\s+казино',
      'рейтинг',
      'каталог',
      'другие\\s+казино',
      'альтернатив\\p{L}*',
      'посоветуй\\s+казино',
      'выбери\\s+казино',
    ].join('|') +
    `)${EDGE_END}`,
  'iu'
);

const PAGE_LOCAL_RE = new RegExp(
  `${EDGE}(?:` +
    [
      'this\\s+page',
      'this\\s+review',
      'this\\s+casino',
      'on\\s+this\\s+page',
      'here\\s+on',
      'на\\s+этой\\s+страниц\\p{L}*',
      'в\\s+этом\\s+обзор\\p{L}*',
      'это\\s+казино',
      'здесь\\s+(?:на|про|о)',
      'данный\\s+обзор',
    ].join('|') +
    `)${EDGE_END}`,
  'iu'
);

/**
 * @param {string} s
 */
export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.+-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * @param {string} [url]
 */
export function slugFromUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url, 'https://1winex.com');
    const p = u.pathname.replace(/\/+$/, '') || '/';
    if (p === '/' || p === '/index' || p === '/index.html') return 'index';
    const parts = p.split('/').filter(Boolean);
    if (parts[0] === 'games' && parts[1]) {
      return `games-${parts[1].replace(/\.html$/i, '')}`;
    }
    const seg = parts[0] || '';
    return seg.replace(/\.html$/i, '');
  } catch {
    return '';
  }
}

/**
 * @param {string} alias
 */
function escapeRegex(alias) {
  return alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
}

/**
 * True if alias appears as a whole token/phrase in the normalized query.
 * @param {string} queryNorm
 * @param {string} alias
 */
export function mentionInQuery(queryNorm, alias) {
  const a = normalize(alias);
  if (!a || a.length < 2 || GENERIC_ALIAS.has(a)) return false;
  const pat = escapeRegex(a);
  return new RegExp(`(?:^|\\s)${pat}(?:\\s|$)`, 'i').test(queryNorm);
}

/**
 * @typedef {{ slug: string, name: string, aliases?: string[] }} BrandEntry
 */

/**
 * @param {BrandEntry[]} pages
 * @returns {BrandEntry[]}
 */
export function brandEntriesFromPages(pages) {
  return (pages || []).filter((p) => p?.slug && !NON_BRAND_SLUGS.has(p.slug));
}

/**
 * @param {string} queryNorm
 * @param {BrandEntry[]} brands
 * @returns {BrandEntry[]}
 */
export function findMentionedBrands(queryNorm, brands) {
  const hits = [];
  for (const brand of brands) {
    const keys = [brand.slug, brand.name, ...(brand.aliases || [])];
    if (keys.some((k) => mentionInQuery(queryNorm, k))) hits.push(brand);
  }
  return hits;
}

/**
 * @typedef {'page' | 'site'} QuestionScopeMode
 * @typedef {{
 *   mode: QuestionScopeMode,
 *   currentSlug: string,
 *   isBrandPage: boolean,
 *   mentionedBrands: string[],
 *   otherBrands: string[],
 *   reasons: string[],
 * }} QuestionScope
 */

/**
 * @param {string} query
 * @param {{ title?: string, url?: string, snippet?: string }} [pageContext]
 * @param {{ brands?: BrandEntry[] }} [opts]
 * @returns {QuestionScope}
 */
export function classifyQuestionScope(query, pageContext = {}, opts = {}) {
  const queryNorm = normalize(query);
  const currentSlug = slugFromUrl(pageContext.url);
  const isBrandPage = Boolean(currentSlug) && !NON_BRAND_SLUGS.has(currentSlug);
  const brands = opts.brands || [];
  const mentioned = findMentionedBrands(queryNorm, brands);
  const mentionedBrands = mentioned.map((b) => b.slug);
  const otherBrands = mentionedBrands.filter((s) => s !== currentSlug);
  /** @type {string[]} */
  const reasons = [];

  if (!queryNorm) {
    return {
      mode: isBrandPage ? 'page' : 'site',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons: ['empty-query'],
    };
  }

  if (PAGE_LOCAL_RE.test(queryNorm)) {
    reasons.push('page-local-phrase');
    return {
      mode: 'page',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons,
    };
  }

  if (otherBrands.length) {
    reasons.push('other-brand-mentioned');
    return {
      mode: 'site',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons,
    };
  }

  if (SITE_WIDE_RE.test(queryNorm)) {
    reasons.push('site-wide-intent');
    return {
      mode: 'site',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons,
    };
  }

  // Explicit current brand on a brand page → stay page-scoped
  if (isBrandPage && mentionedBrands.includes(currentSlug)) {
    reasons.push('current-brand-mentioned');
    return {
      mode: 'page',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons,
    };
  }

  // Hub / legal pages default to site corpus
  if (!isBrandPage) {
    reasons.push('on-hub-page');
    return {
      mode: 'site',
      currentSlug,
      isBrandPage,
      mentionedBrands,
      otherBrands,
      reasons,
    };
  }

  // Brand review page + no site-wide signal → prefer the page the user is reading
  reasons.push('default-brand-page');
  return {
    mode: 'page',
    currentSlug,
    isBrandPage,
    mentionedBrands,
    otherBrands,
    reasons,
  };
}
