import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/funnel";

/**
 * Hero shell with composition presets. It handles layout, background
 * layering and the staggered CSS entrance; every piece of content is a slot,
 * so each funnel can art-direct its own hero.
 *
 * compositions:
 * - centered: stage-lit centred headline (webinars, challenges)
 * - split:    copy left, media right (authority, lead magnets)
 * - media-first: headline, then a large media frame (VSL, replay)
 */
export function Hero({
  id = "hero",
  composition = "centered",
  background,
  announcement,
  eyebrow,
  title,
  subtitle,
  meta,
  actions,
  proof,
  media,
  className,
  contentClassName,
}: {
  id?: string;
  composition?: "centered" | "split" | "media-first";
  /** Absolutely positioned background layers (see components/backgrounds). */
  background?: ReactNode;
  /** Thin top announcement bar. */
  announcement?: ReactNode;
  eyebrow?: ReactNode;
  /** The h1. Pass a node so funnels can style emphasis words. */
  title: ReactNode;
  subtitle?: ReactNode;
  /** Event date/time, format, duration, countdown… */
  meta?: ReactNode;
  actions?: ReactNode;
  /** Authority marker: host line, real logos, or a real stat. */
  proof?: ReactNode;
  media?: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const centered = composition !== "split";
  const step = (n: number) => ({ "--enter-delay": `${n * 110}ms` }) as CSSProperties;

  const copy = (
    <div className={cn("relative", centered ? "mx-auto max-w-4xl text-center" : "max-w-2xl", contentClassName)}>
      {eyebrow ? (
        <div className={cn("f-enter mb-7", centered && "flex justify-center")} style={step(0)}>
          {eyebrow}
        </div>
      ) : null}
      <h1 className="f-enter font-display text-display-xl text-f-ink" style={step(1)}>
        {title}
      </h1>
      {subtitle ? (
        <div className={cn("f-enter text-lede mt-7 text-f-muted", centered && "mx-auto max-w-2xl")} style={step(2)}>
          {subtitle}
        </div>
      ) : null}
      {meta ? (
        <div className={cn("f-enter mt-9", centered && "flex justify-center")} style={step(3)}>
          {meta}
        </div>
      ) : null}
      {actions ? (
        <div className={cn("f-enter mt-10 flex flex-wrap gap-4", centered && "justify-center")} style={step(4)}>
          {actions}
        </div>
      ) : null}
      {proof ? (
        <div className={cn("f-enter mt-12", centered && "flex justify-center")} style={step(5)}>
          {proof}
        </div>
      ) : null}
    </div>
  );

  return (
    <header id={id} className={cn("relative isolate overflow-hidden", className)}>
      {background ? <div className="absolute inset-0 -z-10">{background}</div> : null}
      {announcement}
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
        {composition === "split" ? (
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">{copy}</div>
            {media ? (
              <div className="f-enter lg:col-span-5" style={step(3)}>
                {media}
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {copy}
            {media ? (
              <div className="f-enter relative mx-auto mt-16 max-w-5xl" style={step(composition === "media-first" ? 3 : 5)}>
                {media}
              </div>
            ) : null}
          </>
        )}
      </div>
    </header>
  );
}

/** Slim bar above the hero for an announcement or real event detail. */
export function AnnouncementBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative border-b border-f-line bg-f-bg/40 px-5 py-3 text-center text-sm text-f-muted backdrop-blur", className)}>
      {children}
    </div>
  );
}
