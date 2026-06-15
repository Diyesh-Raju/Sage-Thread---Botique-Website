import { SITE_URL } from "@/lib/business";

export default function sitemap() {
  const routes = ["", "/fashion", "/furniture", "/marble", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/fashion" ? 0.9 : 0.7,
  }));
}
