import "../furniture.css";
import Header from "@/components/Header";
import FurnitureHero from "@/components/FurnitureHero";
import FurnitureFinishes from "@/components/FurnitureFinishes";
import { LandingAccordionItem } from "@/components/FurnitureAccordion";
import FurnitureRooms from "@/components/FurnitureRooms";
import FurnitureServices from "@/components/FurnitureServices";
import FurnitureSocial from "@/components/FurnitureSocial";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";

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

        {/* Intro — pick a wood finish to preview it on the left */}
        <FurnitureFinishes />

        {/* 21st.dev image-accordion template (placeholder content) */}
        <LandingAccordionItem />

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

        {/* Shop-by-room grid (Anima Domus style) */}
        <FurnitureRooms />

        {/* Fabrics — image left, copy right (Magari "Indulge in textures") */}
        <section className="section">
          <div className="container split split--img-left">
            <div className="feature__media" data-reveal>
              <div className="media media--tall" data-img>
                <img
                  src="/assets/img/fabrics-textures.jpg"
                  alt="A neatly folded stack of neutral linen fabrics with lace trim"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Indulge in textures</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Fabrics</h2>
              <p className="lead mt-2 measure">
                Our fabric collection is a celebration of the finest textiles. We
                partner with specialist mills and weavers to bring you a curated
                range of premium cloth — linens, bouclés and velvets in a quiet
                palette of textures, patterns and tones, each chosen to wear
                beautifully and stand the test of time.
              </p>
            </div>
          </div>
        </section>

        {/* Upholstery — copy left, image right (Magari "Wrapped in style") */}
        <section className="section">
          <div className="container split split--img-right">
            <div data-reveal>
              <p className="eyebrow">Wrapped in style</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Upholstery</h2>
              <p className="lead mt-2 measure">
                Customize your pieces with upholstery handpicked from the finest
                mills to ensure the highest quality and durability. Our collection
                offers a variety of fabrics, in an array of colours and patterns
                to choose from — from statement sofas to cosy armchairs, there is
                something to suit every taste and style.
              </p>
            </div>
            <div className="feature__media" data-reveal="right">
              <div className="media media--tall" data-img>
                <img
                  src="/assets/img/upholstery.jpg"
                  alt="Beige ribbed-velvet tub chairs with brass legs on marble"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Wallpaper — image left, copy right (Magari "Tasteful wall art") */}
        <section className="section">
          <div className="container split split--img-left">
            <div className="feature__media" data-reveal>
              <div className="media media--tall" data-img>
                <img
                  src="/assets/img/wallpaper.jpg"
                  alt="Emerald and gold leaf-patterned wallpaper behind a dark wood bed"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Tasteful wall art</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Wallpaper</h2>
              <p className="lead mt-2 measure">
                Breathe a sense of ethereal wonder into your spaces with our
                stunning wallpaper collection. From bold prints to subtle
                patterns, each design is made from the highest quality materials
                and adds a touch of sophistication and style to your living
                spaces.
              </p>
              <p className="lead mt-2 measure">
                Our wallpapers are easy to install, maintain and remove — making
                it simple to refresh your home decor.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services — four cards with icon tiles + dividers */}
        <FurnitureServices />

        {/* Fixed-image consultation CTA */}
        <section className="fixed-cta">
          <div className="container">
            <div className="fixed-cta__panel">
              <div className="split">
                <div className="fixed-cta__media" data-reveal>
                  <img
                    src="/assets/img/consult-zoom.jpg"
                    alt="A video design consultation with our in-house team"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div data-reveal="right">
                  <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.8rem)" }}>
                    Schedule a Free Design Video Consultation
                  </h2>
                  <p className="lead mt-2">
                    Ready to move from ideas to a clear plan? Book a complimentary
                    30-minute consultation with one of our in-house designers.
                  </p>
                  <p className="lead mt-2">
                    We&rsquo;ll review your project goals, discuss layout and
                    design options, and walk you through the materials, products
                    and services that best fit your space.
                  </p>
                  <p className="lead mt-2">
                    No obligation — just a focused, professional conversation to
                    see how we can help transform your home.
                  </p>
                  <div className="mt-3">
                    <a href="/contact" className="btn btn--solid btn--sage">
                      Book a Free Video Call or Schedule Appointment{" "}
                      <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statement quote */}
        <section className="section quote-statement">
          <div className="container">
            <p className="eyebrow" data-reveal>
              Italian Modern Design
            </p>
            <blockquote className="big-quote" data-reveal>
              Your space is more than a room — it&rsquo;s where design meets life.
            </blockquote>
            <div className="quote-cta" data-reveal>
              <a href="/contact" className="btn btn--solid">
                Are you ready to create yours? <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2nd fixed image — 3D-hover social icons */}
        <FurnitureSocial />

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
