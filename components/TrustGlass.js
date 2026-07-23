"use client";

/* Two glass sections above the FAQ:
   1. Three frosted "promise" cards (icon + title + copy).
   2. A testimonial carousel floated on the ruby portrait backdrop — one box
      that cycles through several reviews. On each change a gold line wipes
      right-to-left across the content and the new review is revealed behind it;
      dots at the foot let a visitor pick a review by hand. The stage is a fixed
      height so the box itself never changes size or shape between reviews.

   Both use the shared .glass surface (see TrustGlass.css) for the Apple
   liquid-glass look — frosted blur, a glossy top sheen and a bubbly radius.

   The copy here is ORIGINAL placeholder written for Sage Thread — not lifted
   from any other site. Swap the reviews for genuine ones, and
   /assets/img/testimonial-ruby.jpg for a photograph you hold the rights to,
   before this goes live. */

import { useEffect, useState } from "react";
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

/* Original placeholder reviews — replace with genuine ones before launch. */
const REVIEWS = [
  {
    stars: 5,
    quote:
      "From the first fitting to the final piece, every visit felt made for me. The craftsmanship is exquisite — and the styling turned a good outfit into the one I'll always remember.",
    by: "Ananya R. · Bengaluru",
  },
  {
    stars: 5,
    quote:
      "I came in for a single saree and left feeling understood. They fussed over the fall of every pleat, and the blouse fit like it was drawn onto me.",
    by: "Meera S. · Chennai",
  },
  {
    stars: 5,
    quote:
      "An alteration turned a dress I'd almost returned into the thing I reach for first. Quiet, patient, precise — exactly what luxury should feel like.",
    by: "Rhea K. · Mumbai",
  },
  {
    stars: 5,
    quote:
      "My husband's wedding sherwani was faultless three fittings in and still ahead of time. The tailoring is impeccable, and the people even more so.",
    by: "Aditya N. · Hyderabad",
  },
  {
    stars: 5,
    quote:
      "Every gemstone was explained and every setting shown to me before it was set. I have never trusted a jeweller quite this completely.",
    by: "Priya M. · Bengaluru",
  },
];

const INTERVAL = 5600;

export default function TrustGlass() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((n) => (n + 1) % REVIEWS.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused]);

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

      {/* ── testimonial carousel on the ruby portrait ── */}
      <section className="rubyquote" aria-label="What our clients say">
        <img
          className="rubyquote__bg"
          src="/assets/img/testimonial-ruby.jpg"
          alt="Model wearing a ruby and diamond necklace and earrings — high jewellery at Sage Thread Boutique Bangalore"
          loading="lazy"
          decoding="async"
        />
        <div className="rubyquote__scrim" aria-hidden="true" />

        <figure
          className="rubyquote__card glass glass--dark"
          data-reveal="scale"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="rubyquote__eyebrow">In Their Words</p>

          {/* every review is rendered so the stage is always as tall as the
              longest one — the box then never resizes as reviews cycle */}
          <div className="rubyquote__stage">
            {REVIEWS.map((rv, n) => (
              <div
                key={n}
                className={"rubyquote__slide" + (n === active ? " is-on" : "")}
                aria-hidden={n === active ? undefined : true}
              >
                <div
                  className="rubyquote__stars"
                  role="img"
                  aria-label={`Rated ${rv.stars} out of 5`}
                >
                  {Array.from({ length: rv.stars }).map((_, s) => (
                    <svg key={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={STAR} />
                    </svg>
                  ))}
                </div>
                <blockquote className="rubyquote__quote">{rv.quote}</blockquote>
                <figcaption className="rubyquote__by">{rv.by}</figcaption>
              </div>
            ))}
            {/* the gold line that wipes right-to-left as the review changes */}
            <span className="rubyquote__sweep" key={active} aria-hidden="true" />
          </div>

          <div className="rubyquote__dots" role="tablist" aria-label="Choose a review">
            {REVIEWS.map((_, n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={n === active}
                aria-label={`Review ${n + 1}`}
                className={"rubyquote__dot" + (n === active ? " is-on" : "")}
                onClick={() => setActive(n)}
              />
            ))}
          </div>
        </figure>
      </section>
    </>
  );
}
