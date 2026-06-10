import "./home.css";
import Header from "@/components/Header";
import { CircularGallery } from "@/components/CircularGallery";
import Faq from "@/components/Faq";

// Placeholder showcase imagery (furniture · marble · fashion), drawn from the
// existing assets and mixed around the circle. Swap these `photo.url`s for the
// real photos when they arrive.
const galleryItems = [
  { common: "Warm Minimalism", binomial: "Furniture · Living", photo: { url: "/assets/img/home-intro-furniture.jpg", text: "A curated living room", by: "Sage Thread" } },
  { common: "City Tailoring", binomial: "Fashion · Atelier", photo: { url: "/assets/img/fashion-1.jpg", text: "Street style tailoring", by: "Sage Thread" } },
  { common: "Quarried Light", binomial: "Marble · Stone", photo: { url: "/assets/img/marble-arch.jpg", text: "A sculptural stone staircase", by: "Sage Thread" } },
  { common: "Émeraude Sofa", binomial: "Furniture · Seating", photo: { url: "/assets/img/furniture-1.jpg", text: "Green velvet sofa", by: "Sage Thread" } },
  { common: "Rouge", binomial: "Fashion · Editorial", photo: { url: "/assets/img/fashion-3.jpg", text: "Bold colour study", by: "Sage Thread" } },
  { common: "Vein & Grain", binomial: "Marble · Surface", photo: { url: "/assets/img/marble-context1.jpg", text: "Marble surface detail", by: "Sage Thread" } },
  { common: "In the Workshop", binomial: "Furniture · Craft", photo: { url: "/assets/img/furniture-feature.jpg", text: "Furniture craft still life", by: "Sage Thread" } },
  { common: "Parisian Ease", binomial: "Fashion · Street", photo: { url: "/assets/img/home-intro-fashion.jpg", text: "A couple in Parisian tailoring", by: "Sage Thread" } },
  { common: "Stone Forms", binomial: "Marble · Sculpture", photo: { url: "/assets/img/home-col-marble.jpg", text: "Stone podium forms", by: "Sage Thread" } },
];

const faqItems = [
  {
    q: "Do you offer interior design consultations?",
    a: "Yes. Our interiors team can help you compose a single room or a whole home — pairing furniture, fabric and stone into one considered whole. Arrange a consultation through the contact page.",
  },
  {
    q: "Can I arrange a private viewing of a piece?",
    a: "Of course. Private viewings are available by appointment daily, including evenings, at our Paris boutique. Tell us which pieces you'd like to see and we'll set them aside.",
  },
  {
    q: "Do you ship and deliver internationally?",
    a: "We do. Our team arranges insured worldwide delivery, with white-glove installation for larger furniture and stonework.",
  },
  {
    q: "Is your marble made to order?",
    a: "Most of it. We hand-select the block at the quarry and fabricate to your dimensions and finish — polished, honed or brushed — so no two commissions are alike.",
  },
  {
    q: "What is your return policy?",
    a: "Stock pieces may be returned within 14 days in their original condition. Made-to-order and bespoke commissions are final sale.",
  },
];

export const metadata = {
  title: "Sage Thread — Boutique of Curated Living",
  description:
    "Sage Thread is a boutique house of curated furniture, fashion and marble — objects chosen for a beautifully considered life.",
};

export const viewport = { themeColor: "#1a1611" };

export default function HomePage() {
  const year = new Date().getFullYear();
  return (
    <>
      {/* Per-page fonts (hoisted to <head> by Next) */}
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
            >
              <source src="/assets/video/hero.webm" type="video/webm" />
              <source src="/assets/video/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              Maison · Est. 2014
            </p>
            <h1 className="hero__title" data-stagger style={{ "--sd": ".22s" }}>
              The art of
              <br />
              <span className="script">curated</span> living
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              A boutique house of furniture, fashion and marble — each piece
              chosen for the quiet luxury of an everyday well lived.
            </p>
            <div className="mt-2" data-stagger style={{ "--sd": ".58s" }}>
              <a href="#collections" className="btn btn--solid">
                Explore the house <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        {/* ===== Intro ===== */}
        <section className="section" id="intro">
          <div className="container split">
            <div data-reveal>
              <p className="eyebrow">Our philosophy</p>
              <h2 className="display" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
                Beauty, gathered
                <br />
                with <span className="ampersand">intention</span>
              </h2>
              <p className="lead mt-2 measure">
                We travel, we source, we edit. From the grain of solid walnut to
                the fall of raw silk and the vein of quarried stone, Sage Thread
                brings together objects that age with grace and belong together.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                Three disciplines, one sensibility — considered, tactile, and
                made to last a lifetime.
              </p>
              <a href="#collections" className="btn btn--ghost btn--lg mt-3">
                Discover collections <span className="arrow">→</span>
              </a>
            </div>
            <div className="intro-figs" data-reveal="right">
              <div className="media" data-img>
                <img
                  src="/assets/img/home-intro-furniture.jpg"
                  alt="A curated living room in warm natural materials"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="media" data-img style={{ "--d": ".15s" }}>
                <img
                  src="/assets/img/home-intro-fashion.jpg"
                  alt="A couple in considered Parisian tailoring"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===== Collections ===== */}
        <section className="section section--tight" id="collections">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">The collections</p>
                <h2>Three houses under one roof</h2>
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
                Move between rooms — each with its own character, all sharing
                Sage Thread’s eye for the exceptional.
              </p>
            </div>

            <div className="collections">
              <a href="/furniture" className="tile" data-reveal data-tilt>
                <img
                  src="/assets/img/home-col-furniture-v2.jpg"
                  alt="Furniture collection"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">01 — Living</p>
                  <h3>Furniture</h3>
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
                  alt="Fashion collection"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">02 — Atelier</p>
                  <h3>Fashion</h3>
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
                  alt="Marble collection"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">03 — Stone</p>
                  <h3>Marble</h3>
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
                  alt="A considered interior"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature__badge">
                <span className="script">10 yrs</span>
                <small>of sourcing the rare &amp; the refined</small>
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Why Sage Thread</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                Considered by hand,
                <br />
                chosen with care
              </h2>
              <p className="lead mt-2 measure">
                <strong className="text-emph">
                  Nothing enters the house by accident.
                </strong>{" "}
                Every collection is edited in person — for material honesty, for
                craft, and for the way it makes a room feel.
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
                  <div className="lbl">Pieces placed</div>
                </div>
                <div className="stat">
                  <div className="num" data-count="18">
                    0
                  </div>
                  <div className="lbl">Countries sourced</div>
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
                Where Style Meets <span className="script">Luxury</span>
              </h2>
            </>
          }
        />

        {/* ===== Band quote ===== */}
        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/home-band.jpg"
              alt=""
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              “We don’t sell things. We gather the few objects worth keeping
              forever.”
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Élise Marchand, Founder
            </cite>
          </div>
        </section>

        {/* ===== Marquee ===== */}
        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Furniture</span>
            <span>Fashion</span>
            <span>Marble</span>
            <span>Interiors</span>
            <span>Atelier</span>
            <span>Furniture</span>
            <span>Fashion</span>
            <span>Marble</span>
            <span>Interiors</span>
            <span>Atelier</span>
          </div>
        </div>

        {/* ===== FAQ ===== */}
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

      {/* ===== Footer ===== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Join the house</p>
            <h2>Receive first looks &amp; private viewings</h2>
            <form className="newsletter" data-newsletter>
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
              />
              <button className="btn btn--solid" type="submit">
                Subscribe
              </button>
            </form>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                A boutique house of curated furniture, fashion and marble for a
                beautifully considered life.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="/">Home</a>
              <br />
              <a href="/furniture">Furniture</a>
              <br />
              <a href="/fashion">Fashion</a>
              <br />
              <a href="/marble">Marble</a>
            </div>
            <div>
              <h4>Maison</h4>
              <a href="#intro">Our philosophy</a>
              <br />
              <a href="#craft">Craft</a>
              <br />
              <a href="/contact">Visit us</a>
              <br />
              <a href="/contact">Private viewing</a>
            </div>
            <div>
              <h4>Social</h4>
              <a href="#">Instagram</a>
              <br />
              <a href="#">Pinterest</a>
              <br />
              <a href="#">Journal</a>
              <br />
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom" data-reveal>
            <span>© {year} Sage Thread Boutique</span>
            <span>Crafted with care · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
