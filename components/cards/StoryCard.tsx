import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/types";
import { ArrowRight } from "@/components/ui/icons";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <article
      id={story.id}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-white shadow-[0_16px_50px_rgba(14,24,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(14,24,20,0.12)]"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={story.image}
          alt={story.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
          {story.program}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-text-light)]">
          Program snapshot
        </p>
        <h3 className="mb-3 text-xl font-black leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-primary)]">
          {story.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-3">
          {story.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)]">
          <Link
            href={`/impact#${story.id}`}
            className="flex items-center gap-1.5 transition-all duration-200 group-hover:gap-3"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
