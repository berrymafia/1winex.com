#!/usr/bin/env node
/**
 * Build the 1winex chat corpus from this site's HTML.
 * Writes to the sibling api-chat.net repo (the live API reads it there).
 * Usage: node scripts/build-site-corpus.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const API_ROOT = path.resolve(ROOT, '..', 'api-chat.net');
const OUT = path.join(API_ROOT, 'server', 'data', 'site-corpus.json');
const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://1winex.com').replace(/\/+$/, '');
const MAX_TEXT = 4500;

const PAGES = [
  {
    slug: 'index',
    file: 'index.html',
    name: '1win',
    aliases: ['home', '1win', 'onewin', '1winex'],
  },
  {
    slug: 'bonuses',
    file: 'bonuses.html',
    name: '1win Bonuses',
    aliases: ['bonus', 'bonuses', 'promo', 'promo code', 'промокод', 'WINEX600', 'welcome bonus', '600%', '500%', '500 FS', 'wagering', 'bono', 'código promocional', 'código promo', 'bonus de bienvenue', 'code promo', 'tours gratuits', 'Willkommensbonus', 'Promo-Code', 'Freispiele', 'bonus di benvenuto', 'codice promo', 'xoş gəldin bonusu', 'promo kod', 'oynatma'],
  },
  {
    slug: 'payments',
    file: 'payments.html',
    name: '1win Payments',
    aliases: ['payments', 'withdrawal', 'deposit', 'crypto', 'payout', 'kyc'],
  },
  {
    slug: 'crypto-casino',
    file: 'crypto-casino.html',
    name: '1win Crypto Casino',
    aliases: [
      'crypto casino',
      'crypto',
      'bitcoin',
      'btc',
      'ethereum',
      'eth',
      'usdt',
      'tether',
      'wallet',
      'крипто-казино',
      'крипта',
      'биткоин',
    ],
  },
  {
    slug: 'casino',
    file: 'casino.html',
    name: '1win Casino',
    aliases: ['casino', 'games', 'slots', 'crash', 'live casino', 'rtp'],
  },
  {
    slug: 'aviator',
    file: 'aviator.html',
    name: '1win Aviator',
    aliases: ['aviator', 'spribe', 'crash game', 'авиатор'],
  },
  {
    slug: 'lucky-jet',
    file: 'lucky-jet.html',
    name: '1win Lucky Jet',
    aliases: ['lucky jet', 'luckyjet', '1win originals', 'crash game', 'лаки джет'],
  },
  {
    slug: 'betting',
    file: 'betting.html',
    name: '1win Betting',
    aliases: ['betting', 'sports', 'sportsbook', 'pre-match', 'live betting', 'esports', 'football'],
  },
  {
    slug: 'app',
    file: 'app.html',
    name: '1win App',
    aliases: ['app', 'mobile', 'apk', 'android', 'ios', 'testflight'],
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
  {
    slug: 'not-working',
    file: 'not-working.html',
    name: '1win Not Working',
    aliases: ['not working', 'blocked', 'mirror', 'site down', 'does not open', 'не открывается', 'не работает', 'no abre', 'no funciona', 'ne s’ouvre pas', 'ne fonctionne pas', 'öffnet nicht', 'geht nicht', 'не відкривається', 'не працює', 'non si apre', 'non funziona', 'açılmır', 'işləmir'],
  },
];

const RU_NAMES = {
  'ru-index': '1win',
  'ru-bonuses': 'Бонусы',
  'ru-payments': 'Платежи',
  'ru-crypto-casino': 'Крипто-казино',
  'ru-casino': 'Казино',
  'ru-aviator': 'Aviator',
  'ru-lucky-jet': 'Lucky Jet',
  'ru-betting': 'Спорт',
  'ru-app': 'Приложение',
  'ru-safety': 'Безопасность',
  'ru-responsible-gambling': 'Ответственная игра',
  'ru-not-working': 'Не открывается',
};

const ES_NAMES = {
  'es-index': '1win',
  'es-bonuses': 'Bonos',
  'es-payments': 'Pagos',
  'es-crypto-casino': 'Casino cripto',
  'es-casino': 'Casino',
  'es-aviator': 'Aviator',
  'es-lucky-jet': 'Lucky Jet',
  'es-betting': 'Deportes',
  'es-app': 'App',
  'es-safety': 'Seguridad',
  'es-responsible-gambling': 'Juego responsable',
  'es-not-working': 'No abre',
};

const FR_NAMES = {
  'fr-index': '1win',
  'fr-bonuses': 'Bonus',
  'fr-payments': 'Paiements',
  'fr-crypto-casino': 'Casino crypto',
  'fr-casino': 'Casino',
  'fr-aviator': 'Aviator',
  'fr-lucky-jet': 'Lucky Jet',
  'fr-betting': 'Sport',
  'fr-app': 'App',
  'fr-safety': 'Sécurité',
  'fr-responsible-gambling': 'Jeu responsable',
  'fr-not-working': 'Ne s’ouvre pas',
};

const DE_NAMES = {
  'de-index': '1win',
  'de-bonuses': 'Bonus',
  'de-payments': 'Zahlungen',
  'de-crypto-casino': 'Krypto-Casino',
  'de-casino': 'Casino',
  'de-aviator': 'Aviator',
  'de-lucky-jet': 'Lucky Jet',
  'de-betting': 'Sport',
  'de-app': 'App',
  'de-safety': 'Sicherheit',
  'de-responsible-gambling': 'Verantwortungsvolles Spielen',
  'de-not-working': 'Öffnet nicht',
};

const UK_NAMES = {
  'uk-index': '1win',
  'uk-bonuses': 'Бонуси',
  'uk-payments': 'Платежі',
  'uk-crypto-casino': 'Крипто-казино',
  'uk-casino': 'Казино',
  'uk-aviator': 'Aviator',
  'uk-lucky-jet': 'Lucky Jet',
  'uk-betting': 'Спорт',
  'uk-app': 'Додаток',
  'uk-safety': 'Безпека',
  'uk-responsible-gambling': 'Відповідальна гра',
  'uk-not-working': 'Не відкривається',
};

const IT_NAMES = {
  'it-index': '1win',
  'it-bonuses': 'Bonus',
  'it-payments': 'Pagamenti',
  'it-crypto-casino': 'Casino crypto',
  'it-casino': 'Casino',
  'it-aviator': 'Aviator',
  'it-lucky-jet': 'Lucky Jet',
  'it-betting': 'Sport',
  'it-app': 'App',
  'it-safety': 'Sicurezza',
  'it-responsible-gambling': 'Gioco responsabile',
  'it-not-working': 'Non si apre',
};

const AZ_NAMES = {
  'az-index': '1win',
  'az-bonuses': 'Bonuslar',
  'az-payments': 'Ödənişlər',
  'az-crypto-casino': 'Kripto kazino',
  'az-casino': 'Kazino',
  'az-aviator': 'Aviator',
  'az-lucky-jet': 'Lucky Jet',
  'az-betting': 'İdman',
  'az-app': 'Tətbiq',
  'az-safety': 'Təhlükəsizlik',
  'az-responsible-gambling': 'Məsuliyyətli oyun',
  'az-not-working': 'Açılmır',
};

const RU_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'ru-index' : `ru-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'ru/index.html' : `ru/${page.file}`,
    name: RU_NAMES[slug] || `${page.name} RU`,
  };
});

const ES_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'es-index' : `es-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'es/index.html' : `es/${page.file}`,
    name: ES_NAMES[slug] || `${page.name} ES`,
  };
});

const FR_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'fr-index' : `fr-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'fr/index.html' : `fr/${page.file}`,
    name: FR_NAMES[slug] || `${page.name} FR`,
  };
});

const DE_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'de-index' : `de-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'de/index.html' : `de/${page.file}`,
    name: DE_NAMES[slug] || `${page.name} DE`,
  };
});

const UK_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'uk-index' : `uk-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'uk/index.html' : `uk/${page.file}`,
    name: UK_NAMES[slug] || `${page.name} UK`,
  };
});

const IT_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'it-index' : `it-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'it/index.html' : `it/${page.file}`,
    name: IT_NAMES[slug] || `${page.name} IT`,
  };
});

const AZ_PAGES = PAGES.map((page) => {
  const slug = page.slug === 'index' ? 'az-index' : `az-${page.slug}`;
  return {
    ...page,
    slug,
    file: page.slug === 'index' ? 'az/index.html' : `az/${page.file}`,
    name: AZ_NAMES[slug] || `${page.name} AZ`,
  };
});

const SITE_OFFERS = [
  {
    brand: '1win',
    url: 'https://1winex.com/go',
    label: 'Register / Login',
    kind: 'bonus',
    aliases: [
      'welcome bonus',
      'claim bonus',
      'best bonus',
      'bonus',
      'бонус',
      'промо',
      'promo code',
      'промокод',
      'WINEX600',
      '600%',
      '500 FS',
      'coupon',
      'register',
      'login',
      'registration',
      'bono',
      'código promocional',
      'código promo',
      'registro',
      'registrarse',
      'entrar',
      'inscription',
      'connexion',
      'bonus de bienvenue',
      'code promo',
      'Willkommensbonus',
      'Promo-Code',
      'Registrieren',
      'Anmelden',
      'реєстрація',
      'вхід',
      'вітальний бонус',
      'промокод',
      'bonus di benvenuto',
      'codice promo',
      'registrati',
      'accedi',
      'qeydiyyat',
      'giriş',
      'xoş gəldin bonusu',
      'promo kod',
    ],
  },
  {
    brand: '1win',
    url: 'https://1winex.com/apk',
    label: 'Download APK',
    kind: 'apk',
    aliases: ['apk', 'android', 'download apk', 'скачать apk', 'приложение', 'app', 'descargar apk', 'télécharger apk', 'APK herunterladen', 'завантажити apk', 'додаток', 'scarica apk', 'tətbiq', 'yüklə apk', 'android apk'],
  },
];
const CTA_PREFIX_EN = 'Register / Login: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_RU = 'Регистрация / вход: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_ES = 'Registrarse / Entrar: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_FR = 'Inscription / Connexion : https://1winex.com/go. APK : https://1winex.com/apk. ';
const CTA_PREFIX_DE = 'Registrieren / Anmelden: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_UK = 'Реєстрація / вхід: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_IT = 'Registrati / Accedi: https://1winex.com/go. APK: https://1winex.com/apk. ';
const CTA_PREFIX_AZ = 'Qeydiyyat / giriş: https://1winex.com/go. APK: https://1winex.com/apk. ';

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#?\w+;/g, ' ');
}

function stripHtml(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ');
  s = s.replace(/<div[^>]*\bdata-welcome-timer\b[^>]*>[\s\S]*?<\/div>/gi, ' ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  return s.replace(/\s+/g, ' ').trim();
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1]).replace(/\s+/g, ' ').trim() : '';
}

function extractMetaDescription(html) {
  const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  return m ? decodeEntities(m[1]).trim() : '';
}

const entries = [];
for (const page of [...PAGES, ...RU_PAGES, ...ES_PAGES, ...FR_PAGES, ...DE_PAGES, ...UK_PAGES, ...IT_PAGES, ...AZ_PAGES]) {
  const filePath = path.join(ROOT, page.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`[corpus] missing ${page.file}`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const prefix = page.slug.startsWith('ru-')
    ? CTA_PREFIX_RU
    : page.slug.startsWith('es-')
      ? CTA_PREFIX_ES
      : page.slug.startsWith('fr-')
        ? CTA_PREFIX_FR
        : page.slug.startsWith('de-')
          ? CTA_PREFIX_DE
          : page.slug.startsWith('uk-')
            ? CTA_PREFIX_UK
            : page.slug.startsWith('it-')
              ? CTA_PREFIX_IT
              : page.slug.startsWith('az-')
                ? CTA_PREFIX_AZ
          : CTA_PREFIX_EN;
  const text = (prefix + stripHtml(html)).slice(0, MAX_TEXT);
  const title = extractTitle(html) || page.name;
  const pathUrl =
    page.slug === 'index'
      ? '/'
      : page.slug === 'ru-index'
        ? '/ru'
        : page.slug === 'es-index'
          ? '/es'
          : page.slug === 'fr-index'
            ? '/fr'
            : page.slug === 'de-index'
              ? '/de'
              : page.slug === 'uk-index'
                ? '/uk'
                : page.slug === 'it-index'
                  ? '/it'
                  : page.slug === 'az-index'
                    ? '/az'
              : page.slug.startsWith('ru-')
                ? `/ru/${page.slug.slice(3)}`
                : page.slug.startsWith('es-')
                  ? `/es/${page.slug.slice(3)}`
                  : page.slug.startsWith('fr-')
                    ? `/fr/${page.slug.slice(3)}`
                    : page.slug.startsWith('de-')
                      ? `/de/${page.slug.slice(3)}`
                      : page.slug.startsWith('uk-')
                        ? `/uk/${page.slug.slice(3)}`
                        : page.slug.startsWith('it-')
                          ? `/it/${page.slug.slice(3)}`
                          : page.slug.startsWith('az-')
                            ? `/az/${page.slug.slice(3)}`
                      : `/${page.slug}`;
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

if (!fs.existsSync(API_ROOT)) {
  console.error(`[corpus] missing API repo: ${API_ROOT}`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(corpus, null, 2), 'utf8');
console.log(`[corpus] wrote ${OUT} pages=${entries.length} bytes=${fs.statSync(OUT).size}`);
