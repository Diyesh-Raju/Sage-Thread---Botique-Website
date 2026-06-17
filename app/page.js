import "./home.css";
import Header from "@/components/Header";
import { CircularGallery } from "@/components/CircularGallery";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

const galleryItems = [
  { common: "Warm Minimalism", binomial: "Furniture · Living", photo: { url: "/assets/img/home-intro-furniture.jpg", text: "Curated luxury living room at Sage Thread", by: "Sage Thread" } },
  { common: "City Tailoring", binomial: "Fashion · Atelier", photo: { url: "/assets/img/fashion-1.jpg", text: "Curated fashion at Sage Thread atelier", by: "Sage Thread" } },
  { common: "Quarried Light", binomial: "Marble · Stone", photo: { url: "/assets/img/marble-arch.jpg", text: "Quarried marble at Sage Thread", by: "Sage Thread" } },
  { common: "Rouge", binomial: "Fashion · Editorial", photo: { url: "/assets/img/fashion-3.jpg", text: "Curated fashion editorial at Sage Thread", by: "Sage Thread" } },
  { common: "Parisian Ease", binomial: "Fashion · Street", photo: { url: "/assets/img/home-intro-fashion.jpg", text: "Designer fashion at Sage Thread boutique", by: "Sage Thread" } },
  { common: "Stone Forms", binomial: "Marble · Sculpture", photo: { url: "/assets/img/home-col-marble.jpg", text: "Marble objects at Sage Thread", by: "Sage Thread" } },
];

export const metadata = PAGE_SEO.home;

export const viewport = { themeColor: "#1a1611" };

export default function HomePage() {
  const year = new Date().getFullYear();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/",
            name: "Sage Thread | Luxury Furniture, Fashion & Curated Living",
            description: PAGE_SEO.home.description,
          }),
          breadcrumbSchema([{ name: "Home", url: `${SITE_URL}/` }]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Italiana&family=Jost:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/hero-poster.jpg" />

      <Header />

      <main>
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="hero__media">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/img/hero-poster.jpg"
              title="Sage Thread Boutique — women's fashion boutique in Bangalore"
            >
              <source src="/assets/video/hero.webm" type="video/webm" />
              <source src="/assets/video/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero__inner container">
            <h1 className="hero__title" data-stagger style={{ "--sd": ".22s" }}>
              Sage Thread Boutique
              <br />
              <span className="script">Bangalore</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              A women&apos;s fashion boutique in Bangalore — designer wear,
              ethnic clothing, and tailor-made pieces for the woman who dresses
              with intention.
            </p>
            <p className="eyebrow mt-2" data-stagger style={{ "--sd": ".5s" }}>
              Indiranagar, Bengaluru · Est. {BUSINESS.founded}
            </p>
            <div className="mt-2" data-stagger style={{ "--sd": ".58s" }}>
              <a href="#collections" className="btn btn--solid">
                Explore Our Collection <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        {/* ===== Intro ===== */}
        <section className="section" id="intro">
          <div className="container split">
            <div data-reveal>
              <p className="eyebrow">Our design philosophy</p>
              <h2 className="display" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
                Women&apos;s fashion,
                <br />
                curated with <span className="ampersand">purpose</span>
              </h2>
              <p className="lead mt-2 measure">
                Sage Thread Boutique is a women&apos;s fashion boutique in
                Bangalore, Karnataka, where every garment is chosen for fabric,
                fit, and the quiet confidence of a look well composed. From
                designer dresses to hand-finished ethnic wear, we edit collections
                the way a stylist edits a wardrobe — sparingly, beautifully, and
                with lasting taste.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                For over a decade, women across Bengaluru have trusted us for
                boutique clothing that feels personal — never mass-produced, never
                ordinary.
              </p>
              <a href="/fashion" className="btn btn--ghost btn--lg mt-3">
                Discover Designer Wear <span className="arrow">→</span>
              </a>
            </div>
            <div className="intro-figs" data-reveal="right">
              <div className="media" data-img>
                <img
                  src="/assets/img/home-intro-furniture.jpg"
                  alt="Designer women's evening wear at Sage Thread Boutique Bangalore"
                  title="Designer Wear — Sage Thread Boutique"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="media" data-img style={{ "--d": ".15s" }}>
                <img
                  src="/assets/img/home-intro-fashion.jpg"
                  alt="Contemporary boutique fashion for women in Bengaluru"
                  title="Boutique Fashion — Sage Thread Bangalore"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== GEO answer block ===== */}
        <section className="section section--tight" id="about" aria-label="About Sage Thread Boutique">
          <div className="container">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Know us</p>
              <h2>Your boutique for women&apos;s fashion in Bangalore</h2>
            </div>
            <div className="split" style={{ gap: "2.5rem", marginTop: "2rem" }}>
              <div data-reveal>
                <h3 style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", marginBottom: ".75rem" }}>
                  What is Sage Thread Boutique?
                </h3>
                <p className="measure" style={{ color: "var(--muted)" }}>
                  Sage Thread Boutique is a women&apos;s fashion boutique in
                  Bangalore specializing in designer wear, custom styling, and
                  premium clothing. We are a destination for women who want
                  boutique fashion — curated edits, expert fittings, and
                  tailor-made dresses crafted in our Indiranagar atelier.
                </p>
              </div>
              <div data-reveal style={{ "--d": ".1s" }}>
                <h3 style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", marginBottom: ".75rem" }}>
                  Where is Sage Thread Boutique located?
                </h3>
                <p className="measure" style={{ color: "var(--muted)" }}>
                  We are at {BUSINESS.address.street}, {BUSINESS.address.cityAlt},{" "}
                  {BUSINESS.address.region} {BUSINESS.address.postalCode} — in the
                  heart of Indiranagar, one of Bangalore&apos;s finest shopping
                  neighbourhoods.{" "}
                  <a href="/contact" style={{ textDecoration: "underline" }}>
                    Schedule a boutique visit
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="split" style={{ gap: "2.5rem", marginTop: "2rem" }}>
              <div data-reveal>
                <h3 style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", marginBottom: ".75rem" }}>
                  What services does Sage Thread Boutique offer?
                </h3>
                <p className="measure" style={{ color: "var(--muted)" }}>
                  Our services include women&apos;s clothing, boutique fashion,
                  custom stitching, designer wear, ethnic wear, contemporary
                  fashion, fashion consultation, and occasion wear. Whether you
                  need a saree for a wedding or a tailored dress for an evening
                  out, our stylists guide you from first sketch to final stitch.
                </p>
              </div>
              <div data-reveal style={{ "--d": ".1s" }}>
                <h3 style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", marginBottom: ".75rem" }}>
                  Why choose Sage Thread Boutique?
                </h3>
                <p className="measure" style={{ color: "var(--muted)" }}>
                  Women across Bangalore choose Sage Thread for our decade of
                  fashion expertise, artisan partnerships, and the intimacy of a
                  true boutique experience. We are not a department store — we
                  are your personal fashion house in Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Collections ===== */}
        <section className="section section--tight" id="collections">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">Boutique collections</p>
                <h2>Designer wear, ethnic fashion &amp; custom styling</h2>
              </div>
              <p
                className="measure-sm"
                data-reveal
                style={{
                  "--d": ".1s",
                  color: "var(--muted)",
                  fontSize: "clamp(1.1rem, 1rem + .5vw, 1.35rem)",
                  lineHeight: 1.6,
                }}
              >
                Three curated worlds of women&apos;s fashion — each edited for
                Bangalore&apos;s climate, occasions, and modern Indian elegance.
              </p>
            </div>

            <div className="collections">
              <a href="/furniture" className="tile" data-reveal data-tilt>
                <img
                  src="/assets/img/home-col-furniture-v2.jpg"
                  alt="Designer dresses and occasion wear at Sage Thread Boutique Bangalore"
                  title="Designer Dresses — Sage Thread Bangalore"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">01 — Occasion</p>
                  <h3>Designer Dresses</h3>
                </div>
              </a>
              <a
                href="/fashion"
                className="tile"
                data-reveal
                data-tilt
                style={{ "--d": ".12s" }}
              >
                <img
                  src="/assets/img/home-col-fashion.jpg"
                  alt="Women's fashion and contemporary boutique clothing in Bangalore"
                  title="Women's Fashion — Sage Thread Boutique"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">02 — Atelier</p>
                  <h3>Women&apos;s Fashion</h3>
                </div>
              </a>
              <a
                href="/marble"
                className="tile"
                data-reveal
                data-tilt
                style={{ "--d": ".24s" }}
              >
                <img
                  src="/assets/img/home-col-marble.jpg"
                  alt="Ethnic wear and traditional boutique clothing in Bengaluru"
                  title="Ethnic Wear — Sage Thread Bangalore"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">03 — Heritage</p>
                  <h3>Ethnic Wear</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Feature + stats ===== */}
        <section className="section" id="craft">
          <div className="container split">
            <div className="feature__media" data-reveal="left">
              <div className="media" data-img>
                <img
                  src="/assets/img/home-feature.jpg"
                  alt="Inside Sage Thread Boutique — luxury women's fashion store in Indiranagar, Bangalore"
                  title="Sage Thread Boutique Interior — Bangalore"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature__badge">
                <span className="script">10+ yrs</span>
                <small>serving women across Bengaluru</small>
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Fashion expertise</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                Boutique clothing,
                <br />
                tailored to you
              </h2>
              <p className="lead mt-2 measure">
                <strong className="text-emph">
                  Every piece earns its place on our rail.
                </strong>{" "}
                Our buyers and stylists travel across India to source fabrics and
                silhouettes worthy of a luxury boutique — then fit them to the
                women of Bangalore with precision and care.
              </p>
              <div className="stats mt-3">
                <div className="stat">
                  <div className="num" data-count="120" data-suffix="+">
                    0
                  </div>
                  <div className="lbl">Artisan partners</div>
                </div>
                <div className="stat">
                  <div className="num" data-count="40" data-suffix="k">
                    0
                  </div>
                  <div className="lbl">Outfits styled</div>
                </div>
                <div className="stat">
                  <div className="num" data-count="18">
                    0
                  </div>
                  <div className="lbl">Fabric regions</div>
                </div>
                <div className="stat">
                  <div className="num" data-count="98" data-suffix="%">
                    0
                  </div>
                  <div className="lbl">Would return</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== E-E-A-T: Boutique story ===== */}
        <section className="section section--tight" id="story">
          <div className="container split">
            <div data-reveal>
              <p className="eyebrow">Our boutique story</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                A decade of dressing
                <br />
                Bangalore&apos;s women
              </h2>
              <p className="lead mt-2 measure">
                Sage Thread began in 2014 with a simple conviction: Bangalore
                deserved a women&apos;s boutique that treated fashion as craft,
                not commodity. What started as a small atelier in Indiranagar
                has become a trusted name for designer wear, ethnic collections,
                and custom stitching across Karnataka.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                Our design philosophy honours Indian artistry while embracing
                contemporary silhouettes — so every client leaves feeling seen,
                styled, and beautifully dressed.
              </p>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Quality standards</p>
              <h3 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", marginTop: ".5rem" }}>
                The Sage Thread promise
              </h3>
              <p className="measure mt-2" style={{ color: "var(--muted)" }}>
                We inspect every seam, source fabrics from verified mills and
                weavers, and stand behind our tailoring with complimentary
                fittings. Customer experience is not an afterthought — it is the
                foundation of our reputation as one of Bangalore&apos;s best
                boutiques.
              </p>
              <a href="/contact" className="btn btn--ghost mt-3">
                Book a Fashion Consultation <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Showcase gallery (scroll-pinned) ===== */}
        <CircularGallery
          items={galleryItems}
          heading={
            <>
              <p className="eyebrow">The showcase</p>
              <h2
                className="display"
                style={{ fontSize: "clamp(2.2rem,5.5vw,4.2rem)" }}
              >
                Ethnic &amp; Contemporary <span className="script">Fashion</span>
              </h2>
            </>
          }
        />

        {/* ===== Band quote ===== */}
        <section
          className="band section"
          style={{ marginTop: "clamp(3rem, 8vh, 7rem)" }}
        >
          <div className="band__bg">
            <img
              src="/assets/img/home-band.jpg"
              alt="Women's boutique fashion editorial at Sage Thread Bangalore"
              title="Sage Thread Boutique — Fashion Editorial"
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              &ldquo;We don&apos;t follow trends. We curate the pieces worth
              wearing — season after season, celebration after celebration.&rdquo;
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Priya Menon, Founder, Sage Thread Boutique
            </cite>
          </div>
        </section>

        {/* ===== Marquee ===== */}
        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Designer Wear</span>
            <span>Ethnic Fashion</span>
            <span>Custom Styling</span>
            <span>Boutique Clothing</span>
            <span>Bangalore</span>
            <span>Designer Wear</span>
            <span>Ethnic Fashion</span>
            <span>Custom Styling</span>
            <span>Boutique Clothing</span>
            <span>Bangalore</span>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <section className="section faq-section" id="faq">
          <div className="container">
            <p className="eyebrow faq-eyebrow" data-reveal>
              Frequently Asked Questions
            </p>
            <h2 className="visually-hidden">Sage Thread Boutique FAQ — Bangalore Women's Fashion</h2>
            <div data-reveal>
              <Faq items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Stay in style</p>
            <h2>Discover new arrivals &amp; private styling events</h2>
            <form className="newsletter" data-newsletter>
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
              />
              <button className="btn btn--solid" type="submit">
                Join Our List
              </button>
            </form>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                A women&apos;s fashion boutique in Bangalore — designer wear,
                ethnic clothing, and custom styling in Indiranagar, Karnataka.
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
              <a href="/contact">Custom Stitching</a>
            </div>
            <div>
              <h4>Boutique</h4>
              <a href="#intro">Our Philosophy</a>
              <br />
              <a href="#story">Our Story</a>
              <br />
              <a href="/contact">Visit Us in Bangalore</a>
              <br />
              <a href="/contact">Book a Consultation</a>
            </div>
            <div>
              <h4>Connect</h4>
              <a href="#">Instagram</a>
              <br />
              <a href="#">Pinterest</a>
              <br />
              <a href="#faq">FAQ</a>
              <br />
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom" data-reveal>
            <span>© {year} Sage Thread Boutique · Bengaluru, Karnataka</span>
            <span>Crafted with care · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
