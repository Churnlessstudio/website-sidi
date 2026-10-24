import type { ReactNode } from "react";
import type { Cta, OfferItem } from "@/lib/funnel";
import { cn } from "@/lib/funnel";
import { CtaButton } from "./CtaButton";

/**
 * Offer breakdown / pricing card. Values, totals and prices render only
 * when supplied. Never fill these in without client approval.
 */
export function OfferStack({
  title,
  items,
  bonuses = [],
  price,
  priceNote,
  totalValue,
  cta,
  footnote,
  className,
}: {
  title: ReactNode;
  items: OfferItem[];
  bonuses?: OfferItem[];
  price?: string;
  priceNote?: string;
  totalValue?: string;
  cta: Cta;
  footnote?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-3xl overflow-hidden rounded-[calc(var(--f-radius)*2)] border border-f-line bg-f-surface p-7 sm:p-12",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 w-[80%] rounded-full blur-3xl"
        style={{ background: "color-mix(in oklab, var(--f-glow) 22%, transparent)" }}
      />
      <div className="relative">
        <h3 className="font-display text-display-sm text-center text-f-ink">{title}</h3>
        <ItemList items={items} />
        {bonuses.length ? (
          <>
            <p className="text-eyebrow mt-10 text-center text-f-accent">Bonuses</p>
            <ItemList items={bonuses} />
          </>
        ) : null}
        {(totalValue || price) && (
          <div className="mt-10 border-t border-f-line pt-8 text-center">
            {totalValue ? <p className="text-f-muted">Total value: <s>{totalValue}</s></p> : null}
            {price ? <p className="font-display mt-2 text-display-md text-f-ink">{price}</p> : null}
            {priceNote ? <p className="mt-2 text-sm text-f-muted">{priceNote}</p> : null}
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <CtaButton cta={cta} size="lg" showNote />
        </div>
        {footnote ? <div className="mt-8 text-center text-sm text-f-muted">{footnote}</div> : null}
      </div>
    </div>
  );
}

function ItemList({ items }: { items: OfferItem[] }) {
  return (
    <ul className="mt-8 divide-y divide-f-line">
      {items.map((it) => (
        <li key={it.title} className="flex items-start justify-between gap-6 py-5">
          <div className="flex gap-4">
            <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-f-accent" fill="none">
              <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p className="font-semibold text-f-ink">{it.title}</p>
              {it.description ? <p className="mt-1 text-sm leading-relaxed text-f-muted">{it.description}</p> : null}
            </div>
          </div>
          {it.value ? <span className="shrink-0 font-mono text-sm text-f-muted">{it.value}</span> : null}
        </li>
      ))}
    </ul>
  );
}
