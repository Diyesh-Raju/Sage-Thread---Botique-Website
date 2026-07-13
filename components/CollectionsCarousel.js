"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import "./CollectionsCarousel.css";

/* "Our Collections" — a peek-stack carousel modelled on the Zoya homepage.
   A large featured card sits at the left; the next cards peek from the right,
   smaller and lower. On advance, the featured card slides LEFT and fades out
   *behind* the incoming card, while a fresh card rises in from the right.

   The whole thing is driven by one `active` index: each card's visual slot is
   its position *relative* to `active`, so a single set of CSS classes animates
   every transition (transforms + opacity only → GPU-cheap, smooth everywhere).

      rel 0        → featured (front, left)
      rel 1        → first peek (right)
      rel 2        → second peek (right edge, clipped)
      rel n-1      → the just-left featured, exiting to the left, fading
      everything else → parked off-stage right, invisible                    */
export default function CollectionsCarousel({ items, interval = 4200 }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  const go = useCallback((idx) => setActive(((idx % n) + n) % n), [n]);
  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const prev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  // autoplay — pauses on hover/focus and when the tab is hidden
  useEffect(() => {
    if (!interval) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) next();
    }, interval);
    return () => clearInterval(id);
  }, [interval, next]);

  const slot = (rel) => {
    if (rel === 0) return "is-featured";
    if (rel === 1) return "is-peek1";
    if (rel === 2) return "is-peek2";
    if (rel === n - 1) return "is-exit";
    return "is-hidden";
  };

  return (
    <div className="cc">
      <div className="cc-head">
        <p className="eyebrow">Curated wardrobes</p>
        <h2 className="cc-title">
          Our
          <br />
          Collections
        </h2>
        <p className="cc-sub">
          Six worlds of design — from high jewellery to modern tailoring.
        </p>
      </div>

      <div
        className="cc-stage"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
      >
        {items.map((it, i) => {
          const rel = (i - active + n) % n;
          return (
            <a
              key={it.name}
              className={"cc-card " + slot(rel)}
              href="/contact"
              aria-hidden={rel > 2}
              tabIndex={rel === 0 ? 0 : -1}
            >
              <img
                src={it.img}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                style={it.pos ? { objectPosition: it.pos } : undefined}
              />
              <span className="cc-card__scrim" aria-hidden="true" />
              <span className="cc-card__cap">
                <span className="cc-card__name">{it.name}</span>
                <span className="cc-card__explore">
                  Explore <span className="arrow">→</span>
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <div className="cc-nav">
        <button type="button" className="cc-arrow" aria-label="Previous collection" onClick={prev}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="cc-dots">
          {items.map((it, d) => (
            <button
              key={it.name}
              type="button"
              className={"cc-dot" + (d === active ? " is-active" : "")}
              aria-label={`Show ${it.name}`}
              aria-current={d === active}
              onClick={() => go(d)}
            />
          ))}
        </div>
        <button type="button" className="cc-arrow" aria-label="Next collection" onClick={next}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
