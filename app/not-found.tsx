import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center py-24">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-4">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] leading-tight">
            Page not found
          </h1>
          <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-relaxed">
            The page you are looking for does not exist or has moved. Use the links below to continue exploring WHI-SL.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/" variant="primary" arrow>
              Go Home
            </Button>
            <Button href="/programs" variant="secondary" arrow>
              View Programs
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Contact WHI-SL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
