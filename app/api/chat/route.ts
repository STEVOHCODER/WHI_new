import { NextRequest } from "next/server";
import { generateWHIAnswer } from "@/lib/ai/llm";
import { buildKnowledgeContext, searchKnowledge, toChatSources } from "@/lib/knowledge/search";
import type { ChatRequestBody } from "@/types/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - current.count };
}

function getLastUserQuestion(messages: ChatRequestBody["messages"]) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages[userMessages.length - 1]?.content?.trim() ?? "";
}

function isSensitiveUrgentQuestion(question: string) {
  return /(suicide|self[-\s]?harm|kill myself|emergency|urgent|rape|assault|abuse happening now|hurt me|violence now)/i.test(
    question,
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let payload: ChatRequestBody;

  try {
    payload = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  if (!payload?.messages || !Array.isArray(payload.messages)) {
    return Response.json({ error: "No messages were provided." }, { status: 400 });
  }

  const question = getLastUserQuestion(payload.messages);

  if (!question) {
    return Response.json({ error: "Please type a question first." }, { status: 400 });
  }

  const recentConversation = payload.messages.slice(-10);
  const results = await searchKnowledge(question, 3);
  const context = buildKnowledgeContext(results);
  const safetyNote = isSensitiveUrgentQuestion(question)
    ? [
        "Safety note: The user may be describing an urgent or sensitive situation.",
        "Do not provide emergency, clinical, legal, or crisis instructions beyond general guidance.",
        "Encourage the user to contact local emergency services or a trusted qualified professional immediately if there is immediate danger.",
      ].join(" ")
    : "";

  const answer = await generateWHIAnswer({
    question,
    conversation: recentConversation,
    context: safetyNote ? `${context}\n\n${safetyNote}` : context,
    knowledgeResults: results,
  });

  const sources = toChatSources(results);

  return Response.json(
    {
      message: {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: answer.answer,
        createdAt: new Date().toISOString(),
        sources,
      },
      sources,
      fallback: answer.fallback,
      model: answer.model,
    },
    {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    },
  );
}
