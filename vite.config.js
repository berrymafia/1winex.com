import { existsSync } from 'fs';
import { defineConfig } from 'vite';
import { resolve } from 'path';

function htmlRewritePlugin() {
  return {
    name: 'html-rewrite',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0].split('#')[0];
        if (url.startsWith('/api/')) {
          next();
          return;
        }
        if (url === '/go' || url === '/go/') {
          res.statusCode = 302;
          res.setHeader('Location', 'https://bonus-999.com/1win');
          res.end();
          return;
        }
        if (url === '/apk' || url === '/apk/') {
          res.statusCode = 302;
          res.setHeader('Location', 'https://bonus-999.com/apk');
          res.end();
          return;
        }
        if (url === '/games' || url === '/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/casino');
          res.end();
          return;
        }
        if (url === '/sports' || url === '/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/betting');
          res.end();
          return;
        }
        if (url === '/mobile' || url === '/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/app');
          res.end();
          return;
        }
        if (url === '/ru/') {
          res.statusCode = 301;
          res.setHeader('Location', '/ru');
          res.end();
          return;
        }
        if (url === '/ru') {
          req.url = '/ru/index.html';
          next();
          return;
        }
        if (url === '/ru/games' || url === '/ru/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/ru/casino');
          res.end();
          return;
        }
        if (url === '/ru/sports' || url === '/ru/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/ru/betting');
          res.end();
          return;
        }
        if (url === '/ru/mobile' || url === '/ru/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/ru/app');
          res.end();
          return;
        }
        if (url === '/es/') {
          res.statusCode = 301;
          res.setHeader('Location', '/es');
          res.end();
          return;
        }
        if (url === '/es') {
          req.url = '/es/index.html';
          next();
          return;
        }
        if (url === '/es/games' || url === '/es/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/es/casino');
          res.end();
          return;
        }
        if (url === '/es/sports' || url === '/es/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/es/betting');
          res.end();
          return;
        }
        if (url === '/es/mobile' || url === '/es/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/es/app');
          res.end();
          return;
        }
        if (url === '/fr/') {
          res.statusCode = 301;
          res.setHeader('Location', '/fr');
          res.end();
          return;
        }
        if (url === '/fr') {
          req.url = '/fr/index.html';
          next();
          return;
        }
        if (url === '/fr/games' || url === '/fr/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/fr/casino');
          res.end();
          return;
        }
        if (url === '/fr/sports' || url === '/fr/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/fr/betting');
          res.end();
          return;
        }
        if (url === '/fr/mobile' || url === '/fr/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/fr/app');
          res.end();
          return;
        }
        if (url === '/de/') {
          res.statusCode = 301;
          res.setHeader('Location', '/de');
          res.end();
          return;
        }
        if (url === '/de') {
          req.url = '/de/index.html';
          next();
          return;
        }
        if (url === '/de/games' || url === '/de/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/de/casino');
          res.end();
          return;
        }
        if (url === '/de/sports' || url === '/de/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/de/betting');
          res.end();
          return;
        }
        if (url === '/de/mobile' || url === '/de/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/de/app');
          res.end();
          return;
        }
        if (url === '/uk/') {
          res.statusCode = 301;
          res.setHeader('Location', '/uk');
          res.end();
          return;
        }
        if (url === '/uk') {
          req.url = '/uk/index.html';
          next();
          return;
        }
        if (url === '/uk/games' || url === '/uk/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/uk/casino');
          res.end();
          return;
        }
        if (url === '/uk/sports' || url === '/uk/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/uk/betting');
          res.end();
          return;
        }
        if (url === '/uk/mobile' || url === '/uk/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/uk/app');
          res.end();
          return;
        }
        if (url === '/it/') {
          res.statusCode = 301;
          res.setHeader('Location', '/it');
          res.end();
          return;
        }
        if (url === '/it') {
          req.url = '/it/index.html';
          next();
          return;
        }
        if (url === '/it/games' || url === '/it/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/it/casino');
          res.end();
          return;
        }
        if (url === '/it/sports' || url === '/it/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/it/betting');
          res.end();
          return;
        }
        if (url === '/it/mobile' || url === '/it/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/it/app');
          res.end();
          return;
        }
        if (url === '/az/') {
          res.statusCode = 301;
          res.setHeader('Location', '/az');
          res.end();
          return;
        }
        if (url === '/az') {
          req.url = '/az/index.html';
          next();
          return;
        }
        if (url === '/az/games' || url === '/az/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/az/casino');
          res.end();
          return;
        }
        if (url === '/az/sports' || url === '/az/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/az/betting');
          res.end();
          return;
        }
        if (url === '/az/mobile' || url === '/az/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/az/app');
          res.end();
          return;
        }
        if (url === '/bn/') {
          res.statusCode = 301;
          res.setHeader('Location', '/bn');
          res.end();
          return;
        }
        if (url === '/bn') {
          req.url = '/bn/index.html';
          next();
          return;
        }
        if (url === '/bn/games' || url === '/bn/games/') {
          res.statusCode = 301;
          res.setHeader('Location', '/bn/casino');
          res.end();
          return;
        }
        if (url === '/bn/sports' || url === '/bn/sports/') {
          res.statusCode = 301;
          res.setHeader('Location', '/bn/betting');
          res.end();
          return;
        }
        if (url === '/bn/mobile' || url === '/bn/mobile/') {
          res.statusCode = 301;
          res.setHeader('Location', '/bn/app');
          res.end();
          return;
        }
        if (
          url !== '/' &&
          !url.includes('.') &&
          url !== '/favicon.ico'
        ) {
          const htmlFile = resolve(__dirname, url.slice(1) + '.html');
          if (existsSync(htmlFile)) {
            req.url = url + '.html';
          } else if (url.startsWith('/ru/')) {
            req.url = '/ru/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/es/')) {
            req.url = '/es/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/fr/')) {
            req.url = '/fr/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/de/')) {
            req.url = '/de/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/uk/')) {
            req.url = '/uk/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/it/')) {
            req.url = '/it/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/az/')) {
            req.url = '/az/404.html';
            res.statusCode = 404;
          } else if (url.startsWith('/bn/')) {
            req.url = '/bn/404.html';
            res.statusCode = 404;
          } else {
            req.url = url + '.html';
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [htmlRewritePlugin()],
  base: './',
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://api-chat.net',
        changeOrigin: true,
        timeout: 0,
        proxyTimeout: 0,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        safety: resolve(__dirname, 'safety.html'),
        bonuses: resolve(__dirname, 'bonuses.html'),
        casino: resolve(__dirname, 'casino.html'),
        aviator: resolve(__dirname, 'aviator.html'),
        'lucky-jet': resolve(__dirname, 'lucky-jet.html'),
        betting: resolve(__dirname, 'betting.html'),
        payments: resolve(__dirname, 'payments.html'),
        'crypto-casino': resolve(__dirname, 'crypto-casino.html'),
        app: resolve(__dirname, 'app.html'),
        'responsible-gambling': resolve(__dirname, 'responsible-gambling.html'),
        'not-working': resolve(__dirname, 'not-working.html'),
        '404': resolve(__dirname, '404.html'),
        'ru-main': resolve(__dirname, 'ru/index.html'),
        'ru-safety': resolve(__dirname, 'ru/safety.html'),
        'ru-bonuses': resolve(__dirname, 'ru/bonuses.html'),
        'ru-casino': resolve(__dirname, 'ru/casino.html'),
        'ru-aviator': resolve(__dirname, 'ru/aviator.html'),
        'ru-lucky-jet': resolve(__dirname, 'ru/lucky-jet.html'),
        'ru-betting': resolve(__dirname, 'ru/betting.html'),
        'ru-payments': resolve(__dirname, 'ru/payments.html'),
        'ru-crypto-casino': resolve(__dirname, 'ru/crypto-casino.html'),
        'ru-app': resolve(__dirname, 'ru/app.html'),
        'ru-responsible-gambling': resolve(__dirname, 'ru/responsible-gambling.html'),
        'ru-not-working': resolve(__dirname, 'ru/not-working.html'),
        'ru-404': resolve(__dirname, 'ru/404.html'),
        'es-main': resolve(__dirname, 'es/index.html'),
        'es-safety': resolve(__dirname, 'es/safety.html'),
        'es-bonuses': resolve(__dirname, 'es/bonuses.html'),
        'es-casino': resolve(__dirname, 'es/casino.html'),
        'es-aviator': resolve(__dirname, 'es/aviator.html'),
        'es-lucky-jet': resolve(__dirname, 'es/lucky-jet.html'),
        'es-betting': resolve(__dirname, 'es/betting.html'),
        'es-payments': resolve(__dirname, 'es/payments.html'),
        'es-crypto-casino': resolve(__dirname, 'es/crypto-casino.html'),
        'es-app': resolve(__dirname, 'es/app.html'),
        'es-responsible-gambling': resolve(__dirname, 'es/responsible-gambling.html'),
        'es-not-working': resolve(__dirname, 'es/not-working.html'),
        'es-404': resolve(__dirname, 'es/404.html'),
        'fr-main': resolve(__dirname, 'fr/index.html'),
        'fr-safety': resolve(__dirname, 'fr/safety.html'),
        'fr-bonuses': resolve(__dirname, 'fr/bonuses.html'),
        'fr-casino': resolve(__dirname, 'fr/casino.html'),
        'fr-aviator': resolve(__dirname, 'fr/aviator.html'),
        'fr-lucky-jet': resolve(__dirname, 'fr/lucky-jet.html'),
        'fr-betting': resolve(__dirname, 'fr/betting.html'),
        'fr-payments': resolve(__dirname, 'fr/payments.html'),
        'fr-crypto-casino': resolve(__dirname, 'fr/crypto-casino.html'),
        'fr-app': resolve(__dirname, 'fr/app.html'),
        'fr-responsible-gambling': resolve(__dirname, 'fr/responsible-gambling.html'),
        'fr-not-working': resolve(__dirname, 'fr/not-working.html'),
        'fr-404': resolve(__dirname, 'fr/404.html'),
        'de-main': resolve(__dirname, 'de/index.html'),
        'de-safety': resolve(__dirname, 'de/safety.html'),
        'de-bonuses': resolve(__dirname, 'de/bonuses.html'),
        'de-casino': resolve(__dirname, 'de/casino.html'),
        'de-aviator': resolve(__dirname, 'de/aviator.html'),
        'de-lucky-jet': resolve(__dirname, 'de/lucky-jet.html'),
        'de-betting': resolve(__dirname, 'de/betting.html'),
        'de-payments': resolve(__dirname, 'de/payments.html'),
        'de-crypto-casino': resolve(__dirname, 'de/crypto-casino.html'),
        'de-app': resolve(__dirname, 'de/app.html'),
        'de-responsible-gambling': resolve(__dirname, 'de/responsible-gambling.html'),
        'de-not-working': resolve(__dirname, 'de/not-working.html'),
        'de-404': resolve(__dirname, 'de/404.html'),
        'uk-main': resolve(__dirname, 'uk/index.html'),
        'uk-safety': resolve(__dirname, 'uk/safety.html'),
        'uk-bonuses': resolve(__dirname, 'uk/bonuses.html'),
        'uk-casino': resolve(__dirname, 'uk/casino.html'),
        'uk-aviator': resolve(__dirname, 'uk/aviator.html'),
        'uk-lucky-jet': resolve(__dirname, 'uk/lucky-jet.html'),
        'uk-betting': resolve(__dirname, 'uk/betting.html'),
        'uk-payments': resolve(__dirname, 'uk/payments.html'),
        'uk-crypto-casino': resolve(__dirname, 'uk/crypto-casino.html'),
        'uk-app': resolve(__dirname, 'uk/app.html'),
        'uk-responsible-gambling': resolve(__dirname, 'uk/responsible-gambling.html'),
        'uk-not-working': resolve(__dirname, 'uk/not-working.html'),
        'uk-404': resolve(__dirname, 'uk/404.html'),
        'it-main': resolve(__dirname, 'it/index.html'),
        'it-safety': resolve(__dirname, 'it/safety.html'),
        'it-bonuses': resolve(__dirname, 'it/bonuses.html'),
        'it-casino': resolve(__dirname, 'it/casino.html'),
        'it-aviator': resolve(__dirname, 'it/aviator.html'),
        'it-lucky-jet': resolve(__dirname, 'it/lucky-jet.html'),
        'it-betting': resolve(__dirname, 'it/betting.html'),
        'it-payments': resolve(__dirname, 'it/payments.html'),
        'it-crypto-casino': resolve(__dirname, 'it/crypto-casino.html'),
        'it-app': resolve(__dirname, 'it/app.html'),
        'it-responsible-gambling': resolve(__dirname, 'it/responsible-gambling.html'),
        'it-not-working': resolve(__dirname, 'it/not-working.html'),
        'it-404': resolve(__dirname, 'it/404.html'),
        'az-main': resolve(__dirname, 'az/index.html'),
        'az-safety': resolve(__dirname, 'az/safety.html'),
        'az-bonuses': resolve(__dirname, 'az/bonuses.html'),
        'az-casino': resolve(__dirname, 'az/casino.html'),
        'az-aviator': resolve(__dirname, 'az/aviator.html'),
        'az-lucky-jet': resolve(__dirname, 'az/lucky-jet.html'),
        'az-betting': resolve(__dirname, 'az/betting.html'),
        'az-payments': resolve(__dirname, 'az/payments.html'),
        'az-crypto-casino': resolve(__dirname, 'az/crypto-casino.html'),
        'az-app': resolve(__dirname, 'az/app.html'),
        'az-responsible-gambling': resolve(__dirname, 'az/responsible-gambling.html'),
        'az-not-working': resolve(__dirname, 'az/not-working.html'),
        'az-404': resolve(__dirname, 'az/404.html'),
        'bn-main': resolve(__dirname, 'bn/index.html'),
        'bn-safety': resolve(__dirname, 'bn/safety.html'),
        'bn-bonuses': resolve(__dirname, 'bn/bonuses.html'),
        'bn-casino': resolve(__dirname, 'bn/casino.html'),
        'bn-aviator': resolve(__dirname, 'bn/aviator.html'),
        'bn-lucky-jet': resolve(__dirname, 'bn/lucky-jet.html'),
        'bn-betting': resolve(__dirname, 'bn/betting.html'),
        'bn-payments': resolve(__dirname, 'bn/payments.html'),
        'bn-crypto-casino': resolve(__dirname, 'bn/crypto-casino.html'),
        'bn-app': resolve(__dirname, 'bn/app.html'),
        'bn-responsible-gambling': resolve(__dirname, 'bn/responsible-gambling.html'),
        'bn-not-working': resolve(__dirname, 'bn/not-working.html'),
        'bn-404': resolve(__dirname, 'bn/404.html'),
      },
    },
  },
  appType: 'mpa',
  html: {
    cspNonce: undefined,
  },
});
