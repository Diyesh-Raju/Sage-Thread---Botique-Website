/** Shared business facts — single source of truth for SEO, schema & copy. */
export const SITE_URL = "https://sage-thread-boutique.vercel.app";

export const BUSINESS = {
  name: "Sage Thread Boutique",
  shortName: "Sage Thread",
  legalName: "Sage Thread Boutique",
  description:
    "Sage Thread Boutique is a women's fashion boutique in Bangalore specializing in designer wear, custom styling, ethnic wear, and premium boutique clothing.",
  tagline:
    "A women's fashion boutique in Bangalore specializing in designer wear, custom styling, and premium clothing.",
  email: "hello@sage-thread-boutique.com",
  phone: "+91 80 4123 4567",
  phoneDisplay: "+91 80 4123 4567",
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
  founded: "2014",
  priceRange: "₹₹₹",
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
    { dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
    { dayOfWeek: "Sunday", opens: "11:00", closes: "17:00" },
  ],
  services: [
    "Women's Clothing",
    "Boutique Fashion",
    "Custom Stitching",
    "Designer Wear",
    "Ethnic Wear",
    "Contemporary Fashion",
    "Fashion Consultation",
    "Occasion Wear",
  ],
  social: {
    instagram: "https://instagram.com/sagethreadboutique",
    pinterest: "https://pinterest.com/sagethreadboutique",
    facebook: "https://facebook.com/sagethreadboutique",
  },
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/img/home-col-fashion.jpg`;
