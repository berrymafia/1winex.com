import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const locales = ['ru', 'es', 'fr', 'de', 'uk', 'it', 'az', 'bn', 'hi', 'fil'];
const slugs = [
  '',
  'safety',
  'bonuses',
  'casino',
  'aviator',
  'lucky-jet',
  'betting',
  'payments',
  'crypto-casino',
  'app',
  'responsible-gambling',
  'not-working',
];
const expectedUrls = new Set(
  ['', ...locales].flatMap((locale) =>
    slugs.map((slug) => {
      const path = [locale, slug].filter(Boolean).join('/');
      return path ? `https://1winex.com/${path}` : 'https://1winex.com/';
    }),
  ),
);

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const decodeHtmlText = (value) =>
  value
    ?.replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'");

const staleLocalizedCopy = [
  'Göndərən adi yoxlamaları keçməyə məcbur edir.',
  '18 yaşdan yuxarı',
  'yerli qanunları başa düşməlidir',
  '500 pulsuz fırlanma',
  'এই সাইট শুধু প্রাপ্তবয়স্কদের।',
  '1Win N.V. পরিচালিত, Curaçao Gaming Authority লাইসেন্স',
  'এই তথ্য থেকে সম্ভাব্য আর্থিক ক্ষতির দায় আমরা নিই না।',
  'up to 600% + 500 free spins',
  'до 600% и 500 фриспинов',
  'до 600% і 500 фріспінів',
  'hasta 600 % y 500 giros gratis',
  'jusqu’à 600 % et 500 tours gratuits',
  'fino al 600 % e 500 giri gratis',
  '¿Dónde puedo obtener ayuda independiente con el juego?',
  'Où trouver une aide indépendante pour le jeu ?',
  'Dove trovo supporto indipendente per il gioco?',
  'Prova anche una VPN o l’app 1win.',
  'Eine Auszahlung vor erfülltem Umsatz storniert den aktiven Bonus.',
];

const bonusTitleKeywords = {
  en: 'Promo Code',
  ru: 'Промокод',
  uk: 'Промокод',
  es: 'Código promo',
  fr: 'Code promo',
  de: 'Promo-Code',
  it: 'Codice promo',
  az: 'promo kodu',
  bn: 'প্রোমো কোড',
  hi: 'प्रोमो कोड',
  fil: 'Kodigong promo',
};

const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const publicSitemap = await readFile(resolve(root, 'public/sitemap.xml'), 'utf8');
assert(sitemap === publicSitemap, 'Root and public sitemap.xml differ');

const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => match[1],
);
assert(urlBlocks.length === 132, `Expected 132 sitemap URLs, found ${urlBlocks.length}`);

const sitemapUrls = new Set();
for (const block of urlBlocks) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  assert(Boolean(loc), 'Sitemap URL block is missing <loc>');
  if (!loc) continue;
  sitemapUrls.add(loc);

  const alternates = [
    ...block.matchAll(
      /<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g,
    ),
  ].map((match) => ({ language: match[1], href: match[2] }));
  assert(alternates.length === 12, `${loc} has ${alternates.length} alternates`);

  for (const { language, href } of alternates) {
    const pathname = new URL(href).pathname;
    if (language === 'az') {
      assert(
        pathname === '/az' || pathname.startsWith('/az/'),
        `${loc} maps hreflang=az to ${href}`,
      );
    }
    if (language === 'bn') {
      assert(
        pathname === '/bn' || pathname.startsWith('/bn/'),
        `${loc} maps hreflang=bn to ${href}`,
      );
    }
    if (language === 'hi') {
      assert(
        pathname === '/hi' || pathname.startsWith('/hi/'),
        `${loc} maps hreflang=hi to ${href}`,
      );
    }
    if (language === 'fil') {
      assert(
        pathname === '/fil' || pathname.startsWith('/fil/'),
        `${loc} maps hreflang=fil to ${href}`,
      );
    }
  }
}

for (const url of expectedUrls) {
  assert(sitemapUrls.has(url), `Sitemap is missing ${url}`);
}
for (const url of sitemapUrls) {
  assert(expectedUrls.has(url), `Sitemap contains unexpected URL ${url}`);
}

let organizationNodes = 0;
let websiteNodes = 0;
let imagesChecked = 0;
let decorativeImages = 0;
for (const url of expectedUrls) {
  const pathname = new URL(url).pathname;
  const parts = pathname.split('/').filter(Boolean);
  const relativePath =
    parts.length === 0
      ? 'index.html'
      : parts.length === 1 && locales.includes(parts[0])
        ? `${parts[0]}/index.html`
        : `${parts.join('/')}.html`;
  const html = await readFile(resolve(root, relativePath), 'utf8');
  const expectedLanguage =
    parts.length > 0 && locales.includes(parts[0]) ? parts[0] : 'en';

  assert(
    html.includes(`<html lang="${expectedLanguage}">`),
    `${relativePath} has the wrong html lang`,
  );
  assert(
    html.includes(`<link rel="canonical" href="${url}">`),
    `${relativePath} has the wrong canonical`,
  );
  assert(
    (html.match(/<title>[\s\S]*?<\/title>/g) ?? []).length === 1,
    `${relativePath} must have exactly one title`,
  );
  assert(
    (html.match(/<meta name="description" content="[^"]+">/g) ?? []).length === 1,
    `${relativePath} must have one meta description`,
  );
  assert(
    (html.match(/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/g) ?? []).length === 1,
    `${relativePath} must have exactly one H1`,
  );
  assert(
    (html.match(/<link rel="alternate" hreflang=/g) ?? []).length === 12,
    `${relativePath} must have 12 hreflang links`,
  );
  assert(
    html.includes(
      '<link rel="sitemap" type="application/xml" href="https://1winex.com/sitemap.xml">',
    ),
    `${relativePath} must use the canonical sitemap URL`,
  );

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const image = match[0];
    imagesChecked += 1;
    assert(/\balt="[^"]*"/.test(image), `${relativePath} has an image without alt`);
    if (/\balt=""/.test(image)) {
      decorativeImages += 1;
      assert(
        /\baria-hidden="true"/.test(image),
        `${relativePath} has an unclassified empty-alt image: ${image}`,
      );
    }
  }

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  if (relativePath === 'bonuses.html' || relativePath.endsWith('/bonuses.html')) {
    assert(
      title?.includes(bonusTitleKeywords[expectedLanguage]),
      `${relativePath} title is missing the localized promo-code keyword`,
    );
    assert(
      !title?.includes('WINEX600'),
      `${relativePath} title still contains WINEX600`,
    );
  }
  const ogTitle = html.match(
    /<meta property="og:title" content="([^"]+)">/,
  )?.[1];
  const twitterTitle = html.match(
    /<meta name="twitter:title" content="([^"]+)">/,
  )?.[1];
  assert(
    title === ogTitle && title === twitterTitle,
    `${relativePath} has inconsistent title metadata`,
  );

  const description = html.match(
    /<meta name="description" content="([^"]+)">/,
  )?.[1];
  const ogDescription = html.match(
    /<meta property="og:description" content="([^"]+)">/,
  )?.[1];
  const twitterDescription = html.match(
    /<meta name="twitter:description" content="([^"]+)">/,
  )?.[1];
  assert(
    description === ogDescription && description === twitterDescription,
    `${relativePath} has inconsistent description metadata`,
  );

  const ogImageAlt = html.match(
    /<meta property="og:image:alt" content="([^"]+)">/,
  )?.[1];
  const twitterImageAlt = html.match(
    /<meta name="twitter:image:alt" content="([^"]+)">/,
  )?.[1];
  assert(
    ogImageAlt === twitterImageAlt,
    `${relativePath} has inconsistent social image alt metadata`,
  );

  const jsonLd = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  const visibleHtml = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    '',
  );
  for (const [index, match] of jsonLd.entries()) {
    try {
      const data = JSON.parse(match[1]);
      if (data['@type'] === 'Organization') organizationNodes += 1;
      if (data['@type'] === 'WebSite') websiteNodes += 1;
      if (data['@type'] === 'WebPage' || data['@type'] === 'CollectionPage') {
        assert(
          data.name === decodeHtmlText(title) &&
            data.description === decodeHtmlText(description),
          `${relativePath} has WebPage metadata that differs from title or description`,
        );
        if (data.isPartOf) {
          assert(
            data.isPartOf['@id'] === 'https://1winex.com/#website',
            `${relativePath} has a locale-scoped WebSite entity`,
          );
        }
        if (data.author) {
          assert(
            data.author['@id'] === 'https://1winex.com/#organization',
            `${relativePath} has a duplicated Organization entity`,
          );
        }
      }
      if (data['@type'] === 'FAQPage') {
        for (const question of data.mainEntity ?? []) {
          assert(
            typeof question.name === 'string' &&
              visibleHtml.includes(question.name),
            `${relativePath} FAQ JSON-LD question is missing from visible copy: ${question.name}`,
          );
        }
      }
    } catch (error) {
      failures.push(`${relativePath} JSON-LD ${index + 1}: ${error.message}`);
    }
  }
}

assert(organizationNodes === 1, `Expected one Organization node, found ${organizationNodes}`);
assert(websiteNodes === 1, `Expected one WebSite node, found ${websiteNodes}`);

for (const locale of ['', ...locales]) {
  const relativePath = locale ? `${locale}/404.html` : '404.html';
  const html = await readFile(resolve(root, relativePath), 'utf8');
  assert(
    html.includes('<meta name="robots" content="noindex, nofollow">'),
    `${relativePath} must be noindex, nofollow`,
  );
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const image = match[0];
    imagesChecked += 1;
    assert(/\balt="[^"]*"/.test(image), `${relativePath} has an image without alt`);
    if (/\balt=""/.test(image)) {
      decorativeImages += 1;
      assert(
        /\baria-hidden="true"/.test(image),
        `${relativePath} has an unclassified empty-alt image: ${image}`,
      );
    }
  }
}

for (const locale of ['', ...locales]) {
  const prefix = locale ? `${locale}/` : '';
  for (const name of pageNamesFromSlugs()) {
    const relativePath = `${prefix}${name}`;
    const html = await readFile(resolve(root, relativePath), 'utf8');
    assert(
      !/Benqali{2,}/.test(html),
      `${relativePath} has a corrupted Bengali picker label`,
    );
    assert(
      !html.includes('Français (Côte d’Ivoire)'),
      `${relativePath} still labels French as Côte d’Ivoire`,
    );
    assert(!html.includes('©2026'), `${relativePath} is missing a space after ©`);
    for (const stale of staleLocalizedCopy) {
      assert(
        !html.includes(stale),
        `${relativePath} still contains stale localized copy: ${stale}`,
      );
    }
    if (relativePath === 'az/safety.html') {
      assert(
        html.includes(
          'Göndərən sizi adi yoxlamalardan yan keçməyə məcbur edir.',
        ),
        'az/safety.html is missing the corrected anti-phishing warning',
      );
    }
    if (relativePath.startsWith('bn/')) {
      assert(
        html.includes(
          'Curaçao Gaming Authority-এর B2C লাইসেন্স',
        ),
        `${relativePath} is missing the corrected Bengali licence footer`,
      );
    }
    if (relativePath.startsWith('fr/')) {
      assert(
        !html.includes('Recommandés'),
        `${relativePath} uses masculine Recommandés in the language picker`,
      );
    }
  }
}

function pageNamesFromSlugs() {
  return [
    'index.html',
    'safety.html',
    'bonuses.html',
    'casino.html',
    'aviator.html',
    'lucky-jet.html',
    'betting.html',
    'payments.html',
    'crypto-casino.html',
    'app.html',
    'responsible-gambling.html',
    'not-working.html',
    '404.html',
  ];
}

const htaccess = await readFile(resolve(root, '.htaccess'), 'utf8');
const publicHtaccess = await readFile(resolve(root, 'public/.htaccess'), 'utf8');
assert(htaccess === publicHtaccess, 'Root and public .htaccess differ');
assert(
  htaccess.includes('ErrorDocument 404 /404.html'),
  '.htaccess is missing ErrorDocument 404',
);
assert(
  htaccess.includes('ErrorDocument 404 /fil/404.html'),
  '.htaccess is missing the localized Tagalog ErrorDocument',
);
assert(
  !/RewriteRule \^ (?:ru|es|fr|de|uk|it|az|bn|hi|fil)\/404\.html/.test(htaccess),
  '.htaccess still contains localized soft-404 rewrites',
);

for (const asset of ['site.js', 'chat-widget-loader.js', 'chat-widget.js']) {
  const rootAsset = await readFile(resolve(root, `js/${asset}`), 'utf8');
  const publicAsset = await readFile(resolve(root, `public/js/${asset}`), 'utf8');
  assert(
    rootAsset === publicAsset,
    `Root and public js/${asset} differ`,
  );
}

for (const line of htaccess.split(/\r?\n/)) {
  if (line.includes('[R=301')) {
    const substitution = line.trim().split(/\s+/)[2];
    assert(
      substitution?.startsWith('https://1winex.com'),
      `Non-canonical 301 substitution: ${line.trim()}`,
    );
  }
}

if (failures.length > 0) {
  console.error(`SEO validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO validation passed: ${expectedUrls.size} URLs, 11 locales, 132 sitemap entries, ${imagesChecked} images (${decorativeImages} decorative).`,
);
