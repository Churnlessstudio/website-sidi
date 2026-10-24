import Image from "next/image";
import type { ReactNode } from "react";
import type { Expert } from "@/lib/funnel";
import { cn } from "@/lib/funnel";
import { Eyebrow } from "./primitives";
import { Reveal } from "./Reveal";

/**
 * "About the expert". Credentials render only if the client supplied them.
 * Without a photo, it falls back to a typographic monogram panel (no stock faces).
 */
export function AuthorityBlock({
  expert,
  eyebrow = "Your host",
  imageSide = "left",
  aside,
  className,
}: {
  expert: Expert;
  eyebrow?: string;
  imageSide?: "left" | "right";
  /** Optional extra content under the bio (e.g. a real logo row). */
  aside?: ReactNode;
  className?: string;
}) {
  const initials = expert.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("grid items-center gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      <Reveal className={cn("lg:col-span-5", imageSide === "right" && "lg:order-2")}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, color-mix(in oklab, var(--f-glow) 35%, transparent), transparent)" }}
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--f-radius)*1.6)] border border-f-line bg-f-surface">
            {expert.image ? (
              <Image
                src={expert.image.src}
                alt={expert.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <span className="font-display text-[9rem] leading-none text-f-accent/30">{initials}</span>
              </div>
            )}
          </div>
        </div>
      </Reveal>
      <Reveal delay={120} className="lg:col-span-7">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h2 className="font-display text-display-md text-f-ink">{expert.name}</h2>
        <p className="mt-3 text-lg text-f-accent">{expert.role}</p>
        <div className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-f-muted">
          {expert.bio.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        {expert.credentials?.length ? (
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {expert.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3 text-f-ink">
                <svg aria-hidden viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-f-accent" fill="none">
                  <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        ) : null}
        {aside ? <div className="mt-10">{aside}</div> : null}
      </Reveal>
    </div>
  );
}
