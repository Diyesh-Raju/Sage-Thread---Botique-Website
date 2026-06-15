import "./base.css";
import SiteScripts from "@/components/SiteScripts";
import JsonLd from "@/components/JsonLd";
import { allSchemas } from "@/lib/schema";
import { BUSINESS, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/business";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sage Thread Boutique | Women's Fashion Boutique Bangalore",
    template: "%s | Sage Thread Boutique Bangalore",
  },
  description:
    "Sage Thread Boutique — a luxury women's fashion boutique in Bangalore. Designer wear, ethnic clothing, custom stitching & personal styling in Indiranagar.",
  keywords: [
    "Sage Thread Boutique",
    "Sage Thread",
    "Sage Thread Bangalore",
    "women's boutique Bangalore",
    "designer boutique Bangalore",
    "fashion boutique Bangalore",
    "ethnic wear Bangalore",
    "custom women's clothing Bangalore",
    "designer dresses Bangalore",
    "tailor made dresses Bangalore",
    "luxury boutique Bangalore",
    "best boutique in Bangalore",
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  applicationName: BUSINESS.shortName,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: BUSINESS.shortName,
    title: "Sage Thread Boutique | Women's Fashion Boutique in Bangalore",
    description:
      "Designer wear, ethnic fashion & custom styling at Bangalore's premier women's boutique. Visit Sage Thread in Indiranagar.",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Sage Thread Boutique — women's fashion in Bangalore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sage Thread Boutique | Women's Fashion Bangalore",
    description:
      "Luxury women's fashion boutique in Bangalore — designer wear, ethnic clothing & bespoke tailoring at Sage Thread.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: { icon: "/assets/favicon.svg" },
  category: "fashion",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <JsonLd data={allSchemas()} />
      </head>
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
