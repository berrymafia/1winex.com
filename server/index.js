/**
 * 1winex chat API server.
 *
 * Dev: run alongside Vite (`npm run dev:all`) — Vite proxies /api → this process.
 * Prod: serves built/static files (optional) + /api/chat with rate limiting.
 *
 * Never expose OPENAI_API_KEY to the browser.
 */
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { chatHandler } from './chat.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PORT = Number(process.env.PORT || 8787);
const SERVE_STATIC = process.env.SERVE_STATIC === '1' || process.env.NODE_ENV === 'production';

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(express.json({ limit: '64kb' }));

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.CHAT_RATE_LIMIT_PER_MIN || 20),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment and try again.' },
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    site: '1winex.com',
    chatConfigured: Boolean(process.env.OPENAI_API_KEY),
  });
});

app.post('/api/chat', chatLimiter, chatHandler);

if (SERVE_STATIC) {
  // Prefer Vite `dist/` when present; fall back to repo root for Apache-style deploys.
  const dist = path.join(root, 'dist');
  const staticRoot = path.join(root); // MPA source / mirrored public assets
  app.use(express.static(dist, { index: false, fallthrough: true }));
  app.use(express.static(staticRoot, { index: false, fallthrough: true }));
}

app.use((err, _req, res, _next) => {
  console.error('[server] unhandled:', err?.message || err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`[1winex chat] listening on http://localhost:${PORT}`);
  console.log(`[1winex chat] OPENAI_API_KEY ${process.env.OPENAI_API_KEY ? 'set' : 'MISSING'}`);
  console.log(`[1winex chat] static=${SERVE_STATIC}`);
});
