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
        'ru-app': resolve(__dirname, 'ru/app.html'),
        'ru-responsible-gambling': resolve(__dirname, 'ru/responsible-gambling.html'),
        'ru-not-working': resolve(__dirname, 'ru/not-working.html'),
        'ru-404': resolve(__dirname, 'ru/404.html'),
      },
    },
  },
  appType: 'mpa',
  html: {
    cspNonce: undefined,
  },
});
