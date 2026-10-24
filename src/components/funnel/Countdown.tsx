"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/funnel";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number, now: number): Parts | null {
  const diff = target - now;
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

/**
 * Counts down to a real, configured deadline.
 * `deadline` must be an ISO 8601 string WITH a timezone offset,
 * e.g. "2026-12-03T19:00:00-05:00". Never use a rolling/fake deadline.
 */
export function Countdown({
  deadline,
  expiredLabel = "This event has started",
  variant = "tiles",
  className,
  label = "Starts in",
}: {
  deadline: string;
  expiredLabel?: string;
  variant?: "tiles" | "inline";
  className?: string;
  label?: string;
}) {
  const target = Date.parse(deadline);
  // null until mounted so server and client markup match
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  if (Number.isNaN(target)) {
    if (process.env.NODE_ENV !== "production") {
      return <p className="font-mono text-sm text-amber-300">Countdown: invalid deadline &quot;{deadline}&quot;</p>;
    }
    return null;
  }

  const parts = now === null ? undefined : partsUntil(target, now);

  if (parts === null) {
    return <p className={cn("text-eyebrow text-f-accent", className)}>{expiredLabel}</p>;
  }

  const units: Array<[keyof Parts, string]> = [
    ["days", "Days"],
    ["hours", "Hours"],
    ["minutes", "Min"],
    ["seconds", "Sec"],
  ];
  const fmt = (n: number | undefined) => (n === undefined ? "--" : String(n).padStart(2, "0"));
  const srText = parts
    ? `${label} ${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes`
    : `${label}…`;

  if (variant === "inline") {
    return (
      <p className={cn("font-mono tabular-nums text-f-ink", className)}>
        <span className="sr-only">{srText}</span>
        <span aria-hidden>
          <span className="text-f-muted">{label} </span>
          {units.map(([k], i) => (
            <span key={k}>
              {fmt(parts?.[k])}
              {i < units.length - 1 ? <span className="px-0.5 text-f-muted">:</span> : null}
            </span>
          ))}
        </span>
      </p>
    );
  }

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)} role="timer" aria-live="off">
      <span className="sr-only">{srText}</span>
      <p aria-hidden className="text-eyebrow text-f-muted">{label}</p>
      <div aria-hidden className="flex gap-2 sm:gap-3">
        {units.map(([k, l]) => (
          <div
            key={k}
            className="flex min-w-[4.25rem] flex-col items-center rounded-xl border border-f-line bg-f-surface/60 px-3 py-3 backdrop-blur sm:min-w-[5rem]"
          >
            <span className="font-display text-3xl tabular-nums leading-none text-f-ink sm:text-4xl">{fmt(parts?.[k])}</span>
            <span className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-f-muted">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
