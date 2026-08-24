"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "@/components/ui/icons";
import { navigation } from "@/data/navigation";
import type { NavigationItem } from "@/types";
import logo from "../../logowithoutbackground.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMobileOpen(false);
      setActiveDropdown(null);
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-[var(--color-border)] bg-[#f1f1f1]/96 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-[#f1f1f1]/92"
      }`}
      role="banner"
    >
      <div className="container-wide">
        <div className="flex h-20 items-center justify-between py-2">
          <Link
            href="/"
            className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
            aria-label="WHI-SL Home"
          >
            <Image
              src={logo}
              alt="Women's Health Initiative Sierra Leone logo"
              priority
              className="h-14 w-auto sm:h-16 lg:h-18"
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
            ref={dropdownRef}
          >
            {navigation.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isActive={isActive}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            ))}
          </nav>

          {/* Admin link hidden from public view */}

          <button
            className="rounded-2xl p-2 text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-section)] lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav
          className="surface-white border-t border-[var(--color-border)] py-4"
          aria-label="Mobile navigation"
        >
          <div className="container-wide flex flex-col gap-1">
            {navigation.map((item) => (
              <MobileNavItem key={item.href} item={item} isActive={isActive} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavItem({
  item,
  isActive,
  activeDropdown,
  setActiveDropdown,
}: {
  item: NavigationItem;
  isActive: (href: string) => boolean;
  activeDropdown: string | null;
  setActiveDropdown: (v: string | null) => void;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const open = activeDropdown === item.href;

  if (hasChildren) {
    return (
      <div className="relative">
        <button
          onClick={() => setActiveDropdown(open ? null : item.href)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActiveDropdown(null);
          }}
          className={`flex items-center gap-1 rounded-2xl px-3 py-2 font-[family-name:var(--font-plus-jakarta)] text-[16px] font-medium leading-none transition-colors duration-150 ${
            isActive(item.href)
              ? "border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-[0_2px_8px_rgba(168,58,98,0.1)]"
              : "border border-transparent text-[var(--color-text)] hover:border-[var(--color-primary-light)]/50 hover:bg-[#fdf1f6] hover:text-[var(--color-primary)]"
          }`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div
            className="absolute left-0 top-full z-50 mt-1 w-64 rounded-[1.25rem] border border-[var(--color-border)] bg-white py-2 shadow-[0_22px_70px_rgba(14,24,20,0.14)]"
            role="menu"
          >
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setActiveDropdown(null)}
                className="block px-4 py-2.5 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-section)] hover:text-[var(--color-primary)]"
                role="menuitem"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`rounded-2xl px-3 py-2 font-[family-name:var(--font-plus-jakarta)] text-[16px] font-semibold leading-none transition-colors duration-150 ${
        isActive(item.href)
          ? "border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-[0_2px_8px_rgba(168,58,98,0.1)]"
          : "border border-transparent text-[var(--color-text)] hover:border-[var(--color-primary-light)]/50 hover:bg-[#fdf1f6] hover:text-[var(--color-primary)]"
      }`}
    >
      {item.label}
    </Link>
  );
}

function MobileNavItem({
  item,
  isActive,
}: {
  item: NavigationItem;
  isActive: (href: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 font-[family-name:var(--font-plus-jakarta)] text-[16px] font-medium leading-none transition-colors ${
            isActive(item.href)
              ? "border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-[0_2px_8px_rgba(168,58,98,0.1)]"
              : "border border-transparent text-[var(--color-text)]"
          }`}
          aria-expanded={open}
        >
          {item.label}
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="pl-4 pb-1">
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[#fdf1f6] hover:text-[var(--color-primary)]"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`block rounded-2xl px-3 py-3 font-[family-name:var(--font-plus-jakarta)] text-[16px] font-medium leading-none transition-colors ${
        isActive(item.href)
          ? "border border-[var(--color-primary)] bg-white text-[var(--color-primary)] shadow-[0_2px_8px_rgba(198,40,33,0.06)]"
          : "border border-transparent text-[var(--color-text)] hover:bg-white hover:text-[var(--color-primary)]"
      }`}
    >
      {item.label}
    </Link>
  );
}
