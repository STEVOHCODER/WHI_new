import "server-only";

import crypto from "node:crypto";
import { getOpenRouterClient, getOpenRouterModel, hasOpenRouterKey } from "@/lib/ai/openrouter";

export const EMBEDDING_MODEL = getOpenRouterModel(
  process.env.OPENROUTER_EMBEDDING_MODEL ?? process.env.OPENAI_EMBEDDING_MODEL,
  "openai/text-embedding-3-small",
);
const FALLBACK_DIMENSION = 256;

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function normalize(vector: number[]) {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (!magnitude) {
    return vector.map(() => 0);
  }

  return vector.map((value) => value / magnitude);
}

function fallbackEmbedding(text: string) {
  const vector = new Array(FALLBACK_DIMENSION).fill(0);
  const tokens = tokenize(text);

  tokens.forEach((token, index) => {
    const hash = crypto.createHash("sha256").update(token).digest();
    const first = hash[0] ?? 0;
    const second = hash[1] ?? 0;
    const bucket = (first + second + index) % FALLBACK_DIMENSION;
    vector[bucket] += 1;

    const nextBucket = (bucket + (second % 17) + 1) % FALLBACK_DIMENSION;
    vector[nextBucket] += 0.35;
  });

  return normalize(vector);
}

export function hasOpenRouterEmbeddingsKey() {
  return hasOpenRouterKey();
}

export async function embedText(text: string) {
  const client = getOpenRouterClient();
  if (!client) {
    return fallbackEmbedding(text);
  }

  try {
    const response = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
    });

    return response.data[0]?.embedding ?? fallbackEmbedding(text);
  } catch {
    return fallbackEmbedding(text);
  }
}

export async function embedMany(texts: string[]) {
  const client = getOpenRouterClient();
  if (!client) {
    return texts.map((text) => fallbackEmbedding(text));
  }

  try {
    const response = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: texts,
    });

    return response.data.map((item) => item.embedding);
  } catch {
    return texts.map((text) => fallbackEmbedding(text));
  }
}
