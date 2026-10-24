import type { Metadata } from "next";

/** Shared content types used by funnel configs and components. */

export type Cta = {
  label: string;
  /** "#section-id", "/internal/route", or an absolute https:// URL. */
  href: string;
  /** Opens in a new tab. Defaults to false; funnels should usually stay in-tab. */
  newTab?: boolean;
  /** Small reassurance line rendered under the button, e.g. "Free · 60 minutes". */
  note?: string;
};

export type FaqItem = { question: string; answer: string };

/** Only use real, client-approved testimonials. Never invent these. */
export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  /** Path under /public, e.g. "/funnels/acme/jane.jpg". */
  image?: string;
  /** A short, client-verified result line. Omit if not supplied. */
  result?: string;
};

export type Benefit = { title: string; body: string; kicker?: string };

export type OfferItem = { title: string; description?: string; value?: string };

export type Expert = {
  name: string;
  role: string;
  bio: string[];
  image?: { src: string; alt: string; width: number; height: number };
  /** Real, verifiable credentials only. */
  credentials?: string[];
};

/**
 * Third-party embed. For GoHighLevel, paste the iframe `src` from the
 * client's embed code (works with custom domains too).
 */
export type Embed =
  | { kind: "ghl-form"; src: string; height?: number; title?: string }
  | { kind: "ghl-calendar"; src: string; height?: number; title?: string }
  | { kind: "iframe"; src: string; height?: number; title: string };

export type FunnelSeo = {
  title: string;
  description: string;
  /** Absolute canonical URL once the funnel has a production domain. */
  canonical?: string;
  /** Path under /public, ideally 1200×630. */
  ogImage?: string;
  noindex?: boolean;
};

export function buildMetadata(seo: FunnelSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: seo.canonical,
      images: seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: seo.ogImage ? "summary_large_image" : "summary",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
  };
}

export function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** True for a real https URL (rejects empty strings and "[PLACEHOLDER: …]" values). */
export function isEmbedUrl(src: string | undefined): src is string {
  return !!src && /^https:\/\/[^\s[\]]+$/.test(src);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
