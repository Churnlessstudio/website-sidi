"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/funnel";
import { parseVideoUrl } from "@/lib/video";
import { MissingConfig } from "./primitives";

/**
 * Click-to-load video (YouTube, Vimeo, Wistia, Loom, mp4 or any https embed).
 * The heavy player only loads after the visitor presses play.
 */
export function VideoEmbed({
  url,
  title,
  poster,
  posterAlt = "",
  aspect = "16 / 9",
  className,
  playLabel = "Play video",
  priority = false,
}: {
  url?: string;
  title: string;
  /** Local path under /public (client-supplied thumbnail). */
  poster?: string;
  posterAlt?: string;
  aspect?: string;
  className?: string;
  playLabel?: string;
  priority?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const source = url ? parseVideoUrl(url) : null;

  if (!source) return <MissingConfig label={url ? `unsupported video URL "${url}"` : "video URL"} />;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[calc(var(--f-radius)*1.4)] bg-black shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--f-glow)_45%,transparent)] ring-1 ring-f-line",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      {playing ? (
        source.type === "file" ? (
          <video className="absolute inset-0 size-full" src={source.src} controls autoPlay playsInline title={title} />
        ) : (
          <iframe
            className="absolute inset-0 size-full"
            src={source.embedUrl}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex size-full items-center justify-center"
          aria-label={`${playLabel}: ${title}`}
        >
          {poster ? (
            <Image src={poster} alt={posterAlt} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" priority={priority} />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 70% at 50% 40%, color-mix(in oklab, var(--f-glow) 30%, transparent), transparent 70%), linear-gradient(160deg, var(--f-surface), var(--f-bg))",
              }}
            />
          )}
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          <span
            aria-hidden
            className="relative flex size-20 items-center justify-center rounded-full bg-f-accent text-f-accent-ink shadow-2xl transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:size-24"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-f-accent opacity-25 [animation-duration:2.4s]" />
            <svg viewBox="0 0 24 24" className="relative ml-1 size-8 sm:size-9" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
