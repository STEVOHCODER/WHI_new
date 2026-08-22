"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/chatbot/ChatWindow";
import type { ChatMessage as ChatMessageType, ChatResponseBody } from "@/types/chat";

const STORAGE_KEY = "whi-sl-chat-session";
const WELCOME_MESSAGE: ChatMessageType = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm the WHI-SL Assistant. Ask me about our programs, mission, partners, volunteering, or community work.",
  createdAt: "2026-08-14T00:00:00.000Z",
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function makeWelcomeMessage(): ChatMessageType {
  return WELCOME_MESSAGE;
}

export default function ChatbotShell() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([makeWelcomeMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as ChatMessageType[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }

      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, hydrated]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      const list = document.getElementById("whi-chat-scroll");
      if (list) {
        list.scrollTop = list.scrollHeight;
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [messages, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage: ChatMessageType = {
      id: createId("user"),
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "We could not reach the WHI Assistant right now.");
      }

      const data = (await response.json()) as ChatResponseBody;
      setMessages((current) => [
        ...current,
        {
          id: data.message.id,
          role: "assistant",
          content: data.message.content,
          createdAt: data.message.createdAt,
          sources: data.sources,
        },
      ]);
    } catch (chatError) {
      const message =
        chatError instanceof Error
          ? chatError.message
          : "We could not reach the WHI Assistant right now.";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          id: createId("error"),
          role: "assistant",
          content: message,
          createdAt: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearConversation() {
    setMessages([makeWelcomeMessage()]);
    setInputValue("");
    setError(null);
  }

  return (
    <ChatWindow
      open={open}
      onToggle={() => setOpen((value) => !value)}
      messages={messages}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSend={() => void sendMessage(inputValue)}
      onClear={clearConversation}
      loading={loading}
      error={error}
      onPromptPick={(prompt) => {
        setInputValue(prompt);
        if (!open) {
          setOpen(true);
        }
      }}
    />
  );
}
