import { BlueprintGrid, FadeEdge, GrainOverlay, MeshGradient, Spotlight } from "@/components/backgrounds";
import {
  AnnouncementBar,
  ApplicationSection,
  AuthorityBlock,
  BenefitGrid,
  Container,
  Countdown,
  CtaButton,
  Eyebrow,
  Faq,
  Hero,
  Reveal,
  Section,
  SectionHeading,
  StickyCta,
  Testimonials,
} from "@/components/funnel";
import { formatEventDate } from "@/lib/calendar";
import * as c from "@/funnels/starter-webinar/config";

const eventDate = formatEventDate(c.event.start, c.event.timeZone);

function EmberBackdrop({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <MeshGradient
        animate
        blobs={[
          { color: "#e9733a", x: "50%", y: "-6%", size: "max(70vw, 560px)", opacity: 0.32 * intensity },
          { color: "#7a2e1c", x: "12%", y: "40%", size: "max(45vw, 380px)", opacity: 0.4 * intensity },
          { color: "#3d1d35", x: "92%", y: "55%", size: "max(50vw, 420px)", opacity: 0.45 * intensity },
        ]}
      />
      <Spotlight strength={0.28 * intensity} />
      <BlueprintGrid color="rgb(245 238 230 / 0.06)" minor={28} major={140} />
      <GrainOverlay opacity={0.09} />
    </>
  );
}

export default function StarterWebinarPage() {
  return (
    <>
      <Hero
        composition="centered"
        background={
          <>
            <EmberBackdrop />
            <FadeEdge />
          </>
        }
        announcement={
          <AnnouncementBar className="text-[0.8rem] sm:text-sm">
            <span className="hidden text-f-ink sm:inline">{c.event.format}</span>
            <span aria-hidden className="mx-3 hidden text-f-accent sm:inline">✦</span>
            {eventDate}
          </AnnouncementBar>
        }
        eyebrow={<Eyebrow>{c.hero.eyebrow}</Eyebrow>}
        title={
          <>
            {c.hero.titleLead}{" "}
            <em className="font-normal italic text-f-accent">{c.hero.titleEmphasis}</em> {c.hero.titleTail}
          </>
        }
        subtitle={<p>{c.hero.subtitle}</p>}
        meta={<Countdown deadline={c.event.start} label="Doors open in" expiredLabel="This session has started" />}
        actions={<CtaButton cta={c.registerCta} size="lg" showNote />}
        proof={
          <p className="flex items-center gap-3 text-sm text-f-muted">
            <span aria-hidden className="size-1.5 rounded-full bg-f-accent shadow-[0_0_12px_var(--f-accent)]" />
            {c.hero.hostLine}
          </p>
        }
      />

      <main>
        <Section id="learn">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <SectionHeading eyebrow="Inside the session" title="What you'll walk away with" />
                </div>
              </Reveal>
              <div className="lg:col-span-8">
                <BenefitGrid variant="numbered" items={c.learn} />
              </div>
            </div>
          </Container>
        </Section>

        <Section id="for-you" tone="alt">
          <Container>
            <Reveal>
              <SectionHeading align="center" eyebrow="Who it's for" title="This hour is built for you if…" />
            </Reveal>
            <BenefitGrid variant="list" columns={2} items={c.forYou} className="mx-auto mt-16 max-w-4xl" />
            <Reveal className="mt-16 flex justify-center">
              <CtaButton cta={c.registerCta} variant="ghost" />
            </Reveal>
          </Container>
        </Section>

        <Section id="host">
          <Container>
            <AuthorityBlock expert={c.host} />
          </Container>
        </Section>

        {c.testimonials.length ? (
          <Section id="proof" tone="alt">
            <Container>
              <Reveal>
                <SectionHeading align="center" eyebrow="In their words" title="What clients say" className="mb-16" />
              </Reveal>
              <Testimonials items={c.testimonials} layout="featured" />
            </Container>
          </Section>
        ) : null}

        <Section id="register" tone="none" className="overflow-hidden">
          <div className="absolute inset-0 -z-0">
            <EmberBackdrop intensity={0.6} />
          </div>
          <Container className="relative">
            <ApplicationSection
              eyebrow="Reserve your seat"
              title={
                <>
                  Join us <em className="italic text-f-accent">live</em>
                </>
              }
              lede={eventDate}
              steps={c.registerSteps}
              embed={c.registrationEmbed}
            />
          </Container>
        </Section>

        <Section id="faq">
          <Container size="md">
            <div className="grid gap-12 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <SectionHeading eyebrow="FAQ" title="Questions, answered" />
              </Reveal>
              <Reveal delay={100} className="lg:col-span-8">
                <Faq items={c.faqs} />
              </Reveal>
            </div>
          </Container>
        </Section>

        <section className="relative isolate overflow-hidden section-y text-center">
          <div className="absolute inset-0 -z-10">
            <EmberBackdrop intensity={0.8} />
          </div>
          <Container size="sm">
            <Reveal>
              <h2 className="font-display text-display-lg text-f-ink">
                Your seat is <em className="italic text-f-accent">waiting</em>
              </h2>
              <p className="text-lede mx-auto mt-6 max-w-xl text-f-muted">{eventDate}</p>
              <div className="mt-10 flex justify-center">
                <Countdown deadline={c.event.start} variant="inline" label="Starts in" />
              </div>
              <div className="mt-10 flex justify-center">
                <CtaButton cta={c.registerCta} size="lg" showNote />
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="border-t border-f-line bg-f-bg py-10 pb-28 text-center text-sm text-f-muted md:pb-10">
        <Container>
          <p>© Sample Studio. Sample footer: add privacy, terms and earnings disclaimers as required.</p>
        </Container>
      </footer>

      <StickyCta cta={c.registerCta} afterId="hero" hideWhenVisibleId="register" detail={eventDate} />
    </>
  );
}
