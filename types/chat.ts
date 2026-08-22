export type ChatRole = "user" | "assistant";

export interface ChatSource {
  id: string;
  title: string;
  category: string;
  sourceUrl?: string;
  score?: number;
  excerpt?: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  sources?: ChatSource[];
  isError?: boolean;
}

export interface ChatRequestMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  messages: ChatRequestMessage[];
  conversationId?: string;
}

export interface ChatResponseBody {
  message: ChatMessage;
  sources: ChatSource[];
  fallback: boolean;
  model?: string;
}

