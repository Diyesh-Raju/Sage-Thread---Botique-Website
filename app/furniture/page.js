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
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

export const metadata = PAGE_SEO.furniture;

export const viewport = { themeColor: "#241b14" };

export default function FurniturePage() {
  const year = new Date().getFullYear();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/furniture",
            name: "Luxury Furniture & Heirloom Design | Sage Thread",
            description: PAGE_SEO.furniture.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Furniture", url: `${SITE_URL}/furniture` },
          ]),
        ]}
      />
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
            alt="Designer occasion wear at Sage Thread Boutique Bangalore"
            title="Designer Dresses — Sage Thread"
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
                  alt="Premium boutique fabrics for designer dresses at Sage Thread Bangalore"
                  title="Boutique Fabrics — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Premium textiles</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Boutique Fabrics</h2>
              <p className="lead mt-2 measure">
                Our fabric library is the foundation of every designer dress we
                create. We partner with specialist mills and weavers across India
                to source premium silks, linens, and velvets — each chosen for
                drape, durability, and the way it flatters on the women of
                Bangalore.
              </p>
            </div>
          </div>
        </section>

        {/* Upholstery — copy left, image right (Magari "Wrapped in style") */}
        <section className="section">
          <div className="container split split--img-right">
            <div data-reveal>
              <p className="eyebrow">Tailor-made dresses</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Custom Stitching</h2>
              <p className="lead mt-2 measure">
                Commission a tailor-made dress crafted to your measurements and
                vision. Choose from our fabric library, select embellishments, and
                work with our Bangalore tailors through two fitting sessions — from
                cocktail dresses to gala gowns, each piece is built for you alone.
              </p>
            </div>
            <div className="feature__media" data-reveal="right">
              <div className="media media--tall" data-img>
                <img
                  src="/assets/img/upholstery.jpg"
                  alt="Custom tailor-made dresses at Sage Thread women's boutique Bangalore"
                  title="Custom Stitching — Sage Thread Boutique"
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
                  alt="Artisan embellishment on designer dresses at Sage Thread Bangalore"
                  title="Artisan Finishing — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">Embellishment &amp; detail</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.4rem)" }}>Artisan Finishing</h2>
              <p className="lead mt-2 measure">
                From hand embroidery and zardozi to contemporary beadwork and
                appliqué, our artisan partners bring depth and character to every
                designer dress. Each finish is chosen to honour the occasion —
                understated for workwear, luminous for celebrations.
              </p>
              <p className="lead mt-2 measure">
                Discuss embellishment options during your fashion consultation at
                our Indiranagar boutique — we guide you from sketch to final stitch.
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
                    alt="Fashion consultation with Sage Thread stylists in Bangalore"
                    title="Book a Fashion Consultation"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div data-reveal="right">
                  <h2 style={{ fontSize: "clamp(1.8rem,3.4vw,2.8rem)" }}>
                    Book a Fashion Consultation
                  </h2>
                  <p className="lead mt-2">
                    Ready to find your perfect designer dress? Book a complimentary
                    styling session with our Bangalore atelier team.
                  </p>
                  <p className="lead mt-2">
                    We&rsquo;ll discuss your occasion, explore fabrics and
                    silhouettes, and walk you through custom stitching options —
                    in store or by video call.
                  </p>
                  <div className="mt-3">
                    <a href="/contact" className="btn btn--solid btn--sage">
                      Schedule a Boutique Visit{" "}
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
              Designer Boutique · Bangalore
            </p>
            <blockquote className="big-quote" data-reveal>
              Your wardrobe is more than clothing — it&rsquo;s how the world meets you.
            </blockquote>
            <div className="quote-cta" data-reveal>
              <a href="/contact" className="btn btn--solid">
                Discover Your Perfect Look <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2nd fixed image — 3D-hover social icons */}
        <FurnitureSocial />

        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Silk</span>
            <span>Designer Dresses</span>
            <span>Tailor-Made</span>
            <span>Bangalore</span>
            <span>Occasion Wear</span>
            <span>Silk</span>
            <span>Designer Dresses</span>
            <span>Tailor-Made</span>
            <span>Bangalore</span>
            <span>Occasion Wear</span>
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
            <p className="eyebrow">Designer dresses</p>
            <h2>Planning a special occasion?</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              Book a private styling session at our Bangalore boutique.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Book a Fashion Consultation <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                Designer dresses and tailor-made occasion wear at Bangalore&apos;s
                luxury women&apos;s fashion boutique.
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
              <h4>Designer Dresses</h4>
              <a href="/contact">Evening Gowns</a>
              <br />
              <a href="/contact">Cocktail Dresses</a>
              <br />
              <a href="/contact">Bridal Edit</a>
              <br />
              <a href="/contact">Custom Stitching</a>
            </div>
            <div>
              <h4>Visit</h4>
              <a href="/contact">Book Appointment</a>
              <br />
              <a href="/contact">Alterations</a>
              <br />
              <a href="/contact">Fashion Consultation</a>
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
    </>
  );
}
