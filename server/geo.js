/**
 * Cloudflare edge geo helpers for chat / CTA policy.
 * Country comes from CF-IPCountry (trusted edge header), not the client body.
 */

/** ISO alpha-2 where tracked bonus/claim links must not be offered. */
export const BONUS_LINK_BLOCKED_COUNTRIES = new Set(['AU', 'FR']);

/**
 * @param {string | undefined | null} code
 * @returns {string} upper ISO alpha-2 or ''
 */
export function normalizeCountryCode(code) {
  let c = String(code || '')
    .trim()
    .toUpperCase();
  if (c === 'UK') c = 'GB';
  if (c === 'XX' || c === 'T1') return '';
  return /^[A-Z]{2}$/.test(c) ? c : '';
}

/**
 * @param {import('express').Request} req
 * @returns {string} upper ISO alpha-2 or ''
 */
export function readVisitorCountry(req) {
  const h = req?.headers || {};
  return normalizeCountryCode(
    h['cf-ipcountry'] || h['CF-IPCountry'] || h['x-country-code'] || ''
  );
}

/**
 * @param {string} code
 * @returns {boolean}
 */
export function isBonusLinkBlocked(code) {
  const c = normalizeCountryCode(code);
  return Boolean(c && BONUS_LINK_BLOCKED_COUNTRIES.has(c));
}
