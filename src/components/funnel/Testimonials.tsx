import Image from "next/image";
import type { Testimonial } from "@/lib/funnel";
import { cn } from "@/lib/funnel";
import { Reveal } from "./Reveal";

/**
 * Real client testimonials only. Returns nothing when the list is empty,
 * so a funnel without proof simply omits the section.
 */
export function Testimonials({
  items,
  layout = "grid",
  className,
}: {
  items: Testimonial[];
  /** grid = cards; featured = first quote large, rest as cards; wall = masonry columns */
  layout?: "grid" | "featured" | "wall";
  className?: string;
}) {
  if (!items.length) return null;
  const [first, ...rest] = items;

  if (layout === "featured") {
    return (
      <div className={cn("grid gap-10", className)}>
        <Reveal>
          <figure className="relative mx-auto max-w-4xl text-center">
            <span aria-hidden className="font-display block text-[7rem] leading-[0.6] text-f-accent/40">&ldquo;</span>
            <blockquote className="font-display text-display-sm text-f-ink sm:text-[2.1rem] sm:leading-tight">{first.quote}</blockquote>
            <Attribution t={first} center />
          </figure>
        </Reveal>
        {rest.length ? <Cards items={rest} /> : null}
      </div>
    );
  }

  if (layout === "wall") {
    return (
      <div className={cn("columns-1 gap-5 sm:columns-2 lg:columns-3", className)}>
        {items.map((t, i) => (
          <Reveal key={t.name + i} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
            <Card t={t} />
          </Reveal>
        ))}
      </div>
    );
  }

  return <Cards items={items} className={className} />;
}

function Cards({ items, className }: { items: Testimonial[]; className?: string }) {
  return (
    <div className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((t, i) => (
        <Reveal key={t.name + i} delay={(i % 3) * 90}>
          <Card t={t} />
        </Reveal>
      ))}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 rounded-f border border-f-line bg-f-surface p-7">
      <div>
        {t.result ? <p className="text-eyebrow mb-5 text-f-accent">{t.result}</p> : null}
        <blockquote className="text-[1.05rem] leading-relaxed text-f-ink">&ldquo;{t.quote}&rdquo;</blockquote>
      </div>
      <Attribution t={t} />
    </figure>
  );
}

function Attribution({ t, center }: { t: Testimonial; center?: boolean }) {
  return (
    <figcaption className={cn("mt-6 flex items-center gap-4", center && "justify-center")}>
      {t.image ? (
        <Image src={t.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover ring-1 ring-f-line" />
      ) : null}
      <span className={cn("flex flex-col", center && "items-center")}>
        <span className="font-semibold text-f-ink">{t.name}</span>
        {t.role ? <span className="text-sm text-f-muted">{t.role}</span> : null}
      </span>
    </figcaption>
  );
}
