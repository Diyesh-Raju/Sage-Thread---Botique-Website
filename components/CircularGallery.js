"use client";

import React, { useState, useEffect, useRef } from "react";
import "./CircularGallery.css";

// A simple utility for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* A scroll-PINNED 3D circular gallery (behaves like the Obsidian Blade home
   gallery): the section pins to the viewport and scroll progress scrubs the
   rotation linearly from 0deg (first card) through -360deg, so you "scroll
   across" the carousel until you've come full circle, then the page continues
   to the next section. Reversing the scroll reverses the spin. No auto-rotate.

   Implemented with plain CSS `position: sticky` over a tall wrapper — no GSAP.
   `heading` is rendered inside the pinned area so it stays put while the cards
   turn. */
function CircularGallery({ items, heading, radius = 600, className }) {
  const wrapRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      // distance the wrapper scrolls while its sticky child stays pinned
      const dist = rect.height - window.innerHeight;
      let progress = dist > 0 ? -rect.top / dist : 0;
      progress = Math.min(1, Math.max(0, progress));
      setRotation(-progress * 360);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const anglePerItem = items.length ? 360 / items.length : 0;

  return (
    <div ref={wrapRef} className={cn("cg-pin-wrap", className)}>
      <div className="cg-pin">
        {heading ? <div className="cg-heading">{heading}</div> : null}
        <div
          className="cg-root"
          role="region"
          aria-label="Circular 3D Gallery"
          style={{ perspective: "2000px" }}
        >
          <div
            className="cg-stage"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((item, i) => {
              const itemAngle = i * anglePerItem;
              const totalRotation = rotation % 360;
              const relativeAngle = (itemAngle + totalRotation + 360) % 360;
              const normalizedAngle = Math.abs(
                relativeAngle > 180 ? 360 - relativeAngle : relativeAngle
              );
              const opacity = Math.max(0.25, 1 - normalizedAngle / 180);

              return (
                <div
                  key={item.photo.url}
                  role="group"
                  aria-label={item.common}
                  className="cg-item"
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                    opacity,
                    transition: "opacity 0.15s linear",
                  }}
                >
                  <div className="cg-card">
                    <img
                      src={item.photo.url}
                      alt={item.photo.text}
                      className="cg-img"
                      style={{ objectPosition: item.photo.pos || "center" }}
                    />
                    <div className="cg-cap">
                      <h3 className="cg-title">{item.common}</h3>
                      <em className="cg-bino">{item.binomial}</em>
                      <p className="cg-by">Photo by: {item.photo.by}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CircularGallery };
