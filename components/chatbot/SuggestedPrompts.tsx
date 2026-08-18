"use client";

const starterPrompts = [
  "Explore WHI programs",
  "Who does WHI support?",
  "How can I partner with WHI?",
  "Learn about WHI's mission",
];

export default function SuggestedPrompts({
  onPick,
}: {
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {starterPrompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onPick(prompt)}
          className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-left text-xs font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}

