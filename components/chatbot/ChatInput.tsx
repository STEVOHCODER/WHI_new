"use client";

import { Send } from "@/components/ui/icons";

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  return (
    <form
      className="flex items-end gap-2 rounded-2xl border border-[var(--color-border)] bg-white p-1.5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="sr-only" htmlFor="whi-chat-input">
        Type your message
      </label>
      <textarea
        id="whi-chat-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask WHI Assistant anything..."
        rows={1}
        className="max-h-28 min-h-10 flex-1 resize-none border-0 bg-transparent px-2 py-1.5 text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-light)]"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="inline-flex h-10 items-center justify-center rounded-xl bg-[var(--color-primary)] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={15} />
        <span className="ml-2 hidden sm:inline">Send</span>
      </button>
    </form>
  );
}
