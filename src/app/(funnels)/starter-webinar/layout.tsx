import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { buildMetadata } from "@/lib/funnel";
import { seo, slug } from "@/funnels/starter-webinar/config";
import "@/funnels/starter-webinar/theme.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-starter-display",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const text = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-starter-text",
  display: "swap",
});

export const metadata = buildMetadata(seo);

export default function StarterWebinarLayout({ children }: LayoutProps<"/starter-webinar">) {
  return (
    <div data-funnel={slug} className={`${display.variable} ${text.variable} min-h-dvh bg-f-bg font-text text-f-ink`}>
      {children}
    </div>
  );
}
