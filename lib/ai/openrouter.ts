import "server-only";

import OpenAI from "openai";

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

let openRouterClient: OpenAI | null = null;

function getOpenRouterApiKey() {
  return process.env.OPENROUTER_API_KEY ?? process.env.OPENAI_API_KEY ?? "";
}

function getOpenRouterHeaders() {
  const headers: Record<string, string> = {};
  const referer = process.env.OPENROUTER_HTTP_REFERER ?? process.env.NEXT_PUBLIC_SITE_URL;
  const title = process.env.OPENROUTER_APP_TITLE ?? process.env.NEXT_PUBLIC_APP_NAME ?? "WHI-SL";

  if (referer) {
    headers["HTTP-Referer"] = referer;
  }

  if (title) {
    headers["X-OpenRouter-Title"] = title;
  }

  return headers;
}

export function getOpenRouterClient() {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    return null;
  }

  if (!openRouterClient) {
    openRouterClient = new OpenAI({
      apiKey,
      baseURL: OPENROUTER_BASE_URL,
      defaultHeaders: getOpenRouterHeaders(),
    });
  }

  return openRouterClient;
}

export function hasOpenRouterKey() {
  return Boolean(getOpenRouterApiKey());
}

export function getOpenRouterModel(preferred: string | undefined, fallback: string) {
  return preferred?.trim() || fallback;
}
