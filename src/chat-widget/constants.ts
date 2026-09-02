/** Shared limits & storage keys for the chat widget. */

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_STORED_MESSAGES = 60;
export const STORAGE_KEY = '1winex-chat-v1';
export const THEME_KEY = '1winex-chat-theme';

/** API base — same origin in prod; Vite proxies /api in dev. */
export const CHAT_ENDPOINT = '/api/chat';

export const WIDGET_ID = '1winex-chat-root';
