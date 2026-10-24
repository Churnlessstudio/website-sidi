import type { Benefit, Cta, Embed, Expert, FaqItem, FunnelSeo, Testimonial } from "@/lib/funnel";

/*
 * REFERENCE STARTER. All copy below is sample content to demonstrate
 * the component system. It is NOT client copy. Replace every value, and
 * delete anything you have no real content for (empty arrays hide sections).
 */

export const slug = "starter-webinar";

export const event = {
  title: "The After-Hours Client System (Live Masterclass)",
  // Real, configured event start (ISO 8601 with offset). Drives the countdown + calendar link.
  start: "2026-12-03T19:00:00-05:00",
  timeZone: "America/New_York",
  durationMinutes: 60,
  format: "Live on Zoom",
};

export const seo: FunnelSeo = {
  title: "Free Live Masterclass · Sample Starter",
  description: "Sample webinar registration funnel from The INC Consulting starter.",
  noindex: true,
};

export const registerCta: Cta = { label: "Save my free seat", href: "#register", note: "Free · 60 minutes · Live" };

/**
 * The client's GoHighLevel form: paste the iframe `src` from its embed code,
 * e.g. https://api.leadconnectorhq.com/widget/form/XXXX. Set the form's
 * on-submit redirect in GHL to /starter-webinar/thank-you.
 */
export const registrationEmbed: Embed = { kind: "ghl-form", src: "[PLACEHOLDER: GHL form iframe src]", title: "Register for the masterclass" };

export const hero = {
  eyebrow: "Free live masterclass",
  titleLead: "The quiet system behind a",
  titleEmphasis: "fully booked",
  titleTail: "calendar",
  subtitle:
    "A sample subheadline. One or two sentences that make the promise concrete: who it's for, what changes, and why this session is the way there.",
  hostLine: "Hosted by Host Name, Founder of Sample Studio",
};

export const learn: Benefit[] = [
  { title: "Sample takeaway one", body: "Describe the specific, concrete thing attendees will be able to do after this part of the session." },
  { title: "Sample takeaway two", body: "Keep each takeaway outcome-focused and believable. Use the client's own language where possible." },
  { title: "Sample takeaway three", body: "Three to five takeaways is the sweet spot. Each should earn its place." },
];

export const forYou: Benefit[] = [
  { title: "You're a sample audience descriptor", body: "Qualify the visitor in their own words." },
  { title: "You've tried the obvious options", body: "Name the frustration without exaggerating it." },
  { title: "You want a clear, repeatable process", body: "Point at the outcome they want." },
  { title: "You can commit an hour to learn it", body: "Set honest expectations." },
];

export const host: Expert = {
  name: "Host Name",
  role: "Founder, Sample Studio",
  bio: [
    "This is sample bio copy. Replace it with the client's approved story: who they are, why they're credible on this topic, and why they care about the attendee's result.",
    "Keep it human and specific. Only list credentials, media features or results the client has verified.",
  ],
  // image: { src: "/funnels/<slug>/host.jpg", alt: "Host Name", width: 1200, height: 1500 },
  credentials: [],
};

/** Real, approved testimonials only. Leave empty to hide the section. */
export const testimonials: Testimonial[] = [
  { quote: "[PLACEHOLDER: paste a real, approved client testimonial here. Never invent one.]", name: "[PLACEHOLDER: Client name]", role: "[PLACEHOLDER: Role / company]" },
  { quote: "[PLACEHOLDER: second approved testimonial]", name: "[PLACEHOLDER: Client name]", role: "[PLACEHOLDER: Role]" },
  { quote: "[PLACEHOLDER: third approved testimonial]", name: "[PLACEHOLDER: Client name]", role: "[PLACEHOLDER: Role]" },
];

export const registerSteps = [
  { title: "Register below", body: "Takes about 30 seconds. Your details go straight to the host's CRM." },
  { title: "Check your inbox", body: "Your join link and calendar invite arrive by email." },
  { title: "Show up live", body: "Bring a notebook. There's time for Q&A at the end." },
];

export const faqs: FaqItem[] = [
  { question: "Is the masterclass really free?", answer: "Sample answer. State the real terms the client approves." },
  { question: "What time zone is it in?", answer: "The session starts at the time shown above, in Eastern Time. Your confirmation email includes a calendar invite in your local time." },
  { question: "Will there be a replay?", answer: "Sample answer. Only promise a replay if the client will actually send one." },
  { question: "What do I need to attend?", answer: "A laptop or phone with a stable connection. A notebook helps." },
];
