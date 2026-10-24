import type { ReactNode } from "react";
import type { Cta, Embed } from "@/lib/funnel";
import { cn, isEmbedUrl } from "@/lib/funnel";
import { CtaButton } from "./CtaButton";
import { EmbedFrame } from "./EmbedFrame";
import { MissingConfig, SectionHeading } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * Registration / application / booking block: heading + optional process
 * steps beside the real embed. If no embed is configured but a CTA is
 * (e.g. a hosted GHL survey URL), it renders the CTA instead.
 */
export function ApplicationSection({
  eyebrow,
  title,
  lede,
  steps,
  embed,
  cta,
  aside,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  steps?: Array<{ title: string; body: string }>;
  embed?: Embed;
  cta?: Cta;
  aside?: ReactNode;
  className?: string;
}) {
  const hasEmbed = !!embed && isEmbedUrl(embed.src);
  const useCta = !hasEmbed && cta;
  return (
    <div className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      <Reveal className="lg:col-span-5">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />
        {steps?.length ? (
          <ol className="mt-10 space-y-7">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="font-display flex size-10 shrink-0 items-center justify-center rounded-full border border-f-line text-f-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-f-ink">{s.title}</p>
                  <p className="mt-1 leading-relaxed text-f-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        {aside}
      </Reveal>
      <Reveal delay={120} className="lg:col-span-7">
        {useCta ? (
          <div className="flex h-full items-center justify-center rounded-f border border-f-line bg-f-surface p-10">
            <CtaButton cta={cta} size="lg" showNote />
          </div>
        ) : hasEmbed ? (
          <div className="rounded-[calc(var(--f-radius)*1.5)] border border-f-line bg-f-surface p-2 sm:p-3">
            <EmbedFrame embed={embed} />
          </div>
        ) : (
          <MissingConfig label="registration form / calendar embed (or a CTA)" />
        )}
      </Reveal>
    </div>
  );
}
