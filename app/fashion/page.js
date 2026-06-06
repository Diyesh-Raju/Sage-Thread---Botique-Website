import "../fashion.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Fashion — Sage Thread Boutique",
  description:
    "A considered wardrobe — sculptural tailoring, fluid fabrics and pieces edited for a life of quiet glamour.",
};

export const viewport = { themeColor: "#160f15" };

export default function FashionPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Italiana&family=Montserrat:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/fashion-hero.jpg" />

      <Header active="fashion" />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero__media">
            <img
              className="kenburns"
              src="/assets/img/fashion-hero.jpg"
              alt="A model in a textured couture look"
            />
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              The Atelier
            </p>
            <h1 className="hero__title" data-stagger style={{ "--sd": ".22s" }}>
              Dressed in
              <br />
              <span className="script">intention</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              Sculptural tailoring and fluid fabric — a wardrobe edited for the
              woman who wears the room, not the trend.
            </p>
            <div className="mt-2" data-stagger style={{ "--sd": ".58s" }}>
              <a href="#lookbook" className="btn btn--solid">
                See the lookbook <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        {/* Editorial intro (dark) */}
        <section className="section editorial">
          <div className="container split">
            <div data-reveal>
              <p className="eyebrow">The point of view</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)" }}>
                Fewer things,
                <br />
                worn forever
              </h2>
              <p className="lead mt-2 measure">
                We don’t chase the season. Each piece is chosen for cut, cloth
                and the way it moves — built to outlive the calendar and become a
                signature.
              </p>
              <a
                href="#lookbook"
                className="btn btn--ghost mt-3"
                style={{ color: "#fff" }}
              >
                Explore looks <span className="arrow">→</span>
              </a>
            </div>
            <div className="intro-figs" data-reveal="right">
              <div className="media" data-img>
                <img
                  src="/assets/img/fashion-5.jpg"
                  alt="Tailored coat detail"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="media" data-img style={{ "--d": ".15s" }}>
                <img
                  src="/assets/img/fashion-6.jpg"
                  alt="Denim styling"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Lookbook masonry */}
        <section className="section section--tight" id="lookbook">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">Lookbook</p>
                <h2>The new edit</h2>
              </div>
              <p
                className="measure-sm"
                data-reveal
                style={{ "--d": ".1s", color: "var(--muted)" }}
              >
                A seasonal study in texture, drape and tone — shot on the women
                who wear it best.
              </p>
            </div>
            <div className="lookbook">
              <a className="tile" data-reveal>
                <img
                  src="/assets/img/fashion-1.jpg"
                  alt="Street style duo"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 01</p>
                  <h3>City Tailoring</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".08s" }}>
                <img
                  src="/assets/img/fashion-2.jpg"
                  alt="Portrait in warm light"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 02</p>
                  <h3>Golden Hour</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".16s" }}>
                <img
                  src="/assets/img/fashion-3.jpg"
                  alt="Bold colour study"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 03</p>
                  <h3>Rouge</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".08s" }}>
                <img
                  src="/assets/img/fashion-4.jpg"
                  alt="Desert editorial"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">Look 04</p>
                  <h3>Saffron</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".16s" }}>
                <img
                  src="/assets/img/fashion-rack.jpg"
                  alt="Curated rail of garments"
                  loading="lazy"
                  decoding="async"
                />
                <span className="plus">→</span>
                <div className="tile__cap">
                  <p className="meta">In store</p>
                  <h3>The Rail</h3>
                </div>
              </a>
              <a className="tile" data-reveal style={{ "--d": ".24s" }}>
                <img
                  src="/assets/img/fashion-feature.jpg"
                  alt="Atelier still life"
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

        {/* Video feature */}
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
              >
                <source src="/assets/video/fashion-clip.webm" type="video/webm" />
                <source src="/assets/video/fashion-clip.mp4" type="video/mp4" />
              </video>
              <div className="video-feature__cap">
                <p className="eyebrow" style={{ color: "#fff" }}>
                  Film · SS Campaign
                </p>
                <h2 style={{ color: "#fff", fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                  In bloom
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Band */}
        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/fashion-4.jpg"
              alt=""
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              “Elegance is the only beauty that never fades.”
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Audrey Hepburn
            </cite>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>Tailoring</span>
            <span>Silk</span>
            <span>Knitwear</span>
            <span>Atelier</span>
            <span>Couture</span>
            <span>Tailoring</span>
            <span>Silk</span>
            <span>Knitwear</span>
            <span>Atelier</span>
            <span>Couture</span>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta">
            <p className="eyebrow">Personal styling</p>
            <h2>Book a private fitting</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              One-to-one styling with our atelier, in store or by appointment.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Request an appointment <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                A considered wardrobe of sculptural tailoring and fluid fabric,
                edited to last.
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
              <h4>Fashion</h4>
              <a href="#lookbook">Lookbook</a>
              <br />
              <a href="#lookbook">Ready-to-wear</a>
              <br />
              <a href="#lookbook">Accessories</a>
              <br />
              <a href="/contact">Styling</a>
            </div>
            <div>
              <h4>Client</h4>
              <a href="/contact">Appointments</a>
              <br />
              <a href="/contact">Sizing</a>
              <br />
              <a href="/contact">Returns</a>
              <br />
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {year} Sage Thread Boutique</span>
            <span>Crafted with care · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
