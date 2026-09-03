/**
 * POST /api/chat — streaming Responses API handler.
 *
 * When the static corpus does not cover the question well, OpenAI hosted
 * `web_search` is used unless CHAT_WEB_SEARCH=0.
 */
import OpenAI from 'openai';
import { parseChatRequest } from './validate.js';
import { buildSystemPrompt, buildInputItems } from './prompt.js';
import { retrieveWithMeta } from './rag.js';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
/** Web search on weak corpus hits. Set CHAT_WEB_SEARCH=0 to disable. */
const WEB_SEARCH_ENABLED = process.env.CHAT_WEB_SEARCH !== '0';

function getClient() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

/**
 * Write one SSE data frame.
 * @param {import('express').Response} res
 * @param {object | string} payload
 */
function sendEvent(res, payload) {
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  res.write(`data: ${data}\n\n`);
  if (typeof res.flush === 'function') res.flush();
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function chatHandler(req, res) {
  const parsed = parseChatRequest(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const client = getClient();
  if (!client) {
    console.error('[chat] OPENAI_API_KEY is not set');
    res.status(503).json({ error: 'Chat service is temporarily unavailable.' });
    return;
  }

  const { messages, pageContext } = parsed.data;
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const { text: retrieved, sufficient, topScore, scope } = await retrieveWithMeta(
    lastUser?.content || '',
    pageContext
  );

  const allowWebSearch = WEB_SEARCH_ENABLED && !sufficient;
  console.log(
    `[chat] scope=${scope.mode} reasons=${scope.reasons.join(',') || '-'} topScore=${topScore}` +
      (allowWebSearch ? ' web_search=1' : '')
  );

  const instructions = buildSystemPrompt(pageContext, retrieved, {
    allowWebSearch,
    scope,
  });
  const input = buildInputItems(messages, pageContext, retrieved, { scope });

  /** @type {Record<string, unknown>} */
  const createParams = {
    model: MODEL,
    instructions,
    input,
    stream: true,
  };

  if (allowWebSearch) {
    // Hosted Responses API tool — model may call it when site context is thin.
    createParams.tools = [{ type: 'web_search' }];
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof res.flushHeaders === 'function') res.flushHeaders();

  let aborted = false;
  req.on('close', () => {
    aborted = true;
  });

  try {
    const stream = await client.responses.create(createParams);

    for await (const event of stream) {
      if (aborted) break;

      if (event.type === 'response.output_text.delta' && event.delta) {
        sendEvent(res, { type: 'delta', delta: event.delta });
      } else if (event.type === 'response.completed') {
        sendEvent(res, { type: 'done' });
      } else if (event.type === 'response.failed' || event.type === 'error') {
        console.error('[chat] upstream error event', event.type);
        sendEvent(res, { type: 'error', error: 'The assistant could not complete that reply.' });
      }
    }

    if (!aborted) {
      sendEvent(res, '[DONE]');
    }
    res.end();
  } catch (err) {
    console.error('[chat] stream failed:', err?.message || err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
      return;
    }
    try {
      sendEvent(res, { type: 'error', error: 'Something went wrong. Please try again.' });
      sendEvent(res, '[DONE]');
    } catch {
      /* ignore write-after-end */
    }
    res.end();
  }
}
