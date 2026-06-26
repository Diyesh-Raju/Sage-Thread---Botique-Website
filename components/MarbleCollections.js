"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MARBLE_COLLECTIONS } from "./marbleCollectionsData";

/* "Curated Collections" — a MCI-style coverflow carousel placed right after the
   pinned intro/video box. The centre card is featured (large, with a title +
   tagline overlay); two smaller cards flank it with a gap, and two more peek in
   at the edges. A circular arrow sits in the gap between the near and far cards
   on each side. Hovering any card tilts it forward in 3D (brewery-icon style);
   clicking a card opens that collection's own detail page. The section carries
   id="curated" so the detail page's "All collections" link can scroll back here. */

const DETAIL_BASE = "/marble/collection";

export default function MarbleCollections() {
  const [i, setI] = useState(0);
  const sectionRef = useRef(null);
  const n = MARBLE_COLLECTIONS.length;
  const go = (idx) => setI((idx + n) % n);

  // Arriving from a detail page's "All collections" link (/marble#curated):
  // Next's App Router doesn't reliably scroll to the hash across a page change,
  // so bring this section into view ourselves once it has mounted/laid out.
  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#curated") return;
    const id = setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(id);
  }, []);

  // signed shortest distance from the active card (wraps around the ring)
  const rel = (k) => {
    let d = k - i;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  // Glass-card 3D tilt: the card rotates in 3D toward the cursor as it moves
  // over it, and springs flat on leave. Driven straight on the DOM node so it
  // tracks the pointer without re-rendering. Only the tilt changes — size,
  // text, colour and the click-through to the detail page are untouched.
  const TILT_MAX = 14; // degrees of rotation at the card's edge
  const tiltMove = (e) => {
    const card = e.currentTarget.querySelector(".mci-card");
    if (!card) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transition = "transform .08s ease-out";
    card.style.transform =
      `perspective(900px) rotateX(${(-py * TILT_MAX * 2).toFixed(2)}deg) ` +
      `rotateY(${(px * TILT_MAX * 2).toFixed(2)}deg) translateY(-10px) scale(1.05)`;
  };
  const tiltReset = (e) => {
    const card = e.currentTarget.querySelector(".mci-card");
    if (!card) return;
    card.style.transition = ""; // fall back to the CSS spring-back
    card.style.transform = "";
  };

  return (
    <section className="mci" id="curated" ref={sectionRef} data-reveal="fade">
      <div className="container">
        <h2 className="mci__title">Curated Collections</h2>

        <div className="mci__stage">
          <button
            type="button"
            className="mci__arrow mci__arrow--prev"
            aria-label="Previous collection"
            onClick={() => go(i - 1)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="mci__track">
            {MARBLE_COLLECTIONS.map((c, k) => {
              const d = rel(k);
              const ad = Math.abs(d);
              const pos =
                d === 0 ? "is-center" : ad === 1 ? "is-near" : ad === 2 ? "is-far" : "is-hidden";
              const interactive = pos !== "is-hidden";

              return (
                <div
                  key={c.slug}
                  className={`mci__slot ${pos}`}
                  style={{ "--d": d }}
                  aria-hidden={!interactive}
                >
                  <Link
                    className="mci__hit"
                    href={`${DETAIL_BASE}/${c.slug}`}
                    tabIndex={interactive ? 0 : -1}
                    aria-label={`Open the ${c.name} collection`}
                    onMouseMove={interactive ? tiltMove : undefined}
                    onMouseLeave={interactive ? tiltReset : undefined}
                  >
                    <div className="mci-card">
                      <img
                        className="mci-card__img"
                        src={c.img}
                        alt={`${c.name} — curated collection at Sage Thread Boutique`}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="mci-card__sheen" aria-hidden="true" />
                      <div className="mci-card__cap">
                        <h3>{c.name}</h3>
                        <small>{c.tagline}</small>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            className="mci__arrow mci__arrow--next"
            aria-label="Next collection"
            onClick={() => go(i + 1)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
