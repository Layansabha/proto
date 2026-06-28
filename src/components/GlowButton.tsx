import type { AnchorHTMLAttributes, ReactNode } from "react";

type GlowButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function GlowButton({ children, variant = "primary", className = "", ...props }: GlowButtonProps) {
  const styles =
    variant === "primary"
      ? "border-[var(--red)] bg-[var(--red)] text-[#fff4e6] shadow-[0_18px_50px_rgba(191,76,82,0.22)] hover:border-[#e8d7c5] hover:bg-[#e8d7c5] hover:text-[var(--navy)]"
      : "border-[#e8d7c5]/18 bg-[#e8d7c5]/10 text-[#fff4e6] shadow-[0_18px_50px_rgba(0,0,0,0.14)] hover:border-[#e8d7c5]/46 hover:bg-[#e8d7c5]/18";

  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center rounded-xl border px-6 text-xs font-black uppercase tracking-[0.14em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
