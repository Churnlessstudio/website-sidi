import type { FaqItem } from "@/lib/funnel";
import { cn } from "@/lib/funnel";

/**
 * Accessible accordion built on <details>/<summary>: keyboard and
 * screen-reader friendly with zero JS. Animates where ::details-content is supported.
 * `exclusive` makes it a one-open-at-a-time group.
 */
export function Faq({
  items,
  exclusive = true,
  className,
  groupName = "faq",
  jsonLd = true,
}: {
  items: FaqItem[];
  exclusive?: boolean;
  className?: string;
  groupName?: string;
  /** Emit FAQPage structured data. */
  jsonLd?: boolean;
}) {
  if (!items.length) return null;
  return (
    <div className={cn("divide-y divide-f-line border-y border-f-line", className)}>
      {items.map((item) => (
        <details key={item.question} name={exclusive ? groupName : undefined} className="f-faq group">
          <summary className="flex items-start justify-between gap-6 py-6 text-left">
            <span className="font-display text-xl leading-snug text-f-ink sm:text-2xl">{item.question}</span>
            <span
              aria-hidden
              className="f-faq-icon mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-f-line text-f-accent group-hover:border-f-accent/60"
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="max-w-[68ch] pb-7 pr-14 text-[1.05rem] leading-relaxed text-f-muted">
            {item.answer.split("\n\n").map((p) => (
              <p key={p.slice(0, 24)} className="mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </details>
      ))}
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
            }).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </div>
  );
}
