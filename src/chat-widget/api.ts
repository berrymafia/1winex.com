import { CHAT_ENDPOINT } from './constants';
import type { ChatRequestBody } from './types';

export interface StreamHandlers {
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

/**
 * POST /api/chat and consume SSE-style `data:` frames until [DONE].
 */
export async function streamChat(
  body: ChatRequestBody,
  handlers: StreamHandlers,
  signal?: AbortSignal
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      handlers.onDone();
      return;
    }
    handlers.onError('Network error. Please try again.');
    return;
  }

  if (!res.ok) {
    let msg = 'Request failed. Please try again.';
    try {
      const j = (await res.json()) as { error?: string };
      if (j?.error) msg = j.error;
    } catch {
      /* ignore */
    }
    handlers.onError(msg);
    return;
  }

  if (!res.body) {
    handlers.onError('Empty response from server.');
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const parts = buffer.split('\n');
      buffer = parts.pop() || '';

      for (const line of parts) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload) continue;
        if (payload === '[DONE]') {
          handlers.onDone();
          return;
        }
        try {
          const evt = JSON.parse(payload) as {
            type?: string;
            delta?: string;
            error?: string;
          };
          if (evt.type === 'delta' && evt.delta) handlers.onDelta(evt.delta);
          else if (evt.type === 'error') handlers.onError(evt.error || 'Assistant error.');
          else if (evt.type === 'done') {
            /* final frame may still send [DONE] */
          }
        } catch {
          /* ignore malformed frames */
        }
      }
    }
    handlers.onDone();
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      handlers.onDone();
      return;
    }
    handlers.onError('Stream interrupted. Please try again.');
  }
}
