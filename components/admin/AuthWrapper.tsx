"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "@/components/ui/icons";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useState<null | boolean>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setAuth(true);
          setEmail(data.email);
        } else {
          setAuth(false);
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        setAuth(false);
        router.replace("/admin/login");
      });
  }, [router]);

  if (auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto mb-3 animate-spin text-[var(--color-primary)]" />
          <p className="text-sm text-[var(--color-text-muted)]">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (!auth) return null;

  return <>{children}</>;
}
