import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside";
  narrow?: boolean;
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={`${narrow ? "max-w-3xl" : "max-w-[1280px]"} mx-auto w-full px-6 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
