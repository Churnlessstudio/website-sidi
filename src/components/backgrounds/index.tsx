import type { CSSProperties } from "react";
import { cn } from "@/lib/funnel";

/*
 * Background layers. All are pure CSS/SVG (no external assets), absolutely
 * positioned, aria-hidden and pointer-events-none. Stack several inside
 * <Hero background={…}> or any `relative` section.
 */

type Blob = { color: string; x: string; y: string; size?: string; opacity?: number };

/** Layered radial blobs. `animate` drifts them slowly. */
export function MeshGradient({ blobs, base, animate = false, className }: { blobs: Blob[]; base?: string; animate?: boolean; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} style={{ background: base }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[90px]"
          style={
            {
              left: b.x,
              top: b.y,
              width: b.size ?? "50vw",
              height: b.size ?? "50vw",
              translate: "-50% -50%",
              background: b.color,
              opacity: b.opacity ?? 0.6,
              animation: animate ? `f-drift ${18 + i * 6}s ease-in-out infinite` : undefined,
              "--drift-x": `${i % 2 ? -4 : 4}%`,
              "--drift-y": `${i % 2 ? 3 : -3}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Soft animated light ribbons, for futuristic or premium dark heroes. */
export function Aurora({ colors, className, intensity = 0.55 }: { colors: [string, string, string?]; className?: string; intensity?: number }) {
  const [a, b, c = a] = colors;
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute -inset-[20%] blur-[80px]"
        style={
          {
            opacity: intensity,
            background: `conic-gradient(from 200deg at 50% 40%, transparent 0deg, ${a} 60deg, transparent 120deg, ${b} 200deg, transparent 260deg, ${c} 320deg, transparent 360deg)`,
            animation: "f-drift 26s ease-in-out infinite",
            "--drift-x": "6%",
            "--drift-y": "-4%",
          } as CSSProperties
        }
      />
    </div>
  );
}

/** Architectural grid: minor + major lines, faded with a radial mask. */
export function BlueprintGrid({
  color = "var(--f-line)",
  minor = 24,
  major = 120,
  fade = "radial-gradient(ellipse 80% 70% at 50% 35%, #000 40%, transparent 100%)",
  className,
}: {
  color?: string;
  minor?: number;
  major?: number;
  fade?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px), linear-gradient(color-mix(in oklab, ${color} 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, ${color} 45%, transparent) 1px, transparent 1px)`,
        backgroundSize: `${major}px ${major}px, ${major}px ${major}px, ${minor}px ${minor}px, ${minor}px ${minor}px`,
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}

/** Technical dot matrix. */
export function DotGrid({ color = "var(--f-line)", gap = 22, size = 1.2, fade, className }: { color?: string; gap?: number; size?: number; fade?: string; className?: string }) {
  const mask = fade ?? "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size + 0.4}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

/** Dimensional stage light falling from above. */
export function Spotlight({ color = "var(--f-glow)", strength = 0.35, className }: { color?: string; strength?: number; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        className="absolute left-1/2 top-0 h-[120%] w-[140%] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse 40% 55% at 50% 0%, color-mix(in oklab, ${color} ${Math.round(strength * 100)}%, transparent), transparent 70%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-px w-[60%] -translate-x-1/2"
        style={{ background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${color} 80%, white), transparent)` }}
      />
    </div>
  );
}

const GRAIN_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

/** Film grain. Makes gradients feel tactile. Keep opacity low. */
export function GrainOverlay({ opacity = 0.07, blend = "overlay", className }: { opacity?: number; blend?: CSSProperties["mixBlendMode"]; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ backgroundImage: `url("${GRAIN_SVG}")`, opacity, mixBlendMode: blend }}
    />
  );
}

/** Bottom fade into the next section's colour. */
export function FadeEdge({ to = "var(--f-bg)", height = "12rem", className }: { to?: string; height?: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 bottom-0", className)}
      style={{ height, background: `linear-gradient(to bottom, transparent, ${to})` }}
    />
  );
}
