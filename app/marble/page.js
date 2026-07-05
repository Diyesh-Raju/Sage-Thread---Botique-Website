import "../marble.css";
import Header from "@/components/Header";
import MarbleCollections from "@/components/MarbleCollections";
import MarbleAbout from "@/components/MarbleAbout";
import CataloguesSection from "@/components/CataloguesSection";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

export const metadata = PAGE_SEO.marble;

export const viewport = { themeColor: "#1b2124" };

export default function MarblePage() {
  const year = new Date().getFullYear();
  return (
    <div className="page--marble">
      <JsonLd
        data={[
          webPageSchema({
            path: "/marble",
            name: "Quarried Marble & Natural Stone | Sage Thread",
            description: PAGE_SEO.marble.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Marble", url: `${SITE_URL}/marble` },
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

      <main>
        {/* ===== Pinned intro: hero -> marble rises -> text -> box -> expand ===== */}
        <section className="intro" data-intro>
          <div className="intro__pin">
            {/* layer 0 — hero photo + headline */}
            <div className="intro__layer intro__hero">
              <div
                className="intro__heroBg marble-hero-bg"
                role="img"
                aria-label="A travertine-walled garden terrace at dusk — fire bowl, lounge seating and marble statuary by the pool — Sage Thread"
              ></div>
              <div className="intro__heroText container">
                <h1>
                  Luxury that
                  <br />
                  Lives With You
                </h1>
                <p className="intro__heroDesc">
                  Hand-selected marble and natural stone, crafted into spaces
                  that carry warmth, character, and quiet permanence — homes
                  meant to be lived in for generations.
                </p>
              </div>
            </div>

            {/* layer 1 — marble wallpaper that slides up + centred line */}
            <div className="intro__layer intro__marble" data-intro-marble>
              <img
                className="intro__marbleImg"
                src="/assets/img/marble-wall.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="intro__marbleText">
                <h2 data-intro-text>
                  Curation of the most exquisite natural stones.
                  <br />
                  Each vein tells a story.
                </h2>
              </div>
            </div>

            {/* layer 2 — expanding black box (video placeholder) */}
            <div className="intro__box" data-intro-box aria-hidden="true"></div>

            <div className="scroll-cue">Scroll</div>
          </div>
        </section>

        {/* Curated Collections — MCI-style 3D coverflow carousel */}
        <MarbleCollections />

        {/* About the house — service cards + central staircase image + stats */}
        <MarbleAbout />

        <section className="section">
          <div className="container split">
            <div className="feature__media" data-reveal="left">
              <div className="media" data-img>
                <img
                  src="/assets/img/marble-story.jpg"
                  alt="Backlit onyx marble feature wall in a kitchen at Sage Thread Boutique Bangalore"
                  title="Natural Stone — Sage Thread Boutique"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature__badge">
                <span className="script">Handwoven</span>
                <small>textiles from artisan clusters across India</small>
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Indian craftsmanship</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)" }}>
                Each thread tells
                <br />a story
              </h2>
              <p className="lead mt-2 measure">
                No two slabs are alike. We hand-select each block of marble and
                natural stone at the quarry — so the surface that lives in your
                home carries veining and character found nowhere else.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                Calacatta, Statuario, onyx and travertine — cut, honed and
                finished to the millimetre by our Bangalore atelier.
              </p>
            </div>
          </div>
        </section>

        {/* Catalogues — Roche Bobois-style brochures → page-flip readers */}
        <CataloguesSection />

        <section className="section">
          <div className="container split">
            <div data-reveal="left">
              <p className="eyebrow">The Sage Thread promise</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                Exquisite Stone
                <br />
                Legacy
              </h2>
              <p className="lead mt-2 measure">
                A commitment that runs from the quarry to your home — genuine
                stone, hand-managed craftsmanship and finishes built to last a
                lifetime.
              </p>
              <div className="finishes mt-2">
                <div className="finish" data-reveal>
                  <div className="finish__row">
                    <h3>Guaranteed Lifetime Authenticity</h3>
                    <span className="idx">01</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    We trace every marble slab from quarry to installation. Each
                    piece comes with certified origin documentation and quality
                    assurance, ensuring you&apos;re investing in genuine, premium
                    stone — not imitations. No hidden sourcing. No compromises.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".06s" }}>
                  <div className="finish__row">
                    <h3>White-Glove Concierge Service</h3>
                    <span className="idx">02</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    From your first vision to the final polish, our dedicated
                    concierge team manages everything. No delays. No communication
                    gaps. We deliver stunning marble spaces faster than anyone
                    else — without sacrificing quality.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".12s" }}>
                  <div className="finish__row">
                    <h3>Industry-Leading Durability</h3>
                    <span className="idx">03</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    Every slab receives our proprietary nano-seal treatment,
                    making marble 10x more resistant to stains and etching than
                    standard marble. We back this with a performance guarantee —
                    or we refinish it free.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="media"
              data-img
              data-reveal="right"
              style={{
                aspectRatio: "4/5",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              <img
                src="/assets/img/marble-legacy.png"
                alt="Carved stone colonnade over polished marble flooring with a floral rangoli at a Sage Thread space in Bangalore"
                title="Exquisite Stone Legacy — Sage Thread Boutique"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Sarees</span>
            <span>Lehengas</span>
            <span>Ethnic Wear</span>
            <span>Bangalore</span>
            <span>Handwoven</span>
            <span>Sarees</span>
            <span>Lehengas</span>
            <span>Ethnic Wear</span>
            <span>Bangalore</span>
            <span>Handwoven</span>
          </div>
        </div>

        <section className="section faq-section">
          <div className="container">
            <p className="eyebrow faq-eyebrow" data-reveal>
              Frequently Asked Questions
            </p>
            <div data-reveal>
              <Faq items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Ethnic styling</p>
            <h2>Planning a wedding or festive occasion?</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              Book an ethnic wear consultation — we&apos;ll curate the perfect look.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Connect With Our Designers <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                Ethnic wear and traditional fashion for women — curated at our
                Bangalore boutique in Indiranagar, Karnataka.
              </p>
            </div>
            <div>
              <h4>Collections</h4>
              <a href="/fashion">Women&apos;s Fashion</a>
              <br />
              <a href="/furniture">Designer Dresses</a>
              <br />
              <a href="/marble">Ethnic Wear</a>
              <br />
              <a href="/">Home</a>
            </div>
            <div>
              <h4>Ethnic Wear</h4>
              <a href="#swatches">Sarees</a>
              <br />
              <a href="#swatches">Lehengas</a>
              <br />
              <a href="/contact">Custom Ethnic</a>
              <br />
              <a href="/contact">Bridal Styling</a>
            </div>
            <div>
              <h4>Visit</h4>
              <a href="/contact">Book Appointment</a>
              <br />
              <a href="/contact">Fashion Consultation</a>
              <br />
              <a href="/#faq">FAQ</a>
              <br />
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom" data-reveal>
            <span>© {year} Sage Thread Boutique · Bengaluru</span>
            <span>Crafted with care · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
