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
      '/api': {
        target: 'http://localhost:8787',
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
        games: resolve(__dirname, 'games.html'),
        payments: resolve(__dirname, 'payments.html'),
        mobile: resolve(__dirname, 'mobile.html'),
        'responsible-gambling': resolve(__dirname, 'responsible-gambling.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
  appType: 'mpa',
  html: {
    cspNonce: undefined,
  },
});
