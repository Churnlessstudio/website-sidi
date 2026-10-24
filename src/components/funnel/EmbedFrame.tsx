"use client";

import Script from "next/script";
import type { Embed } from "@/lib/funnel";
import { cn, isEmbedUrl } from "@/lib/funnel";
import { MissingConfig } from "./primitives";

const GHL_EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";

/**
 * Renders the client's real form/calendar embed. Submissions and bookings
 * happen inside the provider's iframe; we never simulate them.
 *
 * GoHighLevel: copy the `src` from the iframe in the form/survey/calendar
 * "Embed" code. Set the post-submit redirect (e.g. to /<slug>/thank-you)
 * inside GoHighLevel's form settings.
 */
export function EmbedFrame({ embed, className }: { embed?: Embed; className?: string }) {
  if (!embed || !isEmbedUrl(embed.src)) return <MissingConfig label="form / calendar embed" />;

  const id = embed.src.split("/").filter(Boolean).pop()?.split("?")[0] ?? "embed";
  const isGhl = embed.kind === "ghl-form" || embed.kind === "ghl-calendar";
  const height = embed.height ?? (embed.kind === "ghl-calendar" ? 760 : 620);
  const title = embed.title ?? (embed.kind === "ghl-calendar" ? "Book a time" : "Registration form");

  return (
    <div className={cn("overflow-hidden rounded-f bg-white", className)}>
      {embed.kind === "ghl-form" ? (
        <iframe
          src={embed.src}
          id={`inline-${id}`}
          title={title}
          style={{ width: "100%", height, border: "none" }}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={title}
          data-height={height}
          data-layout-iframe-id={`inline-${id}`}
          data-form-id={id}
        />
      ) : (
        <iframe
          src={embed.src}
          id={`${id}_embed`}
          title={title}
          scrolling={embed.kind === "ghl-calendar" ? "no" : undefined}
          style={{ width: "100%", height, border: "none", overflow: "hidden" }}
        />
      )}
      {/* GHL's script auto-resizes the iframe to its content. */}
      {isGhl ? <Script src={GHL_EMBED_SCRIPT} strategy="lazyOnload" /> : null}
    </div>
  );
}
