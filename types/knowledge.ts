export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  documentType: string;
  sourceType: string;
  sourceUrl?: string;
  program?: string;
  date?: string;
  content: string;
  keywords?: string[];
}

export interface KnowledgeChunk {
  id: string;
  documentId: string;
  title: string;
  category: string;
  documentType: string;
  sourceType: string;
  sourceUrl?: string;
  program?: string;
  date?: string;
  chunkIndex: number;
  text: string;
  embedding?: number[];
}

export interface KnowledgeSearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

