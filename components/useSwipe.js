"use client";

import { useEffect, useRef } from "react";

/* Horizontal swipe for the carousels.

   Built on Pointer Events so one code path covers finger, stylus and mouse
   drag. Two things make it behave on a phone:

   - We only claim the gesture once it is clearly horizontal (dx beats dy).
     Until then the browser keeps the touch, so a vertical flick still scrolls
     the page at native speed instead of being swallowed by the carousel.
   - The element should set `touch-action: pan-y` so the browser never waits on
     us to decide whether a vertical scroll may start (no 300ms stall).

   Returns a ref to attach to the swipe surface. */
export default function useSwipe({ onNext, onPrev, threshold = 45 } = {}) {
  const ref = useRef(null);
  // keep the latest callbacks without re-binding listeners every render
  const handlers = useRef({ onNext, onPrev });
  handlers.current = { onNext, onPrev };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let active = false;   // a pointer is down
    let claimed = false;  // we decided this gesture is a horizontal swipe
    let done = false;     // already fired for this gesture

    const down = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      startX = e.clientX;
      startY = e.clientY;
      active = true;
      claimed = false;
      done = false;
    };

    const move = (e) => {
      if (!active || done) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!claimed) {
        // let a vertical intent go to the page untouched
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
          active = false;
          return;
        }
        if (Math.abs(dx) < 10) return;
        claimed = true;
      }
      if (Math.abs(dx) >= threshold) {
        done = true;
        active = false;
        if (dx < 0) handlers.current.onNext?.();
        else handlers.current.onPrev?.();
      }
    };

    let swipedAt = 0;
    const end = () => {
      if (claimed) swipedAt = Date.now();
      active = false;
      claimed = false;
    };

    // A card is usually a link. Swiping across one must not also open it, so
    // swallow the click that follows a gesture we claimed.
    const clickGuard = (e) => {
      if (Date.now() - swipedAt < 350) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", down, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerup", end, { passive: true });
    el.addEventListener("pointercancel", end, { passive: true });
    el.addEventListener("pointerleave", end, { passive: true });
    el.addEventListener("click", clickGuard, true);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("pointerleave", end);
      el.removeEventListener("click", clickGuard, true);
    };
  }, [threshold]);

  return ref;
}
