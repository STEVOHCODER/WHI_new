import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/icons";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-white shadow-[0_18px_34px_rgba(198,40,33,0.28)] hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
  secondary:
    "bg-white text-[var(--color-primary)] border border-[var(--color-primary)] shadow-[0_12px_28px_rgba(24,32,29,0.08)] hover:bg-[var(--color-bg-section)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
  outline:
    "bg-transparent text-white border border-white/80 hover:bg-white hover:text-[var(--color-primary)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-section)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
  accent:
    "bg-[var(--color-accent)] text-white shadow-[0_16px_34px_rgba(212,108,35,0.25)] hover:bg-[var(--color-accent-light)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  external = false,
  type = "button",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <ArrowRight size={16} className="flex-shrink-0" />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
