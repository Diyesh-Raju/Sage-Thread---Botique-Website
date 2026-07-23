/* Two glass sections above the FAQ:
   1. Three frosted "promise" cards (icon + title + copy).
   2. A single testimonial floated on the ruby portrait backdrop.

   Both use the shared .glass surface (see TrustGlass.css) for the Apple
   liquid-glass look — frosted blur, a glossy top sheen and a bubbly radius.

   The copy here is ORIGINAL placeholder written for Sage Thread — not lifted
   from any other site. Swap the testimonial for a genuine customer review, and
   /assets/img/testimonial-ruby.jpg for a photograph you hold the rights to,
   before this goes live. */

import "./TrustGlass.css";

const CARDS = [
  {
    title: "Bespoke Tailoring",
    text: "Cut, fitted and finished to your measure in our Bangalore atelier — because the right fit is what turns clothing into couture.",
    art: (
      <>
        <line x1="15" y1="33" x2="31" y2="17" />
        <circle cx="33" cy="15" r="2.2" />
        <path d="M35 14c4.5 2.5 4 8-1.5 9.5" />
      </>
    ),
  },
  {
    title: "Certified Fine Jewellery",
    text: "Every stone certified and every gram hallmarked, checked by hand before it reaches you. What you're promised is exactly what you wear home.",
    art: (
      <>
        <path d="M14 20 18.5 12H29.5L34 20 24 37Z" />
        <path d="M14 20H34" />
        <path d="M18.5 12 21 20 24 37M29.5 12 27 20 24 37" />
      </>
    ),
  },
  {
    title: "Lifetime Care",
    text: "Cleaning, resizing and repairs for the life of the piece. Bring anything bought from us back, any time, and we'll set it right.",
    art: (
      <>
        <path d="M24 6 38 11V22C38 30.5 32 37.5 24 42 16 37.5 10 30.5 10 22V11Z" />
        <path d="M18.5 23 22 26.5 30 17.5" />
      </>
    ),
  },
];

const STAR =
  "M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77l-5.88 3.09 1.12-6.55L2.5 9.92l6.58-.96z";

export default function TrustGlass() {
  return (
    <>
      {/* ── three promise cards ── */}
      <section className="assure" aria-label="The Sage Thread promise">
        <div className="assure__inner">
          <div className="assure__head">
            <p className="assure__eyebrow" data-reveal>
              Why Sage Thread
            </p>
            <h2 className="assure__title" data-reveal style={{ "--d": ".08s" }}>
              The promise behind <em>every piece</em>
            </h2>
          </div>

          <div className="assure__grid">
            {CARDS.map((c, i) => (
              <article
                key={c.title}
                className="assure__card glass glass--light"
                data-reveal
                style={{ "--d": `${0.12 + i * 0.1}s` }}
              >
                <svg
                  className="assure__icon"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {c.art}
                </svg>
                <h3 className="assure__cardTitle">{c.title}</h3>
                <p className="assure__text">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── testimonial on the ruby portrait ── */}
      <section className="rubyquote" aria-label="What our clients say">
        <img
          className="rubyquote__bg"
          src="/assets/img/testimonial-ruby.jpg"
          alt="Model wearing a ruby and diamond necklace and earrings — high jewellery at Sage Thread Boutique Bangalore"
          loading="lazy"
          decoding="async"
        />
        <div className="rubyquote__scrim" aria-hidden="true" />

        <figure className="rubyquote__card glass glass--dark" data-reveal="scale">
          <p className="rubyquote__eyebrow">In Their Words</p>
          <div className="rubyquote__stars" role="img" aria-label="Rated five out of five">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={STAR} />
              </svg>
            ))}
          </div>
          <blockquote className="rubyquote__quote">
            From the first fitting to the final piece, every visit felt made for
            me. The craftsmanship is exquisite — and the styling turned a good
            outfit into the one I&apos;ll always remember.
          </blockquote>
          <figcaption className="rubyquote__by">Ananya R. · Bengaluru</figcaption>
        </figure>
      </section>
    </>
  );
}
