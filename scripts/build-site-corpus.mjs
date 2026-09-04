#!/usr/bin/env node
/**
 * Build a static site corpus for the 1winex chat assistant (no vector DB).
 * Usage: node scripts/build-site-corpus.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'server', 'data', 'site-corpus.json');
const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://1winex.com').replace(/\/+$/, '');
const MAX_TEXT = 4500;

const PAGES = [
  {
    slug: 'index',
    file: 'index.html',
    name: '1win Review',
    aliases: ['home', '1win', 'onewin', '1winex', 'review'],
  },
  {
    slug: 'bonuses',
    file: 'bonuses.html',
    name: '1win Bonuses',
    aliases: ['bonus', 'bonuses', 'promo', 'promo code', 'промокод', '1WINEX500', 'welcome bonus', '500%', 'wagering'],
  },
  {
    slug: 'payments',
    file: 'payments.html',
    name: '1win Payments',
    aliases: ['payments', 'withdrawal', 'deposit', 'crypto', 'payout', 'kyc'],
  },
  {
    slug: 'games',
    file: 'games.html',
    name: '1win Games',
    aliases: ['games', 'slots', 'aviator', 'crash', 'live casino', 'rtp'],
  },
  {
    slug: 'mobile',
    file: 'mobile.html',
    name: '1win Mobile App',
    aliases: ['mobile', 'apk', 'android', 'ios', 'testflight', 'app'],
  },
  {
    slug: 'safety',
    file: 'safety.html',
    name: '1win Safety',
    aliases: ['safety', 'license', 'legit', 'ssl', '2fa', 'curacao'],
  },
  {
    slug: 'responsible-gambling',
    file: 'responsible-gambling.html',
    name: 'Responsible Gambling',
    aliases: ['responsible', 'self-exclusion', 'deposit limits', '18+'],
  },
];

const SITE_OFFERS = [
  {
    brand: '1win',
    url: 'https://bonus-999.com/1win',
    label: 'Claim Welcome Bonus',
    kind: 'bonus',
    aliases: ['welcome bonus', 'claim bonus', 'best bonus', 'bonus', 'бонус', 'промо', 'promo code', 'промокод', '1WINEX500', 'coupon'],
  },
  {
    brand: '1win',
    url: 'https://bonus-999.com/apk',
    label: 'Download APK',
    kind: 'apk',
    aliases: ['apk', 'android', 'download apk', 'скачать apk', 'приложение'],
  },
];

function stripHtml(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&nbsp;/gi, ' ');
  s = s.replace(/&amp;/gi, '&');
  s = s.replace(/&lt;/gi, '<');
  s = s.replace(/&gt;/gi, '>');
  s = s.replace(/&#?\w+;/g, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, ' ').trim() : '';
}

function extractMetaDescription(html) {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return m ? m[1].trim() : '';
}

const entries = [];
for (const page of PAGES) {
  const filePath = path.join(ROOT, page.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[corpus] missing ${page.file}`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const text = stripHtml(html).slice(0, MAX_TEXT);
  const title = extractTitle(html) || page.name;
  const pathUrl = page.slug === 'index' ? '/' : `/${page.slug}`;
  const link = `${SITE_ORIGIN}${pathUrl === '/' ? '/' : pathUrl}`;
  entries.push({
    slug: page.slug,
    url: pathUrl,
    link,
    name: page.name,
    aliases: [...new Set([...(page.aliases || []), page.name, title].map((a) => String(a).trim()).filter(Boolean))],
    title,
    description: extractMetaDescription(html),
    text,
  });
}

const corpus = {
  version: 3,
  siteOrigin: SITE_ORIGIN,
  generatedAt: new Date().toISOString(),
  pageCount: entries.length,
  offers: SITE_OFFERS,
  pages: entries,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(corpus, null, 2), 'utf8');
console.log(`[corpus] wrote ${OUT} pages=${entries.length} bytes=${fs.statSync(OUT).size}`);
