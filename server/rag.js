/**
 * Static site corpus retrieval for the 1winex chat assistant.
 *
 * Loads server/data/site-corpus.json (built by scripts/build-site-corpus.mjs)
 * and returns the top-scoring page passages for the user question.
 * Designed as a drop-in that can later be replaced with a vector DB.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  brandEntriesFromPages,
  classifyQuestionScope,
  normalize,
} from './question-scope.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS_PATH = path.join(__dirname, 'data', 'site-corpus.json');

/** Max pages injected per request (site mode uses a wider set) */
const TOP_K_PAGE = 4;
const TOP_K_SITE = 6;
/** Cap each passage so the prompt stays within budget */
const MAX_CHARS_PER_PAGE = 1800;
/** Soft cap for the whole RETRIEVED_CONTEXT block */
const MAX_TOTAL_CHARS = 7000;

/** @type {{ pages: Array<CorpusPage>, offers?: SiteOffer[], siteOrigin?: string, generatedAt?: string } | null} */
let cache = null;
let cacheMtimeMs = 0;

/**
 * @typedef {{ slug: string, url: string, link?: string, name: string, aliases?: string[], title?: string, description?: string, text: string, bonusClaim?: { url: string, label?: string, brand?: string } }} CorpusPage
 * @typedef {{ brand: string, url: string, label?: string, kind?: string, aliases?: string[] }} SiteOffer
 */

const DEFAULT_ORIGIN = 'https://1winex.com';

/**
 * Absolute page URL for chat replies.
 * @param {CorpusPage} page
 * @param {string} [siteOrigin]
 */
function pageLink(page, siteOrigin = DEFAULT_ORIGIN) {
  if (page.link && /^https?:\/\//i.test(page.link)) return page.link;
  const origin = String(siteOrigin || DEFAULT_ORIGIN).replace(/\/+$/, '');
  const pathUrl = page.url || (page.slug === 'index' ? '/' : `/${page.slug}`);
  if (pathUrl === '/') return `${origin}/`;
  return `${origin}${pathUrl.startsWith('/') ? pathUrl : `/${pathUrl}`}`;
}

/**
 * Pick tracked CTAs that match the question (bonus vs APK).
 * @param {string} queryNorm
 * @param {SiteOffer[]} offers
 * @param {CorpusPage[]} _pickedPages
 */
function selectOffers(queryNorm, offers, _pickedPages) {
  if (!offers?.length) return [];
  const bonusIntent =
    /bonus|promo|claim|welcome|500%|coupon|код|бонус|промо|получить|забрать|акци/i.test(
      queryNorm
    );
  const apkIntent =
    /apk|android|sideload|download.?app|\bapp\b|скачать|приложен|установ/i.test(queryNorm);

  return offers.filter((o) => {
    const kind = String(o.kind || 'bonus').toLowerCase();
    const aliasHit = (o.aliases || []).some((a) => {
      const n = normalize(a);
      return n.length >= 3 && queryNorm.includes(n);
    });
    if (aliasHit) return true;
    if (kind === 'apk') return apkIntent;
    return bonusIntent;
  });
}

function loadCorpus() {
  try {
    const stat = fs.statSync(CORPUS_PATH);
    if (cache && stat.mtimeMs === cacheMtimeMs) return cache;
    const raw = fs.readFileSync(CORPUS_PATH, 'utf8');
    cache = JSON.parse(raw);
    cacheMtimeMs = stat.mtimeMs;
    return cache;
  } catch (err) {
    console.warn('[rag] corpus unavailable:', err?.message || err);
    cache = null;
    cacheMtimeMs = 0;
    return null;
  }
}

/**
 * Tokenize query into searchable terms (keep short brand tokens like 1win).
 * @param {string} query
 */
function termsFromQuery(query) {
  const n = normalize(query);
  const parts = n.split(' ').filter((t) => t.length >= 2);
  return [...new Set(parts)];
}

/**
 * Score a corpus page against the user query + question scope.
 * @param {CorpusPage} page
 * @param {string[]} terms
 * @param {string} queryNorm
 * @param {import('./question-scope.js').QuestionScope} scope
 */
function scorePage(page, terms, queryNorm, scope) {
  let score = 0;
  const hayName = normalize(`${page.name} ${page.slug} ${(page.aliases || []).join(' ')}`);
  const hayBody = normalize(`${page.title || ''} ${page.description || ''} ${page.text || ''}`);

  for (const alias of page.aliases || []) {
    const a = normalize(alias);
    if (a && queryNorm.includes(a)) score += 40;
  }
  if (queryNorm.includes(normalize(page.slug))) score += 35;
  if (queryNorm.includes(normalize(page.name))) score += 30;

  for (const t of terms) {
    if (hayName.includes(t)) score += 12;
    if (hayBody.includes(t)) score += 2;
  }

  const onCurrent = scope.currentSlug && page.slug === scope.currentSlug;

  if (scope.mode === 'page') {
    // Strongly prefer the review the visitor is already reading
    if (onCurrent) score += 28;
  } else {
    // Site-wide: do not let the open tab dominate retrieval
    if (onCurrent && !scope.mentionedBrands.includes(page.slug)) score -= 6;
    if (
      scope.otherBrands.includes(page.slug) ||
      scope.mentionedBrands.includes(page.slug)
    ) {
      score += 20;
    }
    if (
      ['casinos', 'bonuses', 'payments', 'safety'].includes(page.slug) &&
      (scope.reasons.includes('site-wide-intent') || scope.reasons.includes('on-hub-page'))
    ) {
      score += 14;
    }
  }

  // Hub pages when user asks broadly (either mode)
  if (
    (queryNorm.includes('casino') ||
      queryNorm.includes('review') ||
      queryNorm.includes('compare') ||
      queryNorm.includes('сравни') ||
      queryNorm.includes('лучше')) &&
    (page.slug === 'casinos' || page.slug === 'bonuses' || page.slug === 'payments')
  ) {
    score += 6;
  }

  return score;
}

/**
 * @param {string} query user question (untrusted)
 * @param {{ title?: string, url?: string, snippet?: string }} pageContext
 * @returns {Promise<{ text: string, sufficient: boolean, topScore: number, scope: import('./question-scope.js').QuestionScope }>}
 */
export async function retrieveWithMeta(query, pageContext = {}) {
  const corpus = loadCorpus();
  const brands = brandEntriesFromPages(corpus?.pages || []);
  const scope = classifyQuestionScope(query, pageContext, { brands });

  if (!corpus?.pages?.length) {
    return { text: '', sufficient: false, topScore: 0, scope };
  }

  const queryNorm = normalize(query);
  if (!queryNorm) {
    return { text: '', sufficient: false, topScore: 0, scope };
  }

  const terms = termsFromQuery(query);
  const topK = scope.mode === 'site' ? TOP_K_SITE : TOP_K_PAGE;

  const ranked = corpus.pages
    .map((page) => ({
      page,
      score: scorePage(page, terms, queryNorm, scope),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // Fallback: if nothing matched, give directory hubs (weak coverage → may trigger web search)
  const usedFallback = ranked.length === 0;
  const picks =
    ranked.length > 0
      ? ranked
      : corpus.pages
          .filter((p) => ['index', 'bonuses', 'payments'].includes(p.slug))
          .slice(0, 3)
          .map((page) => ({ page, score: 1 }));

  const topScore = picks[0]?.score || 0;
  /** Strong brand/alias hit — corpus is enough; skip paid web search */
  const MIN_SUFFICIENT_SCORE = Number(process.env.CHAT_CORPUS_MIN_SCORE || 30);
  // Page-scoped answers can rely on the live snippet even with a weaker corpus hit
  const sufficient =
    !usedFallback &&
    (topScore >= MIN_SUFFICIENT_SCORE || (scope.mode === 'page' && topScore >= 12));

  const parts = [];
  let total = 0;
  for (const { page } of picks) {
    const body = (page.text || page.description || '').slice(0, MAX_CHARS_PER_PAGE);
    const link = pageLink(page, corpus.siteOrigin);
    const blockLines = [
      `### ${page.name}`,
      `Link: ${link}`,
      `Path: ${page.url || '/'}`,
      page.title ? `Title: ${page.title}` : '',
      page.description ? `Summary: ${page.description}` : '',
      `When you mention this page or brand, include this markdown link: [${page.name}](${link})`,
    ];
    if (page.bonusClaim?.url) {
      const bl = page.bonusClaim.label || 'Claim bonus';
      blockLines.push(
        `Bonus claim link: ${page.bonusClaim.url}`,
        `When the user wants to claim / get the ${page.bonusClaim.brand || page.name} bonus, give this markdown link: [${bl}](${page.bonusClaim.url})`
      );
    }
    blockLines.push(body);
    const block = blockLines.filter(Boolean).join('\n');

    if (total + block.length > MAX_TOTAL_CHARS) break;
    parts.push(block);
    total += block.length;
  }

  const pickedPages = picks.map((p) => p.page);
  const offers = selectOffers(queryNorm, corpus.offers || [], pickedPages);
  if (offers.length) {
    const offerLines = [
      '### Tracked CTAs (include when the question matches)',
      'Use only these tracked URLs. Do not invent other bonus-999 paths.',
      'Bonus/promo questions → Claim Welcome Bonus. APK/Android download questions → Download APK.',
      ...offers.map(
        (o) =>
          `- ${o.label || 'Claim bonus'} → ${o.url} (markdown: [${o.label || 'Claim bonus'}](${o.url}))`
      ),
    ];
    const offerBlock = offerLines.join('\n');
    if (total + offerBlock.length <= MAX_TOTAL_CHARS) {
      parts.unshift(offerBlock);
    }
  }

  if (!parts.length) {
    return { text: '', sufficient: false, topScore: 0, scope };
  }

  const preferLine =
    scope.mode === 'site'
      ? 'Question scope: SITE-WIDE. Prefer these corpus passages over the current page snippet.'
      : 'Question scope: PAGE. Use these passages as supporting site context; the current page snippet may be primary for this brand.';

  const text = [
    `Static site corpus (generated ${corpus.generatedAt || 'unknown'}). ${preferLine}`,
    'Each entry includes a Link — use those exact https://1winex.com/... URLs in your reply as markdown links when relevant.',
    '',
    parts.join('\n\n---\n\n'),
  ].join('\n');

  return { text, sufficient, topScore, scope };
}

/**
 * @param {string} query
 * @param {{ title?: string, url?: string, snippet?: string }} pageContext
 * @returns {Promise<string>}
 */
export async function retrieveContext(query, pageContext = {}) {
  const { text } = await retrieveWithMeta(query, pageContext);
  return text;
}
