/** Shared limits & storage keys for the chat widget. */

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_STORED_MESSAGES = 60;
export const STORAGE_KEY = '1winex-chat-v1';
export const THEME_KEY = '1winex-chat-theme';

/** Local Vite proxies /api → chat server. Production hits the shared API. */
export const CHAT_ENDPOINT = /^(localhost|127\.0\.0\.1)$/.test(location.hostname)
  ? '/api/chat'
  : 'https://api-chat.net/api/chat';

export const CHAT_SITE = '1winex';

export const WIDGET_ID = '1winex-chat-root';
