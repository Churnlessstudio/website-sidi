/**
 * Internal index of funnels in this repo (shown at "/").
 * Add an entry whenever you create a funnel. `npm run new:funnel` does it for you.
 */
export type FunnelEntry = {
  slug: string;
  client: string;
  type:
    | "webinar"
    | "vsl"
    | "application"
    | "free-training"
    | "lead-magnet"
    | "challenge"
    | "booking"
    | "thank-you"
    | "replay";
  concept: string;
  routes: string[];
  status: "starter" | "draft" | "in-review" | "live";
};

export const funnels: FunnelEntry[] = [
  {
    slug: "starter-webinar",
    client: "INC reference starter",
    type: "webinar",
    concept: "After Hours: warm ember light on a dark editorial stage",
    routes: ["/starter-webinar", "/starter-webinar/thank-you"],
    status: "starter",
  },
];
