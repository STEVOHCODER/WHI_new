"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Heart,
  Briefcase,
  Mail,
  Settings,
  LogOut,
} from "@/components/ui/icons";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/partners", label: "Partners & Sponsors", icon: Heart },
  { href: "/admin/vacancies", label: "Vacancies", icon: Briefcase },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/partnerships", label: "Partnership Enquiries", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[var(--color-border)] bg-white h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-[var(--color-border)]">
        <Link href="/" className="block">
          <p className="text-base font-black text-[var(--color-text)]">
            WHI-SL <span className="text-[var(--color-primary)]">Admin</span>
          </p>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                active
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text)]"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[var(--color-border)]">
        <a href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] hover:bg-[var(--color-bg-section)] hover:text-[var(--color-text)] transition-all mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          View Site
        </a>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={17} strokeWidth={2} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
