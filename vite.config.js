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
        if (
          url !== '/' &&
          !url.includes('.') &&
          url !== '/favicon.ico'
        ) {
          req.url = url + '.html';
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
      },
    },
  },
  appType: 'mpa',
  html: {
    cspNonce: undefined,
  },
});
