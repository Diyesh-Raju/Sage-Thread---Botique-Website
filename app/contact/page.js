import "../contact.css";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { BUSINESS, SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

export const metadata = PAGE_SEO.contact;

export const viewport = { themeColor: "#0a1410" };

export default function ContactPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            path: "/contact",
            name: "Visit Sage Thread | Book a Private Viewing",
            description: PAGE_SEO.contact.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Contact", url: `${SITE_URL}/contact` },
          ]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Marcellus&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/contact-hero.jpg" />

      <Header />

      <main>
        <section className="hero" style={{ minHeight: "72svh" }}>
          <div className="hero__media">
            <img
              className="kenburns"
              src="/assets/img/contact-hero.jpg"
              alt="Inside Sage Thread Boutique — women's fashion store in Indiranagar, Bangalore"
              title="Visit Sage Thread Boutique Bangalore"
            />
          </div>
          <div className="hero__inner container">
            <p className="eyebrow" data-stagger style={{ "--sd": ".1s" }}>
              Indiranagar · Bengaluru
            </p>
            <h1
              className="hero__title"
              data-stagger
              style={{ "--sd": ".22s", fontSize: "clamp(2.6rem,8vw,7rem)" }}
            >
              Schedule a <span className="script">boutique visit</span>
            </h1>
            <p className="hero__sub" data-stagger style={{ "--sd": ".42s" }}>
              Book a fashion consultation, plan a custom outfit, or walk into
              our Bangalore boutique for a personal styling experience.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container contact-grid">
            <div data-reveal>
              <p className="eyebrow">Connect with our designers</p>
              <h2 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)" }}>
                Tell us about
                <br />
                your perfect look
              </h2>
              <p className="lead mt-1 measure">
                We reply to every enquiry within one business day. Share your
                occasion, style preferences, or custom stitching needs — our
                Bangalore stylists are ready to help.
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
                  <label htmlFor="topic">I&apos;m interested in</label>
                  <select id="topic" name="topic">
                    <option>Designer Wear</option>
                    <option>Women&apos;s Fashion</option>
                    <option>Ethnic Wear</option>
                    <option>Custom Stitching</option>
                    <option>Fashion Consultation</option>
                    <option>Occasion Wear</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="msg">Message</label>
                  <textarea
                    id="msg"
                    name="msg"
                    placeholder="Tell us about your occasion, preferred style, or custom outfit ideas…"
                    required
                  ></textarea>
                </div>
                <button className="btn btn--solid" type="submit">
                  Book a Fashion Consultation <span className="arrow">→</span>
                </button>
                <p className="form-note" data-form-note hidden>
                  ✦ Thank you — your message is on its way. We&apos;ll be in
                  touch shortly.
                </p>
              </form>
            </div>

            <div data-reveal="right">
              <div className="info-card">
                <div className="info-row">
                  <span className="ic">◷</span>
                  <div>
                    <h4>Sage Thread Boutique</h4>
                    <p>
                      {BUSINESS.address.street}
                      <br />
                      {BUSINESS.address.cityAlt}, {BUSINESS.address.region}{" "}
                      {BUSINESS.address.postalCode}
                      <br />
                      {BUSINESS.address.countryName}
                    </p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✆</span>
                  <div>
                    <h4>Telephone</h4>
                    <p>
                      <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>
                        {BUSINESS.phoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✉</span>
                  <div>
                    <h4>Email</h4>
                    <p>
                      <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
                    </p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="ic">✦</span>
                  <div>
                    <h4>Private styling sessions</h4>
                    <p>
                      By appointment daily — including evenings. The preferred
                      way to experience our Bangalore boutique.
                    </p>
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
                    <span>11:00 – 17:00</span>
                  </div>
                </div>
                <div className="socials mt-2">
                  <a href={BUSINESS.social.instagram}>Instagram</a>
                  <a href={BUSINESS.social.pinterest}>Pinterest</a>
                  <a href="/#faq">FAQ</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--tight">
          <div className="container">
            <div className="sec-head" data-reveal>
              <p className="eyebrow">Find us</p>
              <h2>Your boutique near me in Bangalore</h2>
              <p className="measure-sm mt-2" style={{ color: "var(--muted)" }}>
                Sage Thread Boutique is in Indiranagar — centrally located for
                women across Bengaluru searching for a designer boutique, ethnic
                wear, or custom women&apos;s clothing near Koramangala, Ulsoor,
                and MG Road.
              </p>
            </div>
            <div className="map-embed" data-reveal="scale">
              <iframe
                title="Map to Sage Thread Boutique — Indiranagar, Bangalore, Karnataka"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${BUSINESS.geo.longitude - 0.012}%2C${BUSINESS.geo.latitude - 0.008}%2C${BUSINESS.geo.longitude + 0.012}%2C${BUSINESS.geo.latitude + 0.008}&layer=mapnik&marker=${BUSINESS.geo.latitude}%2C${BUSINESS.geo.longitude}`}
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Stay close</p>
            <h2>New arrivals &amp; private styling events in Bangalore</h2>
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
                A women&apos;s fashion boutique in Indiranagar, Bangalore —
                designer wear, ethnic clothing, and custom styling in Karnataka.
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
              <h4>Visit</h4>
              <a href="#top">Directions</a>
              <br />
              <a href="/contact">Private Styling</a>
              <br />
              <a href="/contact">Fashion Consultation</a>
              <br />
              <a href="/#faq">FAQ</a>
            </div>
            <div>
              <h4>Connect</h4>
              <a href={BUSINESS.social.instagram}>Instagram</a>
              <br />
              <a href={BUSINESS.social.pinterest}>Pinterest</a>
              <br />
              <a href={`mailto:${BUSINESS.email}`}>Email</a>
              <br />
              <a href={`tel:${BUSINESS.phone.replace(/\s/g, "")}`}>Call Us</a>
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
