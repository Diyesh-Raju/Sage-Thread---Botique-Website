import { BUSINESS, DEFAULT_OG_IMAGE, SITE_URL } from "./business";

const BRAND = BUSINESS.shortName;

/** Build consistent, brand-first metadata for any page. */
export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = `${BRAND} — luxury furniture, fashion & curated living`,
}) {
  const canonical = path ? `${SITE_URL}${path}` : `${SITE_URL}/`;
  const pageTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;

  return {
    title: pageTitle,
    description,
    authors: [{ name: BRAND, url: SITE_URL }],
    creator: BRAND,
    publisher: BRAND,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: BRAND,
      title: pageTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

/** Root layout defaults — brand name must be "Sage Thread" everywhere. */
export const rootMetadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sage Thread | Luxury Furniture, Fashion & Curated Living",
    template: `%s | ${BRAND}`,
  },
  description: BUSINESS.description,
  applicationName: BRAND,
  authors: [{ name: BRAND, url: SITE_URL }],
  creator: BRAND,
  publisher: BRAND,
  keywords: [
    BRAND,
    "Sage Thread Boutique",
    "luxury furniture",
    "curated fashion",
    "marble decor",
    "boutique interiors",
    "curated living",
    "designer furniture",
    "natural stone",
    "luxury boutique",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/`,
    siteName: BRAND,
    title: "Sage Thread | Luxury Furniture, Fashion & Curated Living",
    description:
      "Discover heirloom furniture, curated fashion, marble objects and timeless design at Sage Thread.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${BRAND} — luxury boutique of curated living`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sage Thread | Luxury Furniture, Fashion & Curated Living",
    description:
      "Discover heirloom furniture, curated fashion, marble objects and timeless design at Sage Thread.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    title: BRAND,
    statusBarStyle: "black-translucent",
  },
  category: "shopping",
  manifest: "/manifest.webmanifest",
};

/** Per-page metadata presets */
export const PAGE_SEO = {
  home: createPageMetadata({
    title: "Sage Thread | Luxury Furniture, Fashion & Curated Living",
    description:
      "Discover heirloom furniture, curated fashion, marble objects and timeless design at Sage Thread — a luxury boutique for elevated living.",
    path: "",
    ogImage: `${SITE_URL}/assets/img/hero-poster.jpg`,
    ogImageAlt: "Sage Thread — luxury furniture, fashion and marble",
  }),
  furniture: createPageMetadata({
    title: "Luxury Furniture & Heirloom Design",
    description:
      "Heirloom furniture in solid wood, stone and honest materials — sourced, crafted and curated by Sage Thread for a lifetime of quiet luxury.",
    path: "/furniture",
    ogImage: `${SITE_URL}/assets/img/home-col-furniture-v2.jpg`,
    ogImageAlt: "Sage Thread luxury furniture collection",
  }),
  fashion: createPageMetadata({
    title: "Curated Fashion & Atelier Wardrobes",
    description:
      "Sculptural tailoring and fluid fabric — a wardrobe edited by Sage Thread for the woman who wears intention, not trends.",
    path: "/fashion",
    ogImage: `${SITE_URL}/assets/img/fashion-hero.jpg`,
    ogImageAlt: "Sage Thread curated fashion atelier",
  }),
  marble: createPageMetadata({
    title: "Quarried Marble & Natural Stone",
    description:
      "Marble and natural stone drawn from the earth — hand-selected, cut with patience, and finished to last centuries at Sage Thread.",
    path: "/marble",
    ogImage: `${SITE_URL}/assets/img/marble-arch.jpg`,
    ogImageAlt: "Sage Thread quarried marble and stone",
  }),
  contact: createPageMetadata({
    title: "Visit Sage Thread | Book a Private Viewing",
    description:
      "Visit Sage Thread boutique, book a private viewing, or connect with our team. We would love to welcome you.",
    path: "/contact",
    ogImage: `${SITE_URL}/assets/img/contact-hero.jpg`,
    ogImageAlt: "Visit Sage Thread boutique",
  }),
};
