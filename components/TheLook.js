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
  /* the piece we came from rides along with the one we're on, so each card can
     tell how far it is being asked to travel */
  const [{ active, from }, setSlide] = useState({ active: 0, from: 0 });

  const go = useCallback((dir) => {
    setSlide((s) => ({ active: (s.active + dir + n) % n, from: s.active }));
  }, [n]);
  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  const slot = (rel) => {
    if (rel === 0) return "is-active";
    if (rel === 1) return "is-next";
    if (rel === n - 1) return "is-prev";
    return "is-hidden";
  };

  /* where a slot sits along the stage — left of centre, centre, right of it.
     pieces that are off-stage entirely have no place on that line. */
  const place = (rel) => {
    if (rel === 0) return 0;
    if (rel === 1) return 1;
    if (rel === n - 1) return -1;
    return null;
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
              /* A piece only travels when it is stepping to a neighbouring
                 place. With three pieces one of them has to wrap from one edge
                 of the stage to the other each turn, and animating that drags
                 it the whole way across behind the piece on stage. That one is
                 placed without travelling instead: it lands underneath the
                 piece vacating the far edge and is uncovered as that piece
                 moves off, so it reads as having come round the back. */
              const was = place((i - from + n) % n);
              const now = place(rel);
              const travels = was !== null && now !== null && Math.abs(was - now) === 1;
              return (
                <div
                  key={p.name}
                  className={"the-look__card " + slot(rel) + (travels ? "" : " is-cut")}
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
