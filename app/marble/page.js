import "../marble.css";
import Header from "@/components/Header";
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

        <section className="section">
          <div className="container split">
            <div className="feature__media" data-reveal="left">
              <div className="media" data-img>
                <img
                  src="/assets/img/marble-arch.jpg"
                  alt="Ethnic occasion wear at Sage Thread women's boutique Bangalore"
                  title="Ethnic Fashion — Sage Thread Boutique"
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
                No two ethnic pieces are alike. We hand-select fabrics from
                weavers in Banaras, Kanchipuram, and Jaipur — so the saree or
                lehenga you wear carries artistry that exists nowhere else.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                Sarees, lehengas, anarkalis, and sharara sets — tailored to the
                millimetre by our Bangalore atelier.
              </p>
            </div>
          </div>
        </section>

        <section className="section section--tight" id="swatches">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">The collection</p>
                <h2>Our ethnic edits</h2>
              </div>
              <p
                className="measure-sm"
                data-reveal
                style={{ "--d": ".1s", color: "var(--muted)" }}
              >
                Six signature ethnic styles, each with its own character — from
                luminous silk to deep, dramatic brocade.
              </p>
            </div>
            <div className="swatches">
              <div className="swatch" data-reveal data-tilt>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-calacatta.svg')",
                  }}
                  role="img"
                  aria-label="Kanjeevaram silk ethnic wear"
                ></div>
                <div className="swatch__cap">
                  <h3>Kanjeevaram Silk</h3>
                  <small>Gold · Temple border</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".08s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-carrara.svg')",
                  }}
                  role="img"
                  aria-label="Banarasi weave sarees"
                ></div>
                <div className="swatch__cap">
                  <h3>Banarasi Weave</h3>
                  <small>Silk · Soft zari</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".16s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-statuario.svg')",
                  }}
                  role="img"
                  aria-label="Chikankari ethnic wear"
                ></div>
                <div className="swatch__cap">
                  <h3>Chikankari</h3>
                  <small>Cotton · Hand embroidery</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-nero.svg')",
                  }}
                  role="img"
                  aria-label="Velvet lehenga collection"
                ></div>
                <div className="swatch__cap">
                  <h3>Velvet Lehenga</h3>
                  <small>Black · Gold zardozi</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".08s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-emperador.svg')",
                  }}
                  role="img"
                  aria-label="Bandhani festive wear"
                ></div>
                <div className="swatch__cap">
                  <h3>Bandhani</h3>
                  <small>Tie-dye · Festive</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".16s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-verde.svg')",
                  }}
                  role="img"
                  aria-label="Indo-western ethnic fusion"
                ></div>
                <div className="swatch__cap">
                  <h3>Indo-Western</h3>
                  <small>Fusion · Contemporary</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container split">
            <div data-reveal="left">
              <p className="eyebrow">From loom to boutique</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                Cut, draped,
                <br />
                perfected
              </h2>
              <p className="lead mt-2 measure">
                We follow each ethnic garment from the weaver&apos;s loom to your
                fitting — cut to your measurements, the borders finished, the
                blouse tailored to your preferred style.
              </p>
              <div className="finishes mt-2">
                <div className="finish" data-reveal>
                  <div className="finish__row">
                    <h3>Ready-to-Wear</h3>
                    <span className="idx">01</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    Curated ethnic pieces in standard sizes, ready for fitting at
                    our Bangalore boutique.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".06s" }}>
                  <div className="finish__row">
                    <h3>Made-to-Order</h3>
                    <span className="idx">02</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    Commission a custom ethnic outfit in your choice of fabric and
                    embellishment.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".12s" }}>
                  <div className="finish__row">
                    <h3>Bridal Edit</h3>
                    <span className="idx">03</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    Complete bridal and wedding-guest styling with our Bangalore
                    atelier team.
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
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/assets/img/marble-clip-poster.jpg"
                title="Ethnic wear craftsmanship at Sage Thread Boutique Bangalore"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src="/assets/video/marble-clip.webm" type="video/webm" />
                <source src="/assets/video/marble-clip.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/marble-context1.jpg"
              alt="Traditional ethnic fashion styling at Sage Thread Boutique Bengaluru"
              title="Ethnic Wear Editorial — Sage Thread"
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              &ldquo;Tradition is not the worship of ashes, but the preservation of
              fire — and the right ethnic wear carries that flame.&rdquo;
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Sage Thread Boutique, Bangalore
            </cite>
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
