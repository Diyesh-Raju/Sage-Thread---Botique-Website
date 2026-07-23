import "../../../marble.css";
import { notFound } from "next/navigation";
import { Printer } from "lucide-react";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Flipbook from "@/components/Flipbook";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { createPageMetadata } from "@/lib/metadata";
import { CATALOGUES, CATALOGUE_BY_SLUG } from "@/components/marbleCatalogues";

export function generateStaticParams() {
  return CATALOGUES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = CATALOGUE_BY_SLUG[slug];
  if (!c) return {};
  return createPageMetadata({
    title: `${c.title} — Catalogue`,
    description: c.description,
    path: `/marble/catalogue/${c.slug}`,
  });
}

export const viewport = { themeColor: "#1b2124" };

export default async function CataloguePage({ params }) {
  const { slug } = await params;
  const c = CATALOGUE_BY_SLUG[slug];
  if (!c) notFound();

  return (
    <div className="page--marble page--catalogue">
      <JsonLd
        data={[
          webPageSchema({
            path: `/marble/catalogue/${c.slug}`,
            name: `${c.title} | Sage Thread`,
            description: c.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Marble", url: `${SITE_URL}/marble` },
            { name: "Catalogues", url: `${SITE_URL}/marble#catalogues` },
            { name: c.title, url: `${SITE_URL}/marble/catalogue/${c.slug}` },
          ]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Header />

      <main className="catalogue">
        <div className="container">
          <BackButton fallback="/marble#catalogues" />

          <header className="catalogue__head">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1>{c.title}</h1>
            <p className="catalogue__dragHint">Use mouse (or tap) to drag a corner of the book</p>
          </header>
        </div>

        <Flipbook catalogue={c} />

        <div className="dl-btn__wrap">
          <button type="button" className="dl-btn">
            <Printer size={19} strokeWidth={1.7} aria-hidden="true" />
            Download
          </button>
        </div>
      </main>
    </div>
  );
}
