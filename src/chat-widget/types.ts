export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  /** Epoch ms */
  createdAt: number;
  /** Soft status for UI (streaming / error / ok). */
  status?: 'ok' | 'error' | 'streaming';
}

export interface PageContext {
  title: string;
  url: string;
  snippet: string;
}

export interface ChatRequestBody {
  messages: Array<{ role: Role; content: string }>;
  pageContext: PageContext;
}

export type ThemeMode = 'dark' | 'light';

export interface StoredState {
  messages: ChatMessage[];
  updatedAt: number;
  /** Assistant reply arrived while the panel was closed. Survives MPA navigation. */
  unread?: boolean;
}
