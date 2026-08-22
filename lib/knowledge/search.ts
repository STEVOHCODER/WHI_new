import "server-only";

import { embedText } from "@/lib/ai/embeddings";
import { getKnowledgeIndex } from "@/lib/knowledge/ingest";
import type { KnowledgeChunk, KnowledgeSearchResult } from "@/types/knowledge";

function cosineSimilarity(a: number[], b: number[]) {
  if (!a.length || !b.length) {
    return 0;
  }

  let dot = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  const length = Math.min(a.length, b.length);

  for (let index = 0; index < length; index += 1) {
    const aValue = a[index] ?? 0;
    const bValue = b[index] ?? 0;
    dot += aValue * bValue;
    magnitudeA += aValue * aValue;
    magnitudeB += bValue * bValue;
  }

  if (!magnitudeA || !magnitudeB) {
    return 0;
  }

  return dot / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

function excerpt(text: string, maxLength = 180) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function keywordBoost(query: string, chunk: KnowledgeChunk) {
  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.replace(/[^a-z0-9-]/g, ""))
    .filter((term) => term.length > 2);

  const text = `${chunk.title} ${chunk.category} ${chunk.text}`.toLowerCase();
  let hits = 0;

  for (const term of queryTerms) {
    if (text.includes(term)) {
      hits += 1;
    }
  }

  return Math.min(0.12, hits * 0.02);
}

export async function searchKnowledge(query: string, limit = 5): Promise<KnowledgeSearchResult[]> {
  const chunks = await getKnowledgeIndex();
  const queryEmbedding = await embedText(query);

  const scored = chunks
    .map((chunk) => {
      const score = cosineSimilarity(queryEmbedding, chunk.embedding ?? []) + keywordBoost(query, chunk);
      return { chunk, score };
    })
    .sort((left, right) => right.score - left.score);

  return scored.slice(0, limit);
}

export function buildKnowledgeContext(results: KnowledgeSearchResult[]) {
  if (!results.length) {
    return "No verified WHI-SL knowledge was retrieved.";
  }

  return results
    .map((result, index) => {
      const chunk = result.chunk;
      return [
        `Source ${index + 1}: ${chunk.title}`,
        `Category: ${chunk.category}`,
        chunk.program ? `Program: ${chunk.program}` : null,
        `Excerpt: ${excerpt(chunk.text, 260)}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

export function toChatSources(results: KnowledgeSearchResult[]) {
  return results.map((result) => ({
    id: result.chunk.id,
    title: result.chunk.title,
    category: result.chunk.category,
    sourceUrl: result.chunk.sourceUrl,
    score: result.score,
    excerpt: excerpt(result.chunk.text),
  }));
}
