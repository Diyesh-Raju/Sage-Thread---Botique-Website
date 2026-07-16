"use client";

import { useState, useCallback } from "react";
import "./TheLook.css";

/* "The Look" — a Loro Piana-style shop-the-look split.
   Left: a full-length photo of the finished outfit (fixed).
   Right: a centred product-card carousel — one piece of that outfit at a
   time, with the neighbouring pieces peeking in from either side and round
   arrows flanking the card. The active piece's name + fabric sit beneath. */
export default function TheLook({ look, pieces }) {
  const n = pieces.length;
  const [active, setActive] = useState(0);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  const slot = (rel) => {
    if (rel === 0) return "is-active";
    if (rel === 1) return "is-next";
    if (rel === n - 1) return "is-prev";
    return "is-hidden";
  };

  const current = pieces[active];

  return (
    <section className="the-look" aria-label="Shop the look">
      <div className="the-look__figure">
        <img src={look.img} alt={look.alt} loading="lazy" decoding="async" />
      </div>

      <div className="the-look__panel">
        <h2 className="the-look__title">The Look</h2>
        <span className="the-look__tick" aria-hidden="true" />

        <div className="the-look__stage">
          <button
            type="button"
            className="the-look__arrow the-look__arrow--prev"
            aria-label="Previous piece"
            onClick={prev}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="the-look__track">
            {pieces.map((p, i) => {
              const rel = (i - active + n) % n;
              return (
                <div
                  key={p.name}
                  className={"the-look__card " + slot(rel)}
                  aria-hidden={rel !== 0}
                >
                  <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="the-look__arrow the-look__arrow--next"
            aria-label="Next piece"
            onClick={next}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="the-look__caption" key={current.name}>
          <p className="the-look__name">{current.name}</p>
          <p className="the-look__material">{current.material}</p>
        </div>
      </div>
    </section>
  );
}
