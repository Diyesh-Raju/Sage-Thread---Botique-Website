import "../../../marble.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { createPageMetadata } from "@/lib/metadata";
import {
  MARBLE_COLLECTIONS,
  COLLECTION_BY_SLUG,
} from "@/components/marbleCollectionsData";

export function generateStaticParams() {
  return MARBLE_COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = COLLECTION_BY_SLUG[slug];
  if (!c) return {};
  return createPageMetadata({
    title: `${c.name} Collection`,
    description: `${c.intro} ${c.body[0]}`,
    path: `/marble/collection/${c.slug}`,
  });
}

export const viewport = { themeColor: "#1b2124" };

export default async function CollectionDetailPage({ params }) {
  const { slug } = await params;
  const c = COLLECTION_BY_SLUG[slug];
  if (!c) notFound();

  return (
    <div className="page--marble">
      <JsonLd
        data={[
          webPageSchema({
            path: `/marble/collection/${c.slug}`,
            name: `${c.name} Collection | Sage Thread`,
            description: c.intro,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Marble", url: `${SITE_URL}/marble` },
            { name: "Curated Collections", url: `${SITE_URL}/marble#curated` },
            { name: c.name, url: `${SITE_URL}/marble/collection/${c.slug}` },
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

      <main className="cdetail">
        <div className="container">
          <nav className="collection__crumbs" aria-label="Breadcrumb">
            <Link href="/marble">Marble</Link>
            <span aria-hidden="true">/</span>
            <Link href="/marble#curated">Curated Collections</Link>
            <span aria-hidden="true">/</span>
            <span>{c.name}</span>
          </nav>

          <div className="cdetail__grid">
            <div className="cdetail__media" data-reveal="left">
              <img src={c.img} alt={`${c.name} — Sage Thread curated collection`} />
            </div>

            <div className="cdetail__body" data-reveal="right">
              <p className="eyebrow">{c.eyebrow}</p>
              <h1>{c.name}</h1>
              <p className="cdetail__tagline">{c.tagline}</p>
              <p className="lead measure">{c.intro}</p>
              {c.body.map((para, i) => (
                <p className="measure cdetail__para" key={i}>
                  {para}
                </p>
              ))}

              <dl className="cdetail__traits">
                {c.traits.map((t) => (
                  <div className="cdetail__trait" key={t.label}>
                    <dt>{t.label}</dt>
                    <dd>{t.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="cdetail__cta">
                <a href="/contact" className="btn btn--solid">
                  Enquire about {c.name} <span className="arrow">→</span>
                </a>
                <Link href="/marble#curated" className="cdetail__back">
                  ← All collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
