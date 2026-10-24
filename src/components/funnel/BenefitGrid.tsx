import type { Benefit } from "@/lib/funnel";
import { cn } from "@/lib/funnel";
import { Reveal } from "./Reveal";

/**
 * Benefits / "what you'll learn" / pain points.
 * - cards: bordered panels on a grid
 * - numbered: oversized numerals, editorial rows
 * - list: compact checklist (good for "this is for you if…")
 */
export function BenefitGrid({
  items,
  variant = "cards",
  columns = 3,
  className,
}: {
  items: Benefit[];
  variant?: "cards" | "numbered" | "list";
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  if (!items.length) return null;
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];

  if (variant === "numbered") {
    return (
      <ol className={cn("divide-y divide-f-line border-y border-f-line", className)}>
        {items.map((b, i) => (
          <Reveal as="li" key={b.title} delay={i * 60} className="grid gap-4 py-9 md:grid-cols-12 md:gap-8">
            <span aria-hidden className="font-display text-5xl leading-none text-f-accent/70 md:col-span-2 md:text-6xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-display-sm text-f-ink md:col-span-4">{b.title}</h3>
            <p className="text-[1.05rem] leading-relaxed text-f-muted md:col-span-6">{b.body}</p>
          </Reveal>
        ))}
      </ol>
    );
  }

  if (variant === "list") {
    return (
      <ul className={cn("grid gap-x-10 gap-y-6", cols, className)}>
        {items.map((b, i) => (
          <Reveal as="li" key={b.title} delay={(i % columns) * 70} className="flex gap-4">
            <span aria-hidden className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-f-accent/15 text-f-accent">
              <svg viewBox="0 0 20 20" className="size-3.5" fill="none">
                <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-f-ink">{b.title}</h3>
              {b.body ? <p className="mt-1.5 leading-relaxed text-f-muted">{b.body}</p> : null}
            </div>
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("grid gap-5", cols, className)}>
      {items.map((b, i) => (
        <Reveal key={b.title} delay={(i % columns) * 90}>
          <article className="group relative h-full overflow-hidden rounded-f border border-f-line bg-f-surface p-8 transition-colors duration-500 hover:border-f-accent/40">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "color-mix(in oklab, var(--f-glow) 30%, transparent)" }}
            />
            {b.kicker ? <p className="text-eyebrow mb-6 text-f-accent">{b.kicker}</p> : null}
            <h3 className="font-display text-display-sm text-f-ink">{b.title}</h3>
            <p className="mt-4 leading-relaxed text-f-muted">{b.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
