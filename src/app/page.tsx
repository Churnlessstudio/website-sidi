import Link from "next/link";
import { funnels } from "@/funnels/registry";

// Internal studio index. Not indexed (see root layout robots).
export default function StudioIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="text-eyebrow text-f-accent">The INC Consulting · Funnel Studio</p>
      <h1 className="font-display mt-6 text-display-lg">Funnels in this repository</h1>
      <p className="text-lede mt-5 max-w-2xl text-f-muted">
        Each funnel lives at its own route with its own identity. Content and integrations are in{" "}
        <code className="font-mono text-[0.9em] text-f-ink">src/funnels/&lt;slug&gt;/config.ts</code>.
      </p>
      <ul className="mt-14 divide-y divide-f-line border-y border-f-line">
        {funnels.map((f) => (
          <li key={f.slug} className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline">
            <div className="sm:col-span-5">
              <p className="font-display text-2xl">{f.client}</p>
              <p className="mt-1 text-sm text-f-muted">{f.concept}</p>
            </div>
            <p className="text-eyebrow text-f-muted sm:col-span-2">{f.type}</p>
            <p className="text-eyebrow text-f-accent sm:col-span-2">{f.status}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 sm:col-span-3 sm:justify-end">
              {f.routes.map((r) => (
                <Link key={r} href={r} className="font-mono text-sm text-f-ink underline decoration-f-line underline-offset-4 hover:decoration-f-accent">
                  {r}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
