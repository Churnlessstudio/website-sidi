"use client";

import { useEffect, useState } from "react";
import type { Cta } from "@/lib/funnel";
import { cn } from "@/lib/funnel";
import { CtaButton } from "./CtaButton";

/**
 * Mobile sticky CTA bar. Appears once the element with `afterId` (usually
 * the hero) scrolls out of view, and hides while `hideWhenVisibleId`
 * (usually the form / final CTA) is on screen.
 */
export function StickyCta({
  cta,
  afterId,
  hideWhenVisibleId,
  detail,
  className,
}: {
  cta: Cta;
  afterId: string;
  hideWhenVisibleId?: string;
  detail?: string;
  className?: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [targetVisible, setTargetVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(afterId);
    const target = hideWhenVisibleId ? document.getElementById(hideWhenVisibleId) : null;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === target) setTargetVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (target) io.observe(target);
    return () => io.disconnect();
  }, [afterId, hideWhenVisibleId]);

  const show = pastHero && !targetVisible;

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-f-line bg-f-bg/85 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-out-expo md:hidden",
        show ? "translate-y-0" : "translate-y-full",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {detail ? <p className="text-sm leading-tight text-f-muted">{detail}</p> : null}
        <CtaButton cta={cta} arrow={false} className={cn("min-h-12 px-5 text-[0.95rem]", !detail && "w-full")} />
      </div>
    </div>
  );
}
