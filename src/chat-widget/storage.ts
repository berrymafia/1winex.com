import { MAX_STORED_MESSAGES, STORAGE_KEY, THEME_KEY } from './constants';
import type { ChatMessage, StoredState, ThemeMode } from './types';

function readState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState;
    if (!parsed || !Array.isArray(parsed.messages)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function loadMessages(): ChatMessage[] {
  const parsed = readState();
  if (!parsed) return [];
  return parsed.messages.slice(-MAX_STORED_MESSAGES);
}

export function loadUnread(): boolean {
  return Boolean(readState()?.unread);
}

export function saveMessages(messages: ChatMessage[], unread = false): void {
  writeState({
    messages: messages.slice(-MAX_STORED_MESSAGES),
    updatedAt: Date.now(),
    unread: Boolean(unread),
  });
}

export function clearMessages(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function loadTheme(): ThemeMode {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* ignore */
  }
  // Site is primarily dark navy; default to dark to match tokens.
  return 'dark';
}

export function saveTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}
