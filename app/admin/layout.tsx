import type { Metadata } from "next";
import { headers } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isLoginPage = (await headers()).get("x-next-pathname")?.startsWith("/admin/login") ?? false;
  return (
    <div className={isLoginPage ? "min-h-screen bg-[var(--color-bg)]" : "min-h-screen bg-[var(--color-bg)] flex"}>
      {!isLoginPage && <AdminSidebar />}
      <main className={isLoginPage ? "" : "flex-1 min-w-0"}>{children}</main>
    </div>
  );
}
