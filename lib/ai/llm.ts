import "server-only";

import { getOpenRouterClient, getOpenRouterModel } from "@/lib/ai/openrouter";
import { buildChatPrompt, WHI_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import type { ChatRequestMessage } from "@/types/chat";
import type { KnowledgeSearchResult } from "@/types/knowledge";

const DEFAULT_CHAT_MODEL = getOpenRouterModel(
  process.env.OPENROUTER_CHAT_MODEL ?? process.env.OPENAI_CHAT_MODEL,
  "openai/gpt-4o-mini",
);

const WHI_SCOPE_PATTERNS = [
  /whi-?sl/i,
  /women'?s health initiative/i,
  /\bbo city\b/i,
  /\bbo district\b/i,
  /\bsierra leone\b/i,
  /\bgender empowerment\b/i,
  /\bhuman rights\b/i,
  /\bhealth research\b/i,
  /\bhealth and social empowerment\b/i,
  /\bvolunteer(s|ing)?\b/i,
  /\bintern(ship|ships)?\b/i,
  /\bpartner(s|ship)?\b/i,
  /\bcontact\b/i,
  /\bmission\b/i,
  /\bvision\b/i,
  /\bvalues\b/i,
  /\bprogram(s)?\b/i,
  /\bteam\b/i,
  /\bleadership\b/i,
  /\bimpact\b/i,
];

const VAGUE_WHI_PATTERNS = [
  /^(tell me more|more details|explain more|say more)\b/i,
  /^(what about it|what about them|what about that)\b/i,
  /^(can you explain|help me understand|give me details)\b/i,
  /^(what is it|who are they|what do they do|what does it do)\b/i,
  /^(how can i help|how do i get involved|how can i join)\b/i,
  /^(can you tell me about this|tell me about the organisation|tell me about whi)/i,
];

function normalizeQuestion(question: string) {
  return question.trim().toLowerCase();
}

function isGreetingOrIntro(normalized: string) {
  return (
    /^(hi|hello|hey)\b/.test(normalized) ||
    /who are you|what are you|introduce yourself|what can you do|who is this/.test(normalized)
  );
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getConversationText(conversation: ChatRequestMessage[]) {
  return conversation.map((message) => message.content).join(" ");
}

function mentionsWhiScope(text: string) {
  return WHI_SCOPE_PATTERNS.some((pattern) => pattern.test(text));
}

function looksVague(text: string) {
  const normalized = normalizeText(text);
  return normalized.length < 18 || VAGUE_WHI_PATTERNS.some((pattern) => pattern.test(normalized));
}

function isWhiRelatedQuestion(question: string, conversation: ChatRequestMessage[], results: KnowledgeSearchResult[]) {
  const combinedText = normalizeText([question, getConversationText(conversation)].join(" "));

  if (mentionsWhiScope(combinedText)) {
    return true;
  }

  const topScore = results[0]?.score ?? 0;
  return topScore >= 0.18;
}

function collectTopicHints(question: string) {
  const normalized = normalizeText(question);
  const hints: string[] = [];

  if (/volunteer|intern|work with us|join/i.test(normalized)) {
    hints.push("volunteering");
    hints.push("internships");
  }

  if (/program|project|service|offer|do you do/i.test(normalized)) {
    hints.push("programs");
  }

  if (/mission|vision|values|who are you|about/i.test(normalized)) {
    hints.push("mission and background");
  }

  if (/team|leadership|staff|board/i.test(normalized)) {
    hints.push("team");
  }

  if (/partner|collaborat|support/i.test(normalized)) {
    hints.push("partnerships");
  }

  if (/contact|email|phone|address|location|office/i.test(normalized)) {
    hints.push("contact details");
  }

  return Array.from(new Set(hints));
}

function buildClarifyingReply(question: string) {
  const hints = collectTopicHints(question);

  if (hints.includes("programs")) {
    return "Do you want the WHI-SL programs overview, or do you want me to explain one program in particular?";
  }

  if (hints.includes("contact details")) {
    return "Do you want WHI-SL's location, office hours, or the best way to contact them?";
  }

  if (hints.includes("volunteering") || hints.includes("internships")) {
    return "Do you want to know about WHI-SL volunteering, internships, or both?";
  }

  if (hints.includes("partnerships")) {
    return "Do you want to know about WHI-SL partners or how to partner with them?";
  }

  if (hints.includes("team")) {
    return "Do you want WHI-SL's team structure, leadership, or a specific staff role?";
  }

  if (hints.includes("mission and background")) {
    return "Do you want WHI-SL's mission, vision, history, or values?";
  }

  return "Do you want to know about WHI-SL's programs, mission, team, partners, volunteering, or contact details?";
}

function buildOutOfScopeReply() {
  return "I can only help with WHI-SL topics like its mission, programs, team, partners, volunteering, and contact details.";
}

function isRudeOrMetaQuestion(normalized: string) {
  return (
    /why don'?t you think|why dont you think|not thinking|acting badly|stupid|idiot|dumb/.test(
      normalized,
    ) || /can you think|do you think/.test(normalized)
  );
}

function firstSentences(text: string, count = 2) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const sentences = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];

  if (!sentences.length) {
    return normalized;
  }

  return sentences.slice(0, count).join(" ").trim();
}

function knowledgeFallbackAnswer(
  question: string,
  results: KnowledgeSearchResult[],
) {
  const topResult = results[0];

  if (topResult) {
    const summary = firstSentences(topResult.chunk.text, 2);
    if (summary.length > 0) {
      return summary;
    }
  }

  return fallbackDirectAnswer(question);
}

function fallbackDirectAnswer(question: string) {
  const normalized = normalizeQuestion(question);

  if (isGreetingOrIntro(normalized)) {
    return "I'm the WHI-SL Assistant. I can help with WHI-SL's mission, programs, team, partners, volunteering, and contact details.";
  }

  if (isRudeOrMetaQuestion(normalized)) {
    return buildOutOfScopeReply();
  }

  if (looksVague(normalized)) {
    return buildClarifyingReply(question);
  }

  return "I don't have enough verified WHI-SL information to answer that confidently yet.";
}

export async function generateWHIAnswer(params: {
  question: string;
  conversation: ChatRequestMessage[];
  context: string;
  knowledgeResults: KnowledgeSearchResult[];
}) {
  const client = getOpenRouterClient();
  const normalizedQuestion = normalizeQuestion(params.question);

  if (isGreetingOrIntro(normalizedQuestion)) {
    return {
      answer: "Hello. I’m the WHI-SL Assistant. You can ask me about WHI-SL’s mission, programs, team, partners, volunteering, or contact details.",
      model: "greeting",
      fallback: true,
    };
  }

  const whiRelated = isWhiRelatedQuestion(params.question, params.conversation, params.knowledgeResults);
  const vague = looksVague(params.question);

  if (!whiRelated) {
    return {
      answer: buildOutOfScopeReply(),
      model: "topic-gate",
      fallback: true,
    };
  }

  if (vague) {
    return {
      answer: buildClarifyingReply(params.question),
      model: "clarify-gate",
      fallback: true,
    };
  }

  const prompt = buildChatPrompt(params);

  if (!client) {
    return {
      answer: knowledgeFallbackAnswer(params.question, params.knowledgeResults),
      model: "fallback-search",
      fallback: true,
    };
  }

  try {
    const response = await client.responses.create({
      model: DEFAULT_CHAT_MODEL,
      input: prompt,
      temperature: 0.35,
      max_output_tokens: 220,
      instructions: WHI_SYSTEM_PROMPT,
    });

    const answer = response.output_text?.trim();

    return {
      answer:
        answer && answer.length > 0
          ? answer
          : knowledgeFallbackAnswer(params.question, params.knowledgeResults),
      model: DEFAULT_CHAT_MODEL,
      fallback: !answer,
    };
  } catch (error) {
    console.error("OpenRouter chat request failed:", error);
    return {
      answer: knowledgeFallbackAnswer(params.question, params.knowledgeResults),
      model: DEFAULT_CHAT_MODEL,
      fallback: true,
    };
  }
}
