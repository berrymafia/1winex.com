import { CHAT_ENDPOINT } from './constants';
import type { ChatRequestBody } from './types';

export interface StreamHandlers {
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

function uiLang(): 'en' | 'ru' | 'es' | 'fr' | 'de' | 'uk' | 'it' | 'az' | 'bn' | 'hi' | 'fil' | 'el' {
  if (typeof document === 'undefined') return 'en';
  const raw = (document.documentElement.lang || '').toLowerCase();
  if (raw.startsWith('uk')) return 'uk';
  if (raw.startsWith('ru')) return 'ru';
  if (raw.startsWith('es')) return 'es';
  if (raw.startsWith('fr')) return 'fr';
  if (raw.startsWith('de')) return 'de';
  if (raw.startsWith('it')) return 'it';
  if (raw.startsWith('az')) return 'az';
  if (raw.startsWith('bn')) return 'bn';
  if (raw.startsWith('hi')) return 'hi';
  if (raw.startsWith('fil') || raw.startsWith('tl')) return 'fil';
  if (raw.startsWith('el')) return 'el';
  return 'en';
}

function chatErr(en: string, ru: string, es: string, fr: string, de: string, uk: string, it: string, az: string, bn: string, hi: string, fil: string, el: string): string {
  const lang = uiLang();
  if (lang === 'el') return el;
  if (lang === 'fil') return fil;
  if (lang === 'hi') return hi;
  if (lang === 'bn') return bn;
  if (lang === 'az') return az;
  if (lang === 'it') return it;
  if (lang === 'uk') return uk;
  if (lang === 'de') return de;
  if (lang === 'fr') return fr;
  if (lang === 'es') return es;
  if (lang === 'ru') return ru;
  return en;
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
    handlers.onError(chatErr('Network error. Please try again.', 'Нет соединения. Попробуйте ещё раз.', 'No hay conexión. Inténtalo de nuevo.', 'Pas de connexion. Réessayez.', 'Netzwerkfehler. Versuch’s nochmal.', 'Немає з\'єднання. Спробуйте ще раз.', 'Nessuna connessione. Riprova.', 'Şəbəkə xətası. Yenidən cəhd edin.', 'নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।', 'नेटवर्क समस्या। फिर कोशिश करें।', 'May problema sa network. Subukan muli.', 'Σφάλμα δικτύου. Δοκιμάστε ξανά.'));
    return;
  }

  if (!res.ok) {
    const msg = chatErr('Request failed. Please try again.', 'Не удалось получить ответ. Попробуйте ещё раз.', 'No llegó la respuesta. Inténtalo de nuevo.', 'Pas de réponse. Réessayez.', 'Anfrage fehlgeschlagen. Versuch’s nochmal.', 'Не вдалося отримати відповідь. Спробуйте ще раз.', 'Richiesta non riuscita. Riprova.', 'Sorğu uğursuz oldu. Yenidən cəhd edin.', 'অনুরোধ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'अनुरोध विफल रहा। फिर कोशिश करें।', 'Hindi natuloy ang kahilingan. Subukan muli.', 'Το αίτημα απέτυχε. Δοκιμάστε ξανά.');
    handlers.onError(msg);
    return;
  }

  if (!res.body) {
    handlers.onError(chatErr('Empty response from server.', 'Сервер вернул пустой ответ.', 'El servidor no mandó nada.', 'Le serveur n’a rien renvoyé.', 'Leere Antwort vom Server.', 'Сервер повернув порожню відповідь.', 'Il server non ha inviato nulla.', 'Server boş cavab göndərdi.', 'সার্ভার খালি উত্তর পাঠিয়েছে।', 'सर्वर ने खाली जवाब भेजा।', 'Walang sagot mula sa server.', 'Κενή απάντηση από τον διακομιστή.'));
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
          else if (evt.type === 'error') handlers.onError(chatErr('Assistant error.', 'Ошибка помощника.', 'Error del asistente.', 'Erreur de l’assistant.', 'Fehler des Assistenten.', 'Помилка помічника.', 'Errore dell’assistente.', 'Köməkçi ilə bağlı xəta baş verdi.', 'সহকারীর সমস্যা।', 'सहायक से जवाब देने में समस्या हुई।', 'May problema sa assistant.', 'Σφάλμα βοηθού.'));
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
    handlers.onError(chatErr('Stream interrupted. Please try again.', 'Ответ прервался. Попробуйте ещё раз.', 'Se cortó la respuesta. Inténtalo de nuevo.', 'La réponse s’est interrompue. Réessayez.', 'Antwort unterbrochen. Versuch’s nochmal.', 'Відповідь перервалася. Спробуйте ще раз.', 'Risposta interrotta. Riprova.', 'Cavab kəsildi. Yenidən cəhd edin.', 'উত্তর থেমে গেছে। আবার চেষ্টা করুন।', 'जवाब बीच में रुक गया। फिर कोशिश करें।', 'Naputol ang sagot. Subukan muli.', 'Η απάντηση διακόπηκε. Δοκιμάστε ξανά.'));
  }
}
