import "server-only";

import { knowledgeDocuments } from "@/data/knowledge-base";
import { embedMany, hasOpenRouterEmbeddingsKey } from "@/lib/ai/embeddings";
import { documentToChunks } from "@/lib/knowledge/chunk";
import type { KnowledgeChunk } from "@/types/knowledge";

let cachedIndex: Promise<KnowledgeChunk[]> | null = null;

function getPlainChunks() {
  return knowledgeDocuments.flatMap((document) => documentToChunks(document));
}

export async function buildKnowledgeIndex() {
  const chunks = getPlainChunks();

  if (!chunks.length) {
    return chunks;
  }

  const embeddings = await embedMany(chunks.map((chunk) => chunk.text));
  return chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index] ?? [],
  }));
}

export function getKnowledgeIndex() {
  if (!cachedIndex) {
    cachedIndex = buildKnowledgeIndex();
  }

  return cachedIndex;
}

export function getKnowledgeDocuments() {
  return knowledgeDocuments;
}

export function knowledgeBaseUsesOpenRouterEmbeddings() {
  return hasOpenRouterEmbeddingsKey();
}
