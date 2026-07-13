import "../fashion.css";
import Header from "@/components/Header";
import CollectionsCarousel from "@/components/CollectionsCarousel";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

export const metadata = PAGE_SEO.fashion;

export const viewport = { themeColor: "#160f15" };

const collectionItems = [
  { name: "Jewelry", img: "/assets/img/collection-jewelry.jpg", alt: "Emerald and diamond statement ring — fine jewellery at Sage Thread Boutique Bangalore" },
  { name: "Modern Aesthetic", img: "/assets/img/collection-modern.jpg", pos: "top", alt: "Modern minimalist summer dress — contemporary women's fashion at Sage Thread Bengaluru" },
  { name: "High Jewelry", img: "/assets/img/collection-high-jewelry.jpg", alt: "Ornate gold and polki high jewellery necklace at Sage Thread Boutique Bangalore" },
  { name: "Traditional Fashion", img: "/assets/img/collection-traditional.jpg", pos: "top", alt: "Gold tissue lehenga with rose dupatta — traditional Indian wear at Sage Thread Bangalore" },
  { name: "Timeless Pieces", img: "/assets/img/collection-timeless.jpg", pos: "top", alt: "Printed halter top with wide-leg trousers — timeless boutique clothing at Sage Thread" },
  { name: "Men's Fashion", img: "/assets/img/collection-mens.jpg", alt: "Ribbed knit polo and tailored trousers — men's fashion at Sage Thread Boutique Bangalore" },
];

export default function FashionPage() {
  const year = new Date().getFullYear();
  return (
    <div className="page--fashion">
      <JsonLd
        data={[
          webPageSchema({
            path: "/fashion",
            name: "Curated Fashion & Atelier Wardrobes | Sage Thread",
            description: PAGE_SEO.fashion.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Fashion", url: `${SITE_URL}/fashion` },
          ]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Italiana&family=Montserrat:wght@300;400;500&family=Pinyon+Script&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/fashion-hero-beach.jpg" />

      <Header />

      <main>
        <section className="hero hero--fashion">
          <div className="hero__media">
            <img
              src="/assets/img/fashion-hero-beach.jpg"
              alt="Designer women's fashion at Sage Thread Boutique Bangalore"
              title="Designer Wear — Sage Thread Bangalore"
            />
            {/* progressive right-side blur — two stacked, masked copies ramp
                the blur from mid-frame to a soft dream at the right edge */}
            <div className="hero__blur" aria-hidden="true">
              <img src="/assets/img/fashion-hero-beach.jpg" alt="" />
            </div>
            <div className="hero__blur hero__blur--2" aria-hidden="true">
              <img src="/assets/img/fashion-hero-beach.jpg" alt="" />
            </div>
          </div>
          <div className="hero__inner hero__inner--right container">
            <h1 className="hero__title fashion-hero__title" data-stagger style={{ "--sd": ".22s" }}>
              <span className="fashion-hero__script">Fashion,</span>
              <span className="fashion-hero__line">The Canvas of Your Soul</span>
            </h1>
            <div className="fashion-hero__cta" data-stagger style={{ "--sd": ".42s" }}>
              <a href="#lookbook" className="btn btn--solid">
                Explore Our Collection <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        <section className="section collections-section" data-reveal>
          <div className="container">
            <CollectionsCarousel items={collectionItems} />
          </div>
        </section>

        <section className="section editorial">
          <div className="container split">
            <div data-reveal>
              <p className="eyebrow">Boutique clothing</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)" }}>
                Fewer pieces,
                <br />
                worn beautifully
              </h2>
              <p className="lead mt-2 measure">
                At Sage Thread Boutique, we don&apos;t chase fast fashion. Each
                designer piece is chosen for cut, cloth, and the way it flatters
                — built to outlive the season and become your signature look in
                Bengaluru and beyond.
              </p>
              <a
                href="#lookbook"
                className="btn btn--ghost mt-3"
                style={{ color: "#fff" }}
              >
                Discover Your Perfect Look <span className="arrow">→</span>
              </a>
            </div>
            <div className="intro-figs" data-reveal="right">
              <div className="media" data-img>
                <img
                  src="/assets/img/fashion-5.jpg"
                  alt="Tailored designer coat detail at Sage Thread women's boutique Bangalore"
                  title="Designer Tailoring — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="media" data-img style={{ "--d": ".15s" }}>
                <img
                  src="/assets/img/fashion-6.jpg"
                  alt="Contemporary women's fashion styling at Sage Thread Bengaluru"
                  title="Contemporary Fashion — Sage Thread Bangalore"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight" id="lookbook">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">Lookbook</p>
                <h2>Custom styling &amp; designer edits</h2>
              </div>
              <p
                className="measure-sm"
                data-reveal
                style={{ "--d": ".1s", color: "var(--muted)" }}
              >
                A seasonal study in texture, drape, and tone — curated for women
                who shop at Bangalore&apos;s finest fashion boutiques.
              </p>
            </div>
            <div className="lookbook">
              <a className="tile" data-reveal href="/contact">
                <img
                  src="/assets/img/fashion-1.jpg"
                  alt="City tailoring — designer women's wear at Sage Thread Boutique Bangalore"
                  title="City Tailoring — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 01</p>
                  <h3>City Tailoring</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".08s" }} href="/contact">
                <img
                  src="/assets/img/fashion-2.jpg"
                  alt="Golden hour portrait — boutique fashion for women in Bengaluru"
                  title="Golden Hour Edit — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 02</p>
                  <h3>Golden Hour</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".16s" }} href="/contact">
                <img
                  src="/assets/img/fashion-3.jpg"
                  alt="Bold designer dress — luxury women's fashion Bangalore"
                  title="Rouge Collection — Sage Thread Boutique"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 03</p>
                  <h3>Rouge</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".08s" }} href="/contact">
                <img
                  src="/assets/img/fashion-4.jpg"
                  alt="Saffron occasion wear — designer boutique clothing Bangalore"
                  title="Saffron Edit — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 04</p>
                  <h3>Saffron</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".16s" }} href="/contact">
                <img
                  src="/assets/img/fashion-rack.jpg"
                  alt="Curated women's clothing rail at Sage Thread fashion boutique Indiranagar"
                  title="In-Store Collection — Sage Thread Bangalore"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">In store</p>
                  <h3>The Rail</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".24s" }} href="/contact">
                <img
                  src="/assets/img/fashion-feature.jpg"
                  alt="Behind the scenes at Sage Thread women's fashion atelier Bangalore"
                  title="Boutique Atelier — Sage Thread"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Atelier</p>
                  <h3>Backstage</h3>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="video-feature" data-reveal="scale">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/assets/img/fashion-clip-poster.jpg"
                title="Sage Thread Boutique fashion campaign — women's designer wear Bangalore"
              >
                <source src="/assets/video/fashion-clip.webm" type="video/webm" />
                <source src="/assets/video/fashion-clip.mp4" type="video/mp4" />
              </video>
              <div className="video-feature__cap">
                <p className="eyebrow" style={{ color: "#fff" }}>
                  Film · Boutique Campaign
                </p>
                <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                  Contemporary fashion, Bangalore
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/fashion-4.jpg"
              alt="Designer women's occasion wear at Sage Thread Boutique Bengaluru"
              title="Occasion Wear — Sage Thread Bangalore"
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              &ldquo;Elegance is the only beauty that never fades — and the
              right boutique makes all the difference.&rdquo;
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Sage Thread Boutique, Bangalore
            </cite>
          </div>
        </section>

        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Tailoring</span>
            <span>Silk</span>
            <span>Designer Wear</span>
            <span>Boutique</span>
            <span>Bangalore</span>
            <span>Tailoring</span>
            <span>Silk</span>
            <span>Designer Wear</span>
            <span>Boutique</span>
            <span>Bangalore</span>
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
            <p className="eyebrow">Personal styling</p>
            <h2>Book a Fashion Consultation</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              One-to-one styling with our Bangalore atelier — in store or by
              appointment.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Schedule a Boutique Visit <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                A luxury women&apos;s fashion boutique in Bangalore — designer
                wear, boutique clothing, and custom styling since 2014.
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
              <h4>Fashion</h4>
              <a href="#lookbook">Lookbook</a>
              <br />
              <a href="#lookbook">Ready-to-Wear</a>
              <br />
              <a href="/contact">Custom Styling</a>
              <br />
              <a href="/contact">Fashion Consultation</a>
            </div>
            <div>
              <h4>Visit</h4>
              <a href="/contact">Book Appointment</a>
              <br />
              <a href="/contact">Sizing &amp; Fitting</a>
              <br />
              <a href="/contact">Alterations</a>
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
