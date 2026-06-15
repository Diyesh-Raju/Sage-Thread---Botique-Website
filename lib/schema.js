import { BUSINESS, LOGO, SITE_URL } from "./business";
import { faqItems } from "@/components/faqData";

function logoObject() {
  return {
    "@type": "ImageObject",
    url: LOGO.url,
    width: LOGO.width,
    height: LOGO.height,
  };
}

export function brandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${SITE_URL}/#brand`,
    name: BUSINESS.shortName,
    alternateName: BUSINESS.name,
    description: BUSINESS.tagline,
    slogan: BUSINESS.tagline,
    logo: logoObject(),
    url: SITE_URL,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.shortName,
    alternateName: [BUSINESS.name, "Sage Thread Boutique"],
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: logoObject(),
    image: LOGO.url,
    description: BUSINESS.description,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    foundingDate: BUSINESS.founded,
    brand: { "@id": `${SITE_URL}/#brand` },
    sameAs: Object.values(BUSINESS.social),
    knowsAbout: BUSINESS.categories,
  };
}

/** Controls Google's site name in search results — `name` must be "Sage Thread". */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.shortName,
    alternateName: BUSINESS.name,
    url: `${SITE_URL}/`,
    description: BUSINESS.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/fashion?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({ path = "/", name, description }) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: name || BUSINESS.shortName,
    description: description || BUSINESS.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function storeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "HomeGoodsStore"],
    "@id": `${SITE_URL}/#store`,
    name: BUSINESS.shortName,
    alternateName: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    image: [
      `${SITE_URL}/assets/img/home-col-furniture-v2.jpg`,
      `${SITE_URL}/assets/img/home-col-fashion.jpg`,
      `${SITE_URL}/assets/img/home-col-marble.jpg`,
    ],
    logo: logoObject(),
    brand: { "@id": `${SITE_URL}/#brand` },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sage Thread Collections",
      itemListElement: BUSINESS.categories.map((category, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Product", name: category },
      })),
    },
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

/** Site-wide schemas injected in layout <head> */
export function globalSchemas() {
  return [
    brandSchema(),
    organizationSchema(),
    websiteSchema(),
    storeSchema(),
    faqPageSchema(),
  ];
}
