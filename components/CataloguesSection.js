import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATALOGUES } from "./marbleCatalogues";

/* "Catalogues" brochures section (Roche Bobois layout): each row pairs a text
   block — title, description, Discover link — with an angled 3D book cover that
   tilts upright on hover. Clicking a book opens its page-by-page flipbook
   reader at /marble/catalogue/[slug]. Rows alternate sides. */

export default function CataloguesSection() {
  return (
    <section className="cat" id="catalogues" data-reveal="fade">
      <div className="container">
        <div className="cat__head">
          <span className="cat__rule" aria-hidden="true" />
          <h2>Catalogues</h2>
        </div>

        <div className="cat__list">
          {CATALOGUES.map((c, idx) => {
            const href = `/marble/catalogue/${c.slug}`;
            return (
              <article
                key={c.slug}
                className={`cat__row ${idx % 2 ? "cat__row--rev" : ""}`}
                data-reveal
              >
                <div className="cat__text">
                  <p className="eyebrow">{c.eyebrow}</p>
                  <h3>{c.title}</h3>
                  <p className="cat__desc">{c.description}</p>
                  <Link href={href} className="cat__discover">
                    <span className="cat__discoverIcon">
                      <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    Discover
                  </Link>
                </div>

                <Link
                  href={href}
                  className="cat__bookLink"
                  aria-label={`Open the ${c.title} catalogue`}
                >
                  <div className="cat__book">
                    {/* second book stacked behind, same cover */}
                    <span className="cat__layer cat__layer--behind" aria-hidden="true">
                      <img src={c.cover} alt="" loading="lazy" decoding="async" />
                    </span>
                    {/* front book */}
                    <span className="cat__layer cat__layer--front">
                      <img
                        src={c.cover}
                        alt={`${c.title} — Sage Thread natural stone catalogue cover`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="cat__bookCaption">
                        <span className="cat__bookName">{c.title}</span>
                        {c.quote ? (
                          <span className="cat__bookQuote">{c.quote}</span>
                        ) : null}
                      </span>
                      <span className="cat__bookSheen" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="cat__tap">Tap to explore</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
