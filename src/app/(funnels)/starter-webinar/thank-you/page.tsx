import { FadeEdge, GrainOverlay, MeshGradient, Spotlight } from "@/components/backgrounds";
import { Container, CtaButton, Eyebrow, Reveal, VideoEmbed } from "@/components/funnel";
import { formatEventDate, googleCalendarUrl } from "@/lib/calendar";
import { buildMetadata } from "@/lib/funnel";
import * as c from "@/funnels/starter-webinar/config";

export const metadata = buildMetadata({ ...c.seo, title: "You're registered · Sample Starter", noindex: true });

/** Optional welcome video from the host. Leave undefined to hide. */
const welcomeVideoUrl: string | undefined = undefined;

export default function StarterThankYouPage() {
  const eventDate = formatEventDate(c.event.start, c.event.timeZone);
  const calendarHref = googleCalendarUrl({
    title: c.event.title,
    start: c.event.start,
    durationMinutes: c.event.durationMinutes,
    details: "Your join link is in your confirmation email.",
    location: c.event.format,
  });

  const steps = [
    { title: "Add it to your calendar", body: "So the session doesn't slip past you.", cta: { label: "Add to calendar", href: calendarHref, newTab: true } },
    { title: "Check your inbox", body: "Your join link is on its way. If you don't see it, check promotions or spam and mark it as safe." },
    { title: "Show up live", body: `${eventDate}. Bring a notebook and a question.` },
  ];

  return (
    <main className="relative isolate min-h-dvh overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <MeshGradient
          blobs={[
            { color: "#e9733a", x: "50%", y: "-10%", size: "70vw", opacity: 0.3 },
            { color: "#3d1d35", x: "85%", y: "60%", size: "50vw", opacity: 0.4 },
          ]}
        />
        <Spotlight strength={0.25} />
        <GrainOverlay opacity={0.09} />
        <FadeEdge height="30rem" />
      </div>
      <Container size="md" className="section-y">
        <div className="mx-auto max-w-3xl text-center">
          <div className="f-enter flex justify-center">
            <Eyebrow>You&apos;re registered</Eyebrow>
          </div>
          <h1 className="f-enter font-display mt-7 text-display-lg" style={{ "--enter-delay": "110ms" } as React.CSSProperties}>
            One last step to <em className="italic text-f-accent">lock it in</em>
          </h1>
          <p className="f-enter text-lede mx-auto mt-6 max-w-xl text-f-muted" style={{ "--enter-delay": "220ms" } as React.CSSProperties}>
            {c.event.title}: {eventDate}
          </p>
        </div>

        {welcomeVideoUrl ? (
          <div className="f-enter mx-auto mt-14 max-w-3xl" style={{ "--enter-delay": "330ms" } as React.CSSProperties}>
            <VideoEmbed url={welcomeVideoUrl} title="A quick welcome from your host" />
          </div>
        ) : null}

        <ol className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <div className="flex h-full flex-col rounded-f border border-f-line bg-f-surface/80 p-7 backdrop-blur">
                <span className="font-display text-4xl text-f-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display mt-5 text-2xl">{s.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-f-muted">{s.body}</p>
                {s.cta ? <CtaButton cta={s.cta} variant="ghost" className="mt-6 w-full" arrow={false} /> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </main>
  );
}
