import "../furniture.css";
import Header from "@/components/Header";
import FurnitureHero from "@/components/FurnitureHero";
import FurnitureCarousel from "@/components/FurnitureCarousel";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";

// Placeholder pieces for the carousel — real images + copy to follow.
const furniturePieces = [
  { name: "Émeraude Sofa", eyebrow: "Seating", desc: "Deep emerald velvet over a low, generous frame — the seat a whole room settles around.", img: "/assets/img/furniture-1.jpg" },
  { name: "Brigitte Chair", eyebrow: "Seating", desc: "Hand-tufted and softly sculpted, a quiet armchair that flatters every corner it sits in.", img: "/assets/img/furniture-2.jpg" },
  { name: "Soleil Lounge", eyebrow: "Seating", desc: "Warm, easy and a little sunlit — a lounge chair made for long, unhurried afternoons.", img: "/assets/img/furniture-3.jpg" },
  { name: "Atelier Stool", eyebrow: "Objects", desc: "Carved from a single block of timber — equal parts seat, side table and sculpture.", img: "/assets/img/furniture-4.jpg" },
  { name: "Lin Bed", eyebrow: "Bedroom", desc: "Upholstered in washed linen, a headboard that turns a bedroom into a quiet retreat.", img: "/assets/img/furniture-5.jpg" },
  { name: "Noir Accent", eyebrow: "Seating", desc: "Sculptural and self-assured — a graphic accent chair with presence to spare.", img: "/assets/img/furniture-6.jpg" },
];

export const metadata = {
  title: "Furniture — Sage Thread Boutique",
  description:
    "Heirloom furniture in solid wood, stone and honest materials — sourced and made to be lived with for a lifetime.",
};

export const viewport = { themeColor: "#241b14" };

export default function FurniturePage() {
  const year = new Date().getFullYear();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Marcellus&family=Mulish:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Header />

      <main>
        {/* Hero — full-bleed room photos that crossfade every 2s */}
        <FurnitureHero />

        {/* Intro */}
        <section className="section">
          <div className="container split">
            <div className="feature__media" data-reveal>
              <div className="media" data-img>
                <img
                  src="/assets/img/furniture-context.jpg"
                  alt="A warm furnished interior"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature__badge">
                <span className="script">Hand-finished</span>
                <small>by partner ateliers across Europe</small>
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Made to be lived with</p>
              <h2 style={{ fontSize: "clamp(1.6rem,2.8vw,2.55rem)" }}>
                Luxury is not about excess;
                <br />
                it&rsquo;s about intention
              </h2>
              <p className="lead mt-2 measure">
                Every piece earns its place. We work with joiners and weavers who
                still measure twice and finish by hand — so the grain, the joint
                and the seat all age beautifully.
              </p>
              <div className="chiplist mt-3">
                <span className="chip is-on">Solid oak</span>
                <span className="chip">Walnut</span>
                <span className="chip">Travertine</span>
                <span className="chip">Bouclé</span>
                <span className="chip">Cane</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Change 2 — full-width quote on stone ===== */}
        <section className="quote-band">
          <img
            className="quote-band__img"
            src="/assets/img/furniture-quote-bg.jpg"
            alt="A carved stone bench on a warm background"
            loading="lazy"
            decoding="async"
          />
          <div className="quote-band__text" data-reveal>
            <blockquote>
              <span>“Simplicity Is The Ultimate</span>
              <span>Sophistication.”</span>
            </blockquote>
          </div>
          <cite className="quote-band__cite" data-reveal>
            — Leonardo da Vinci
          </cite>
        </section>

        {/* ===== Change 3 — furniture piece carousel ===== */}
        <section className="section" id="gallery">
          <div className="container">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">The pieces</p>
              <h2>Explore the collection</h2>
            </div>
            <div data-reveal>
              <FurnitureCarousel items={furniturePieces} />
            </div>
          </div>
        </section>

        {/* Band */}
        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/furniture-feature.jpg"
              alt=""
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              “A good table is never finished — it keeps a record of every meal.”
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — The Sage Thread Atelier
            </cite>
          </div>
        </section>

        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Oak</span>
            <span>Walnut</span>
            <span>Travertine</span>
            <span>Bouclé</span>
            <span>Cane</span>
            <span>Oak</span>
            <span>Walnut</span>
            <span>Travertine</span>
            <span>Bouclé</span>
            <span>Cane</span>
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

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Design service</p>
            <h2>Furnishing a whole room?</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              Book a private consultation with our interiors team.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Book a consultation <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                Heirloom furniture in honest materials, sourced and made to last
                a lifetime.
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
              <h4>Furniture</h4>
              <a href="#gallery">Seating</a>
              <br />
              <a href="#gallery">Tables</a>
              <br />
              <a href="#gallery">Bedroom</a>
              <br />
              <a href="#gallery">Objects</a>
            </div>
            <div>
              <h4>Care</h4>
              <a href="/contact">Delivery</a>
              <br />
              <a href="/contact">Warranty</a>
              <br />
              <a href="/contact">Trade</a>
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
