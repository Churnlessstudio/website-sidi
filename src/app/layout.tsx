import type { Metadata, Viewport } from "next";
import "./globals.css";

// Fonts, theme and SEO are set per funnel in src/app/(funnels)/<slug>/layout.tsx.
export const metadata: Metadata = {
  title: { default: "The INC Consulting", template: "%s" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
