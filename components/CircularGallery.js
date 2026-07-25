"use client";

import React, { useEffect, useRef, useState } from "react";
import "./CircularGallery.css";
import useMediaQuery from "./useMediaQuery";

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
   background cleanly.

   PHONES (<=760px): the scroll-pinned behaviour is desktop-only. Hijacking the
   scroll on a touch screen means several flicks that go nowhere before the page
   moves on, so the phone drops the pin entirely — the section is a normal block
   and the arrows below the ring step through the cards. Same easing, same depth
   maths, just a different thing driving the target angle. */
function CircularGallery({ items, heading, radius, className }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const itemRefs = useRef([]);

  const cur = useRef(0); // live (eased) rotation
  const target = useRef(0); // scroll- or arrow-derived target rotation
  const raf = useRef(0);
  const running = useRef(false);

  // Phone: which card is at the front. A ref, not state — the arrows are
  // always live and the transforms are written straight to the DOM, so moving
  // between cards never needs a re-render.
  const indexRef = useRef(0);
  const goRef = useRef(null);

  // Starts false so the server render and the first client render agree; the
  // effect below flips it on a phone right after mount.
  const isPhone = useMediaQuery("(max-width: 760px)");

  const n = items.length;
  // Keep the per-card spacing fixed to the original 9-card ring, so removing
  // cards leaves the remaining boxes exactly as far apart as before (rather
  // than re-spreading them evenly around the circle).
  const SPACING_COUNT = 9;
  const anglePerItem = 360 / SPACING_COUNT;
  // Sweep only from the first card to the last (Stone Forms), instead of a full
  // 360° loop — so scrolling down settles on the last box and scrolling back up
  // returns to the first.
  const maxRot = (n - 1) * anglePerItem;

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
      target.current = -p * maxRot;
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

    if (isPhone) {
      // Arrows drive the ring; nothing is bound to scroll. Both stay live at
      // every card — back from the first wraps to the last and forward from
      // the last wraps to the first.
      //
      // The wrap rewinds across the other cards rather than carrying on in the
      // same direction, because the ring is only part full: spacing is fixed to
      // a 9-slot circle (see SPACING_COUNT) while there are n cards, so the
      // slots past the last one are empty. Turning "onwards" off the end would
      // sweep through that blank arc; turning back lands on the target card
      // over real ones.
      goRef.current = (dir) => {
        const next = (indexRef.current + dir + n) % n;
        indexRef.current = next;
        target.current = -next * anglePerItem;
        ensure();
      };

      // Settle on whichever card was in front (survives a rotate/resize).
      target.current = -indexRef.current * anglePerItem;
      cur.current = target.current;
      stage.style.transform = `rotateY(${cur.current}deg)`;
      applyDepth(cur.current);

      return () => {
        goRef.current = null;
        cancelAnimationFrame(raf.current);
        running.current = false;
      };
    }

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
      running.current = false;
    };
  }, [n, anglePerItem, R, maxRot, isPhone]);

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
        {isPhone ? (
          <div className="cg-nav">
            <button
              type="button"
              className="cg-arrow"
              aria-label="Previous image"
              onClick={() => goRef.current?.(-1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="cg-arrow"
              aria-label="Next image"
              onClick={() => goRef.current?.(1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { CircularGallery };
