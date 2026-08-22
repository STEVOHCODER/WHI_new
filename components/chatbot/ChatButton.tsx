"use client";

import Image from "next/image";
import chatbotIcon from "../../public/chatbot-icon.png";

export default function ChatButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[var(--color-primary)] text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_22px_55px_rgba(0,0,0,0.26)]"
      aria-label={open ? "Close WHI Assistant" : "Open WHI Assistant"}
      aria-expanded={open}
    >
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/12">
        <Image
          src={chatbotIcon}
          alt=""
          aria-hidden="true"
          className="h-9 w-9 object-contain"
          sizes="36px"
        />
      </span>
    </button>
  );
}
