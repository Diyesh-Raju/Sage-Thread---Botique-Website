import "../fashion.css";
import Header from "@/components/Header";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";

export const metadata = {
  title: "Women's Fashion & Designer Wear Bangalore",
  description:
    "Explore designer wear, contemporary fashion & boutique clothing at Sage Thread — Bangalore's luxury women's fashion boutique in Indiranagar.",
  alternates: { canonical: `${SITE_URL}/fashion` },
  openGraph: {
    title: "Women's Fashion & Designer Wear | Sage Thread Boutique Bangalore",
    description:
      "Curated designer dresses, contemporary fashion & boutique styling at Sage Thread — your women's fashion destination in Bengaluru.",
    url: `${SITE_URL}/fashion`,
  },
};

export const viewport = { themeColor: "#160f15" };

export default function FashionPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Women's Fashion", url: `${SITE_URL}/fashion` },
        ])}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Italiana&family=Montserrat:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/fashion-hero.jpg" />

      <Header />

      <main>
        <section className="hero">
          <div className="hero__media">
            <img
              className="kenburns"
              src="/assets/img/fashion-hero.jpg"
              alt="Designer women's fashion at Sage Thread Boutique Bangalore"
              title="Designer Wear — Sage Thread Bangalore"
            />
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              Women&apos;s Fashion · Bangalore
            </p>
            <h1 className="hero__title" data-stagger style={{ "--sd": ".22s" }}>
              Designer wear
              <br />
              <span className="script">for her</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              Sculptural tailoring and fluid fabric — a wardrobe edited for the
              Bangalore woman who wears confidence, not just trends.
            </p>
            <div className="mt-2" data-stagger style={{ "--sd": ".58s" }}>
              <a href="#lookbook" className="btn btn--solid">
                Explore Our Collection <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
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
    </>
  );
}
