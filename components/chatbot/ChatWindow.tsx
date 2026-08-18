"use client";

import Image from "next/image";
import logo from "../../logowithoutbackground.png";
import ChatButton from "@/components/chatbot/ChatButton";
import ChatInput from "@/components/chatbot/ChatInput";
import ChatMessage from "@/components/chatbot/ChatMessage";
import SuggestedPrompts from "@/components/chatbot/SuggestedPrompts";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { RotateCcw, Minus } from "@/components/ui/icons";

export default function ChatWindow({
  open,
  onToggle,
  messages,
  inputValue,
  onInputChange,
  onSend,
  onClear,
  loading,
  error,
  onPromptPick,
}: {
  open: boolean;
  onToggle: () => void;
  messages: ChatMessageType[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
  onPromptPick: (prompt: string) => void;
}) {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5">
      {open ? (
        <section
          className="flex max-h-[min(66vh,640px)] w-[calc(100vw-1rem)] max-w-[360px] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_20px_55px_rgba(0,0,0,0.16)] sm:w-[360px]"
          aria-label="WHI Assistant chat window"
        >
          <header className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] bg-white px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[var(--color-bg-section)]">
                <Image
                  src={logo}
                  alt="WHI-SL logo"
                  className="h-8 w-8 object-contain"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[var(--color-text)]">WHI Assistant</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Available now
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onClear}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text)]"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text)]"
                aria-label="Minimize chat"
                title="Minimize chat"
              >
                <Minus size={15} />
              </button>
            </div>
          </header>

          <div id="whi-chat-scroll" className="flex-1 overflow-y-auto px-3.5 py-3.5">
            <div className="space-y-2.5">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-text-muted)] shadow-sm">
                    Thinking...
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-2.5 border-t border-[var(--color-border)] bg-white px-3.5 py-3.5">
            {messages.length <= 1 ? <SuggestedPrompts onPick={onPromptPick} /> : null}
            {error ? <p className="text-xs text-rose-600">{error}</p> : null}
            <ChatInput
              value={inputValue}
              onChange={onInputChange}
              onSubmit={onSend}
              disabled={loading}
            />
          </div>
        </section>
      ) : null}

      {!open ? <ChatButton open={open} onClick={onToggle} /> : null}
    </div>
  );
}
