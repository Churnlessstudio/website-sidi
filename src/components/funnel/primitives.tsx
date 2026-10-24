import type { ReactNode } from "react";
import { cn } from "@/lib/funnel";

export function Container({
  children,
  className,
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const max = { sm: "max-w-3xl", md: "max-w-5xl", lg: "max-w-6xl", xl: "max-w-7xl" }[size];
  return <div className={cn("mx-auto w-full px-5 sm:px-8", max, className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
  tone = "base",
  ariaLabel,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** base = --f-bg, alt = --f-bg-alt, none = transparent (for custom backgrounds). */
  tone?: "base" | "alt" | "none";
  ariaLabel?: string;
}) {
  const bg = { base: "bg-f-bg", alt: "bg-f-bg-alt", none: "" }[tone];
  return (
    <section id={id} aria-label={ariaLabel} className={cn("relative section-y", bg, className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-eyebrow inline-flex items-center gap-3 text-f-accent", className)}>
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  as: As = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow className={cn("mb-5", align === "center" && "justify-center")}>{eyebrow}</Eyebrow> : null}
      <As className="font-display text-display-md text-f-ink">{title}</As>
      {lede ? <p className="text-lede mt-5 text-f-muted">{lede}</p> : null}
    </header>
  );
}

/** Dev-only notice for missing client inputs. Renders nothing in production. */
export function MissingConfig({ label }: { label: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div
      role="note"
      className="rounded-xl border border-dashed border-amber-400/70 bg-amber-400/10 p-6 text-center font-mono text-sm text-amber-200"
    >
      Not configured: {label}. Add it in this funnel&apos;s config.ts
    </div>
  );
}
