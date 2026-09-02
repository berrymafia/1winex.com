/**
 * Request validation for POST /api/chat.
 * Keeps untrusted client payloads bounded before they reach the model.
 */
import { z } from 'zod';

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_MESSAGES = 40;
export const MAX_PAGE_SNIPPET = 4000;

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(MAX_MESSAGE_LENGTH),
});

const pageContextSchema = z
  .object({
    title: z.string().max(300).optional().default(''),
    url: z.string().max(2000).optional().default(''),
    /** Visible page text excerpt — treated as untrusted data in the prompt. */
    snippet: z.string().max(MAX_PAGE_SNIPPET).optional().default(''),
  })
  .optional()
  .default({});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
  pageContext: pageContextSchema,
});

/**
 * @param {unknown} body
 * @returns {{ success: true, data: z.infer<typeof chatRequestSchema> } | { success: false, error: string }}
 */
export function parseChatRequest(body) {
  const result = chatRequestSchema.safeParse(body);
  if (!result.success) {
    const msg =
      result.error.issues
        .map((i) => {
          const path = i.path.length ? `${i.path.join('.')}: ` : '';
          return path + i.message;
        })
        .join('; ') || 'Invalid request';
    return { success: false, error: msg };
  }
  return { success: true, data: result.data };
}
