export type VideoSource =
  | { type: "iframe"; provider: "youtube" | "vimeo" | "wistia" | "loom" | "other"; embedUrl: string }
  | { type: "file"; src: string };

/**
 * Turns a share/watch URL from YouTube, Vimeo, Wistia, Loom (or a direct
 * .mp4/.webm file) into something we can embed. `autoplay` is used by the
 * click-to-load facade, since the visitor has already pressed play.
 */
export function parseVideoUrl(raw: string, { autoplay = true } = {}): VideoSource | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  const ap = autoplay ? "1" : "0";

  if (/\.(mp4|webm|mov)$/i.test(url.pathname)) {
    return { type: "file", src: url.toString() };
  }

  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") ?? url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
    if (!id) return null;
    const params = new URLSearchParams({ autoplay: ap, rel: "0", modestbranding: "1", playsinline: "1" });
    const start = url.searchParams.get("t") ?? url.searchParams.get("start");
    if (start) params.set("start", String(parseInt(start, 10) || 0));
    return { type: "iframe", provider: "youtube", embedUrl: `https://www.youtube-nocookie.com/embed/${id}?${params}` };
  }

  if (host.endsWith("vimeo.com")) {
    const m = url.pathname.match(/(?:\/video)?\/(\d+)(?:\/([a-z0-9]+))?/i);
    if (!m) return null;
    const params = new URLSearchParams({ autoplay: ap, title: "0", byline: "0", portrait: "0" });
    const hash = url.searchParams.get("h") ?? m[2];
    if (hash) params.set("h", hash);
    return { type: "iframe", provider: "vimeo", embedUrl: `https://player.vimeo.com/video/${m[1]}?${params}` };
  }

  if (host.endsWith("wistia.com") || host.endsWith("wistia.net")) {
    const id = url.pathname.match(/\/(?:medias|iframe)\/([a-z0-9]+)/i)?.[1];
    if (!id) return null;
    return {
      type: "iframe",
      provider: "wistia",
      embedUrl: `https://fast.wistia.net/embed/iframe/${id}?autoPlay=${autoplay}&playerColor=ffffff`,
    };
  }

  if (host.endsWith("loom.com")) {
    const id = url.pathname.match(/\/(?:share|embed)\/([a-z0-9]+)/i)?.[1];
    if (!id) return null;
    return { type: "iframe", provider: "loom", embedUrl: `https://www.loom.com/embed/${id}?autoplay=${ap}&hide_owner=true` };
  }

  // Any other https embed URL (e.g. a GHL/Vidalytics/Bunny player) is used as-is.
  if (url.protocol === "https:") {
    return { type: "iframe", provider: "other", embedUrl: url.toString() };
  }
  return null;
}
