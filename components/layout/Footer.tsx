import Link from "next/link";
import Image from "next/image";
import { programs } from "@/data/programs";
import { Mail, MapPin } from "@/components/ui/icons";
import logo from "../../logowithoutbackground.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-dark text-white" role="contentinfo">
      <div className="border-b border-white/10">
        <div className="container-wide py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="mb-5 inline-flex items-center justify-center"
                aria-label="WHI-SL Home"
              >
                <Image
                  src={logo}
                  alt="Women's Health Initiative Sierra Leone logo"
                  priority
                  className="h-28 w-auto drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)] sm:h-32 lg:h-36"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 360px"
                />
              </Link>
              <p className="text-sm leading-relaxed text-white/70">
                Women&apos;s Health Initiative Sierra Leone is a community-based organisation working alongside vulnerable people through health, gender empowerment, human rights, and research.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-white/35">
                Based in Bo City, Sierra Leone
              </p>
            </div>

            <FooterColumn
              title="Quick Links"
              items={[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/who-we-are" },
                { label: "Programs", href: "/programs" },
                { label: "Gallery", href: "/blog" },
                { label: "Team", href: "/team" },
                { label: "Contact Us", href: "/contact" },
              ]}
            />

            <FooterColumn
              title="Our Programs"
              items={programs.map((program) => ({
                label: program.shortLabel,
                href: `/programs/${program.slug}`,
              }))}
            />

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-white/50" />
                  <span className="text-sm leading-relaxed text-white/65">
                    Bo City, Bo District
                    <br />
                    Sierra Leone, West Africa
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="mt-0.5 flex-shrink-0 text-white/50" />
                  <span className="text-sm leading-relaxed text-white/65">
                    info@whi-sl.org
                    <br />
                    Use the contact form for direct enquiries.
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)] transition-opacity hover:opacity-80"
                >
                  Get In Touch
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-5">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {currentYear} Women&apos;s Health Initiative Sierra Leone (WHI-SL). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/40 transition-colors hover:text-white/70">
              Privacy Policy
            </Link>
            <span className="text-xs text-white/20">|</span>
            <Link href="/contact" className="text-xs text-white/40 transition-colors hover:text-white/70">
              Contact Us
            </Link>
            {/* Admin link hidden from public view */}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className="text-sm text-white/65 transition-colors hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
