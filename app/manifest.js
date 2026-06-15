import { BUSINESS, SITE_URL } from "@/lib/business";

export default function manifest() {
  return {
    name: BUSINESS.shortName,
    short_name: BUSINESS.shortName,
    description: BUSINESS.description,
    start_url: "/",
    scope: "/",
    id: SITE_URL,
    display: "standalone",
    orientation: "portrait",
    background_color: "#1a1611",
    theme_color: "#1a1611",
    lang: "en-US",
    dir: "ltr",
    categories: ["shopping", "lifestyle", "design"],
    icons: [
      {
        src: "/assets/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/assets/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
