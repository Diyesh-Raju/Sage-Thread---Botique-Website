"use client";

import { useEffect, useRef } from "react";
import "./JewelryReel.css";

/* Fine-jewellery film in a glowing rose-gold "bubble" box, on a full-bleed
   black band. While the box sits in the middle of the viewport we flag the
   page with `body.jewel-view` — that turns the fixed navbar rose gold and
   drops its light backdrop so it reads cleanly over the black section. */
export default function JewelryReel() {
  const inner = useRef(null);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("jewel-view", entry.isIntersecting);
      },
      // active while the box+caption block sits in the central band of the
      // viewport — the page eases to black as the box scrolls in and eases
      // back to the normal light background once it has scrolled past
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      document.body.classList.remove("jewel-view");
    };
  }, []);

  return (
    <section className="jewel-reel" aria-label="Sage Thread fine jewellery film">
      <div className="jewel-backdrop" aria-hidden="true" />
      <div className="jewel-reel__inner" ref={inner}>
        <div className="jewel-reel__frame" data-reveal="scale">
          <video
            className="jewel-reel__video"
            src="/assets/video/jewelry-reel.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            title="Fine jewellery film — Sage Thread Boutique Bangalore"
          />
        </div>
        <p className="jewel-reel__copy" data-reveal style={{ "--d": ".12s" }}>
          Each Sage Thread piece is composed like a private commission — gold
          drawn fine, stones chosen one by one, and light set the way only true
          craftsmanship allows. Jewellery made to be lived in, and remembered.
        </p>
      </div>
    </section>
  );
}
