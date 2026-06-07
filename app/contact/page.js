import "../contact.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Contact — Sage Thread Boutique",
  description:
    "Visit the Sage Thread boutique, book a private viewing, or send us a note. We would love to hear from you.",
};

export const viewport = { themeColor: "#0a1410" };

export default function ContactPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Marcellus&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/contact-hero.jpg" />

      <Header />

      <main>
        {/* Hero (short) */}
        <section className="hero" style={{ minHeight: "72svh" }}>
          <div className="hero__media">
            <img
              className="kenburns"
              src="/assets/img/contact-hero.jpg"
              alt="The boutique interior at dusk"
            />
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              Say hello
            </p>
            <h1
              className="hero__title"
              data-stagger
              style={{ "--sd": ".22s", fontSize: "clamp(2.6rem,8vw,7rem)" }}
            >
              Come <span className="script">visit</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              Book a private viewing, plan a project, or simply drop in for a
              coffee and a wander.
            </p>
          </div>
        </section>

        {/* Contact form + info */}
        <section className="section">
          <div className="container contact-grid">
            <div data-reveal>
              <p className="eyebrow">Send a note</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>
                Tell us what
                <br />
                you’re looking for
              </h2>
              <p className="lead mt-1 measure">
                We reply to every message within one business day.
              </p>
              <form className="mt-3" data-contact-form>
                <div className="split" style={{ gap: "1.3rem" }}>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="topic">I’m interested in</label>
                  <select id="topic" name="topic">
                    <option>Furniture</option>
                    <option>Fashion</option>
                    <option>Marble &amp; stone</option>
                    <option>Interior consultation</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="msg">Message</label>
                  <textarea
                    id="msg"
                    name="msg"
                    placeholder="Tell us a little about your project…"
                    required
                  ></textarea>
                </div>
                <button className="btn btn--solid" type="submit">
                  Send message <span className="arrow">→</span>
                </button>
                <p className="form-note" data-form-note hidden>
                  ✦ Thank you — your message is on its way. We’ll be in touch
                  shortly.
                </p>
              </form>
            </div>

            <div data-reveal="right">
              <div className="info-card">
                <div className="info-row">
                  <span className="ic">◷</span>
                  <div>
                    <h4>The Boutique</h4>
                    <p>
                      18 Rue de la Lumière
                      <br />
                      75004 Paris, France
                    </p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✆</span>
                  <div>
                    <h4>Telephone</h4>
                    <p>+33 1 84 25 09 90</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✉</span>
                  <div>
                    <h4>Email</h4>
                    <p>bonjour@sage-thread-boutique.com</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✦</span>
                  <div>
                    <h4>Private viewings</h4>
                    <p>By appointment, daily — including evenings.</p>
                  </div>
                </div>
              </div>

              <div className="info-card mt-2">
                <h4
                  style={{
                    fontFamily: "var(--font-accent)",
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    fontSize: ".74rem",
                    marginBottom: "1rem",
                  }}
                >
                  Opening hours
                </h4>
                <div className="hours">
                  <div>
                    <span>Monday – Friday</span>
                    <span>10:00 – 19:00</span>
                  </div>
                  <div>
                    <span>Saturday</span>
                    <span>10:00 – 18:00</span>
                  </div>
                  <div>
                    <span>Sunday</span>
                    <span>By appointment</span>
                  </div>
                </div>
                <div className="socials mt-2">
                  <a href="#">Instagram</a>
                  <a href="#">Pinterest</a>
                  <a href="#">Journal</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="section section--tight">
          <div className="container">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Find us</p>
              <h2>In the heart of the Marais</h2>
            </div>
            <div className="map-embed" data-reveal="scale">
              <iframe
                title="Map to the boutique"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.350%2C48.854%2C2.368%2C48.862&layer=mapnik&marker=48.858%2C2.359"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Stay close</p>
            <h2>First looks &amp; private events</h2>
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
                A boutique house of curated furniture, fashion and marble in the
                heart of Paris.
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
              <h4>Visit</h4>
              <a href="#">Directions</a>
              <br />
              <a href="#">Private viewing</a>
              <br />
              <a href="#">Events</a>
              <br />
              <a href="#">Press</a>
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
