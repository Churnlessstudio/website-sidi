import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal, type Cta } from "@/lib/funnel";

type Props = {
  cta: Cta;
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  /** Hide the trailing arrow (e.g. for compact sticky bars). */
  arrow?: boolean;
  /** Show cta.note beneath the button. */
  showNote?: boolean;
  icon?: ReactNode;
};

export function CtaButton({ cta, variant = "primary", size = "md", className, arrow = true, showNote = false, icon }: Props) {
  const classes = cn("f-btn", `f-btn-${variant}`, size === "lg" && "f-btn-lg", className);
  const content = (
    <>
      {icon}
      <span>{cta.label}</span>
      {arrow ? (
        <svg aria-hidden viewBox="0 0 20 20" className="f-btn-arrow size-[1.05em]" fill="none">
          <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </>
  );

  const button =
    isExternal(cta.href) || cta.href.startsWith("#") ? (
      <a
        href={cta.href}
        className={classes}
        {...(cta.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    ) : (
      <Link href={cta.href} className={classes} {...(cta.newTab ? { target: "_blank" } : {})}>
        {content}
      </Link>
    );

  if (!showNote || !cta.note) return button;
  return (
    <div className="inline-flex flex-col items-center gap-3">
      {button}
      <p className="text-sm text-f-muted">{cta.note}</p>
    </div>
  );
}
