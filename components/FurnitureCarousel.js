"use client";

import { useState } from "react";
import "./FurnitureCarousel.css";

/* Furniture piece showcase: product image on the left, name + description on
   the right, with 6 dots and an arrow button on each side to step through the
   pieces. Placeholder pieces for now — swap `img`/copy when the real ones land. */
export default function FurnitureCarousel({ items }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (idx) => setI((idx + n) % n);
  const cur = items[i];

  return (
    <div className="fc">
      <div className="fc-media" key={"m" + i}>
        <img src={cur.img} alt={cur.name} loading="lazy" decoding="async" />
      </div>

      <div className="fc-panel">
        <div className="fc-content" key={"c" + i}>
          <p className="eyebrow">{cur.eyebrow}</p>
          <h3 className="fc-name">{cur.name}</h3>
          <p className="fc-desc">{cur.desc}</p>
          <a className="fc-link" href="/contact">
            Explore now <span className="arrow">→</span>
          </a>
        </div>

        <div className="fc-nav">
          <button
            type="button"
            className="fc-arrow"
            aria-label="Previous piece"
            onClick={() => go(i - 1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="fc-dots">
            {items.map((_, d) => (
              <button
                key={d}
                type="button"
                className={"fc-dot" + (d === i ? " is-active" : "")}
                aria-label={`Go to piece ${d + 1}`}
                aria-current={d === i}
                onClick={() => go(d)}
              />
            ))}
          </div>

          <button
            type="button"
            className="fc-arrow"
            aria-label="Next piece"
            onClick={() => go(i + 1)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
