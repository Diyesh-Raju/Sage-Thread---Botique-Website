import "../marble.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Marble — Sage Thread Boutique",
  description:
    "Quarried marble and natural stone — Calacatta, Carrara, Nero and more, cut and finished for floors, surfaces and sculpture.",
};

export const viewport = { themeColor: "#1b2124" };

export default function MarblePage() {
  const year = new Date().getFullYear();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Header />

      <main>
        {/* Hero (SVG marble texture) */}
        <section className="hero">
          <div className="hero__media">
            <div
              className="kenburns marble-hero-bg"
              style={{ position: "absolute", inset: 0 }}
            ></div>
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              The Stone House
            </p>
            <h1 className="hero__title" data-stagger style={{ "--sd": ".22s" }}>
              Quarried
              <br />
              <span className="script">light</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              Marble and natural stone — drawn from the earth, cut with patience,
              finished to last centuries.
            </p>
            <div className="mt-2" data-stagger style={{ "--sd": ".58s" }}>
              <a href="#swatches" className="btn btn--solid">
                Explore the stones <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        {/* Intro */}
        <section className="section">
          <div className="container split">
            <div className="feature__media" data-reveal="left">
              <div className="media" data-img>
                <img
                  src="/assets/img/marble-arch.jpg"
                  alt="A sculptural stone staircase"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature__badge">
                <span className="script">Book-matched</span>
                <small>slabs cut from a single block</small>
              </div>
            </div>
            <div data-reveal="right">
              <p className="eyebrow">A material with memory</p>
              <h2 style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)" }}>
                Each vein is
                <br />a million years
              </h2>
              <p className="lead mt-2 measure">
                No two slabs are alike. We hand-select blocks at the quarry and
                book-match the cuts, so the stone in your home carries a pattern
                that exists nowhere else on earth.
              </p>
              <p className="mt-2 measure" style={{ color: "var(--muted)" }}>
                Floors, surfaces, basins and sculpture — fabricated to the
                millimetre by our stoneworkers.
              </p>
            </div>
          </div>
        </section>

        {/* Swatches */}
        <section className="section section--tight" id="swatches">
          <div className="container">
            <div className="sec-head sec-head--row">
              <div data-reveal>
                <p className="eyebrow">The palette</p>
                <h2>Our stones</h2>
              </div>
              <p
                className="measure-sm"
                data-reveal
                style={{ "--d": ".1s", color: "var(--muted)" }}
              >
                Six signature marbles, each with its own temperament — from
                luminous white to deep, dramatic black.
              </p>
            </div>
            <div className="swatches">
              <div className="swatch" data-reveal data-tilt>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-calacatta.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Calacatta Oro</h3>
                  <small>White · Gold vein</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".08s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-carrara.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Carrara</h3>
                  <small>White · Soft grey</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".16s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-statuario.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Statuario</h3>
                  <small>Bright · Charcoal</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-nero.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Nero Oro</h3>
                  <small>Black · Gold vein</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".08s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-emperador.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Emperador</h3>
                  <small>Brown · Cream</small>
                </div>
              </div>
              <div className="swatch" data-reveal data-tilt style={{ "--d": ".16s" }}>
                <div
                  className="swatch__tex"
                  style={{
                    backgroundImage: "url('/assets/img/marble-verde.svg')",
                  }}
                ></div>
                <div className="swatch__cap">
                  <h3>Verde Alpi</h3>
                  <small>Green · White</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video feature */}
        <section className="section">
          <div className="container split">
            <div data-reveal="left">
              <p className="eyebrow">From block to surface</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)" }}>
                Cut, honed,
                <br />
                polished, placed
              </h2>
              <p className="lead mt-2 measure">
                We follow each slab from the quarry face to your floor — sawn to
                size, the edges profiled, the surface honed matte or
                mirror-polished to your finish.
              </p>
              <div className="finishes mt-2">
                <div className="finish" data-reveal>
                  <div className="finish__row">
                    <h3>Polished</h3>
                    <span className="idx">01</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    A high-gloss mirror that deepens the colour and vein.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".06s" }}>
                  <div className="finish__row">
                    <h3>Honed</h3>
                    <span className="idx">02</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    A soft matte surface, contemporary and tactile.
                  </p>
                </div>
                <div className="finish" data-reveal style={{ "--d": ".12s" }}>
                  <div className="finish__row">
                    <h3>Brushed</h3>
                    <span className="idx">03</span>
                  </div>
                  <p style={{ color: "var(--muted)" }}>
                    Lightly textured — warm underfoot, naturally anti-slip.
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
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src="/assets/video/marble-clip.webm" type="video/webm" />
                <source src="/assets/video/marble-clip.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Band */}
        <section className="band section">
          <div className="band__bg">
            <img
              src="/assets/img/marble-context1.jpg"
              alt=""
              data-parallax="0.12"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <blockquote data-reveal>
              “I saw the angel in the marble and carved until I set him free.”
            </blockquote>
            <cite data-reveal style={{ "--d": ".15s" }}>
              — Michelangelo
            </cite>
          </div>
        </section>

        <div className="marquee" aria-hidden="true" data-reveal="fade">
          <div className="marquee__track">
            <span>Calacatta</span>
            <span>Carrara</span>
            <span>Statuario</span>
            <span>Nero</span>
            <span>Emperador</span>
            <span>Verde</span>
            <span>Calacatta</span>
            <span>Carrara</span>
            <span>Statuario</span>
            <span>Nero</span>
            <span>Emperador</span>
            <span>Verde</span>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Stone consultation</p>
            <h2>Planning a project in stone?</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              Bring your drawings — we’ll match the marble and fabricate to fit.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Request a quote <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                Quarried marble and natural stone, hand-selected and fabricated
                to last centuries.
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
              <h4>Marble</h4>
              <a href="#swatches">Stones</a>
              <br />
              <a href="#swatches">Finishes</a>
              <br />
              <a href="/contact">Fabrication</a>
              <br />
              <a href="/contact">Samples</a>
            </div>
            <div>
              <h4>Project</h4>
              <a href="/contact">Consultation</a>
              <br />
              <a href="/contact">Trade</a>
              <br />
              <a href="/contact">Care guide</a>
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
