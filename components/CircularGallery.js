"use client";

import React, { useEffect, useRef } from "react";
import "./CircularGallery.css";

// A simple utility for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

/* Scroll-PINNED 3D circular gallery. The section pins to the viewport and
   scroll progress scrubs the cylinder's rotation from 0deg through -360deg —
   you "scroll across" the carousel until you've come full circle, then the page
   continues. Reversing the scroll reverses the spin.

   Smoothness: instead of binding rotation 1:1 to the scroll position (which
   feels stepped), scroll only sets a *target* angle; a requestAnimationFrame
   loop eases the live angle toward it (inertia/lerp) and writes transforms
   straight to the DOM — no per-frame React re-render. Each card's depth
   (scale + fade + subtle blur) is recomputed from its live angle off-front, so
   the front card reads as the "main" one and the rest recede into the
   background cleanly. */
function CircularGallery({ items, heading, radius, className }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const itemRefs = useRef([]);

  const cur = useRef(0); // live (eased) rotation
  const target = useRef(0); // scroll-derived target rotation
  const raf = useRef(0);
  const running = useRef(false);

  const n = items.length;
  const anglePerItem = n ? 360 / n : 0;

  // Spread the cards so neighbours sit a clean gap apart (half-card = 160px).
  const R =
    radius ??
    Math.round((160 / Math.tan((Math.PI * anglePerItem) / 360)) * 1.45);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const readTarget = () => {
      const rect = wrap.getBoundingClientRect();
      const dist = rect.height - window.innerHeight; // travel while pinned
      let p = dist > 0 ? -rect.top / dist : 0;
      p = Math.min(1, Math.max(0, p));
      target.current = -p * 360;
    };

    const applyDepth = (rot) => {
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const itemAngle = i * anglePerItem;
        // signed angle of this card off the front face, in [-180, 180]
        let rel = (itemAngle + rot) % 360;
        if (rel < -180) rel += 360;
        if (rel > 180) rel -= 360;
        const a = Math.abs(rel) / 180; // 0 = front … 1 = directly behind
        const opacity = 1 - a * 0.72; // 1 → 0.28
        const scale = 1 - a * 0.15; // 1 → 0.85
        // keep the front card and its neighbours crisp; only the cards turned
        // well away (past ~72°) pick up a touch of blur to sit behind
        const blur = a < 0.4 ? 0 : ((a - 0.4) / 0.6) * 2.2;
        el.style.transform = `rotateY(${itemAngle}deg) translateZ(${R}px) scale(${scale.toFixed(
          3
        )})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `blur(${blur.toFixed(2)}px)`;
        el.style.zIndex = String(Math.round(1000 - a * 1000));
      }
    };

    const tick = () => {
      const diff = target.current - cur.current;
      cur.current += diff * 0.1; // ease toward target — the "smooth" follow
      if (Math.abs(diff) < 0.01) cur.current = target.current;
      stage.style.transform = `rotateY(${cur.current}deg)`;
      applyDepth(cur.current);
      if (Math.abs(target.current - cur.current) > 0.01) {
        raf.current = requestAnimationFrame(tick);
      } else {
        running.current = false; // settled — idle until the next scroll
      }
    };

    const ensure = () => {
      if (!running.current) {
        running.current = true;
        raf.current = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      readTarget();
      ensure();
    };
    const onResize = () => {
      readTarget();
      ensure();
    };

    // start settled at the correct angle (no first-paint jump)
    readTarget();
    cur.current = target.current;
    stage.style.transform = `rotateY(${cur.current}deg)`;
    applyDepth(cur.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf.current);
    };
  }, [n, anglePerItem, R]);

  return (
    <div ref={wrapRef} className={cn("cg-pin-wrap", className)}>
      <div className="cg-pin">
        {heading ? <div className="cg-heading">{heading}</div> : null}
        <div className="cg-root" role="region" aria-label="Circular 3D Gallery">
          <div ref={stageRef} className="cg-stage">
            {items.map((item, i) => {
              const itemAngle = i * anglePerItem;
              return (
                <div
                  key={item.photo.url}
                  ref={(el) => (itemRefs.current[i] = el)}
                  role="group"
                  aria-label={item.common}
                  className="cg-item"
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${R}px)`,
                    willChange: "transform, opacity, filter",
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
