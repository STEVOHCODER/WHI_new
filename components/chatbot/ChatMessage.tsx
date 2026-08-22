"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[84%] ${
          isUser
            ? "rounded-br-md bg-[var(--color-primary)] text-white"
            : "rounded-bl-md border border-[var(--color-border)] bg-white text-[var(--color-text)]"
        } ${message.isError ? "border-rose-200 bg-rose-50 text-rose-700" : ""}`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}
