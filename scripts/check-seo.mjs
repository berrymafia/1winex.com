import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const locales = ['ru', 'es', 'fr', 'de', 'uk', 'it', 'az', 'bn'];
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

const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const publicSitemap = await readFile(resolve(root, 'public/sitemap.xml'), 'utf8');
assert(sitemap === publicSitemap, 'Root and public sitemap.xml differ');

const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
  (match) => match[1],
);
assert(urlBlocks.length === 108, `Expected 108 sitemap URLs, found ${urlBlocks.length}`);

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
  assert(alternates.length === 10, `${loc} has ${alternates.length} alternates`);

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
    (html.match(/<link rel="alternate" hreflang=/g) ?? []).length === 10,
    `${relativePath} must have 10 hreflang links`,
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
  for (const [index, match] of jsonLd.entries()) {
    try {
      const data = JSON.parse(match[1]);
      if (data['@type'] === 'Organization') organizationNodes += 1;
      if (data['@type'] === 'WebSite') websiteNodes += 1;
      if (data['@type'] === 'WebPage' || data['@type'] === 'CollectionPage') {
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
  !/RewriteRule \^ (?:ru|es|fr|de|uk|it|az|bn)\/404\.html/.test(htaccess),
  '.htaccess still contains localized soft-404 rewrites',
);
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
  `SEO validation passed: ${expectedUrls.size} URLs, 9 locales, 108 sitemap entries, ${imagesChecked} images (${decorativeImages} decorative).`,
);
