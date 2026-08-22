import Image from "next/image";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blog";

interface BlogSectionProps {
  preview?: boolean;
}

export default function BlogSection({ preview = false }: BlogSectionProps) {
  const posts = preview ? blogPosts.slice(0, 4) : blogPosts;

  return (
    <section className="section-padding surface-sand section-panel" id="blog">
      <div className="container-wide">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Gallery"
            title="Images and short updates from the organisation"
            subtitle="A visual gallery of WHI launches, outreach moments, team scenes, and behind-the-scenes work."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3">
          {posts.map((post, index) => (
            <AnimatedSection
              key={post.title}
              delay={index * 45}
              className="mb-5 break-inside-avoid"
            >
              <article className="group overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_16px_50px_rgba(14,24,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(14,24,20,0.12)]">
                <div className={`relative overflow-hidden ${post.frameClass}`}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                      {post.category}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-tight text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/82">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {preview && (
          <div className="mt-10 text-center">
            <Button href="/blog" variant="secondary" size="lg" arrow>
              Visit the Blog
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
