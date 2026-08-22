import type { KnowledgeDocument, KnowledgeChunk } from "@/types/knowledge";

const DEFAULT_MAX_CHARS = 900;
const DEFAULT_OVERLAP = 120;

function normalizeText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function splitLongSentence(sentence: string, maxChars: number) {
  const segments: string[] = [];
  let start = 0;

  while (start < sentence.length) {
    const end = Math.min(sentence.length, start + maxChars);
    segments.push(sentence.slice(start, end).trim());
    start = end;
  }

  return segments.filter(Boolean);
}

export function chunkText(text: string, maxChars = DEFAULT_MAX_CHARS, overlap = DEFAULT_OVERLAP) {
  const clean = normalizeText(text);
  if (!clean) {
    return [];
  }

  const sentences = clean.match(/[^.!?]+[.!?]?/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) {
      continue;
    }

    if (trimmed.length > maxChars) {
      if (current) {
        chunks.push(current.trim());
        current = "";
      }

      chunks.push(...splitLongSentence(trimmed, maxChars));
      continue;
    }

    const separator = current ? " " : "";
    const candidate = `${current}${separator}${trimmed}`;

    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current.trim());
    }

    if (overlap > 0 && current.length > overlap) {
      current = current.slice(Math.max(0, current.length - overlap));
    } else {
      current = "";
    }

    current = current ? `${current} ${trimmed}` : trimmed;
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.filter(Boolean);
}

export function documentToChunks(document: KnowledgeDocument): KnowledgeChunk[] {
  return chunkText(document.content).map((text, index) => ({
    id: `${document.id}-chunk-${index + 1}`,
    documentId: document.id,
    title: document.title,
    category: document.category,
    documentType: document.documentType,
    sourceType: document.sourceType,
    sourceUrl: document.sourceUrl,
    program: document.program,
    date: document.date,
    chunkIndex: index,
    text,
  }));
}

