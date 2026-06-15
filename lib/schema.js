import { BUSINESS, SITE_URL } from "./business";
import { faqItems } from "@/components/faqData";

const { address, geo, openingHours } = BUSINESS;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.cityAlt,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.country,
  };
}

function openingHoursSpecification() {
  return openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.dayOfWeek,
    opens: slot.opens,
    closes: slot.closes,
  }));
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.shortName,
    alternateName: [BUSINESS.name, "Sage Thread Bangalore"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/favicon.svg`,
    },
    description: BUSINESS.description,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    foundingDate: BUSINESS.founded,
    address: postalAddress(),
    sameAs: Object.values(BUSINESS.social),
    areaServed: {
      "@type": "City",
      name: "Bangalore",
      containedInPlace: { "@type": "State", name: "Karnataka" },
    },
    knowsAbout: [
      "Women's Fashion",
      "Designer Wear",
      "Ethnic Wear",
      "Custom Stitching",
      "Boutique Clothing",
      "Fashion Consultation",
      "Occasion Wear",
    ],
  };
}

/** Primary WebSite schema — `name` controls Google's site name in search results. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.shortName,
    alternateName: [BUSINESS.name, "Sage Thread Bangalore"],
    url: `${SITE_URL}/`,
    description: BUSINESS.description,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BUSINESS.shortName,
      alternateName: BUSINESS.name,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/favicon.svg`,
      },
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/fashion?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ClothingStore", "Store"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    alternateName: ["Sage Thread", "Sage Thread Bangalore", "Sage Thread Boutique Bangalore"],
    description: BUSINESS.description,
    url: SITE_URL,
    image: [
      `${SITE_URL}/assets/img/fashion-hero.jpg`,
      `${SITE_URL}/assets/img/home-col-fashion.jpg`,
      `${SITE_URL}/assets/img/contact-hero.jpg`,
    ],
    logo: `${SITE_URL}/assets/favicon.svg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.founded,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: [
      { "@type": "City", name: "Bangalore" },
      { "@type": "City", name: "Bengaluru" },
      { "@type": "AdministrativeArea", name: "Karnataka" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Women's Fashion Collections",
      itemListElement: BUSINESS.services.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: service },
      })),
    },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    sameAs: Object.values(BUSINESS.social),
  };
}

export function fashionBoutiqueSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FashionStore",
    "@id": `${SITE_URL}/#fashionboutique`,
    name: BUSINESS.name,
    description:
      "A luxury women's fashion boutique in Bangalore offering designer dresses, ethnic wear, tailor-made outfits, and personal styling.",
    url: SITE_URL,
    image: `${SITE_URL}/assets/img/fashion-hero.jpg`,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function allSchemas() {
  return [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema(),
    fashionBoutiqueSchema(),
    faqPageSchema(),
  ];
}
