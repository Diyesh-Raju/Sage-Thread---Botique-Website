/** Shared brand facts — single source of truth for SEO, schema & metadata. */
export const SITE_URL = "https://sage-thread-botique-website.vercel.app";

export const BUSINESS = {
  /** Primary brand name shown in Google site name, tabs, and social cards */
  shortName: "Sage Thread",
  name: "Sage Thread Boutique",
  legalName: "Sage Thread",
  description:
    "Sage Thread is a luxury boutique house of curated furniture, fashion, marble objects, and timeless interior design — objects chosen for a beautifully considered life.",
  tagline:
    "Luxury furniture, curated fashion, marble objects and timeless design.",
  email: "hello@sage-thread-boutique.com",
  phone: "+91 80 4123 4567",
  phoneDisplay: "+91 80 4123 4567",
  founded: "2014",
  address: {
    street: "2989, 12th Main Road, HAL 2nd Stage, Indiranagar",
    locality: "Indiranagar",
    city: "Bangalore",
    cityAlt: "Bengaluru",
    region: "Karnataka",
    postalCode: "560008",
    country: "IN",
    countryName: "India",
    full: "2989, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008, India",
  },
  geo: {
    latitude: 12.9719,
    longitude: 77.6412,
  },
  categories: [
    "Luxury Furniture",
    "Designer Fashion",
    "Marble Decor",
    "Boutique Interiors",
    "Curated Living",
  ],
  services: [
    "Luxury Furniture",
    "Curated Fashion",
    "Marble & Natural Stone",
    "Interior Design Consultation",
    "Custom Craftsmanship",
    "Private Viewings",
  ],
  social: {
    instagram: "https://instagram.com/sagethreadboutique",
    pinterest: "https://pinterest.com/sagethreadboutique",
    facebook: "https://facebook.com/sagethreadboutique",
  },
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/img/home-col-fashion.jpg`;

export const LOGO = {
  url: `${SITE_URL}/assets/favicon.svg`,
  width: 64,
  height: 64,
};
