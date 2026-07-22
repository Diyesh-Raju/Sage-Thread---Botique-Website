"use client";

/* Sticky card stack (Skiper34), ported to JS + plain CSS.
   Each frame pins itself below the header and holds there while the next one
   climbs over it, shrinking and tilting as it goes. The photo inside tilts by
   the same angle the other way, so it stays upright while the frame turns —
   the frame reads as an aperture rotating over a still image.
   Lenis from the original is intentionally omitted, as in FashionParallax:
   a global smooth-scroll would hijack the hero, the reels and every
   IntersectionObserver reveal on this page. */

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import "./EditorialStack.css";

/* Placeholders — swap the seven files in /public/assets/img for the real
   shoot and nothing else needs to change. */
const SHOTS = [
  {
    src: "/assets/img/editorial-1.jpg",
    alt: "Model in a sheer black top against a charcoal studio wall — editorial womenswear at Sage Thread Boutique Bangalore",
    title: "Editorial — Sage Thread",
  },
  {
    src: "/assets/img/editorial-2.jpg",
    alt: "Cream blouses and knits on wooden hangers — the atelier rail at Sage Thread Boutique Bangalore",
    title: "The Atelier Rail — Sage Thread",
  },
  {
    src: "/assets/img/editorial-3.jpg",
    alt: "Wine polka-dot wrap dress caught mid-stride — occasion wear at Sage Thread Boutique Bangalore",
    title: "Occasion Wear — Sage Thread",
  },
  {
    src: "/assets/img/editorial-4.jpg",
    alt: "Open-weave knit beside cotton lace — fabrics sourced for Sage Thread Boutique Bangalore",
    title: "Fabrics — Sage Thread",
  },
  {
    src: "/assets/img/editorial-5.jpg",
    alt: "Ivory floral wrap dress with a woven basket bag by the sea — resort wear at Sage Thread Boutique Bangalore",
    title: "Resort Wear — Sage Thread",
  },
  {
    src: "/assets/img/editorial-6.jpg",
    alt: "Man fastening a shirt cuff beside a leather-strap watch — men's tailoring at Sage Thread Boutique Bangalore",
    title: "Men's Tailoring — Sage Thread",
  },
  {
    src: "/assets/img/editorial-7.jpg",
    alt: "Model in a deep maroon tulle gown on the dunes — couture at Sage Thread Boutique Bangalore",
    title: "Couture — Sage Thread",
  },
];

/* scroll distance a pinned frame takes to shrink from full size to nothing.
   frames sit ~800px apart, so each tilts ~6° as the next one lands on it */
const SHRINK_OVER = 10000;
const MAX_TILT = 80;

/* The upright photo has to overfill the frame, or the frame's corners swing
   out past the picture once it tilts. A 4:3 frame needs cos6.4° + 1.33·sin6.4°
   ≈ 1.14 to stay covered at the angle a frame reaches before the next one hides
   it; anything beyond that is crop for nothing. */
const PHOTO_ZOOM = 1.15;

/* Where a frame sits in the page, independent of scroll. Two traps here, both
   of which bite on a resize part-way down the stack: Chrome folds the sticky
   offset into offsetTop, and a bounding rect additionally carries the shrink
   and the tilt. So measure offsetTop — a layout value, blind to transforms —
   with the frame held static for the read. Sticky changes only where a box
   paints and never where it lays out, so this reflows nothing and cannot
   flash. */
function layoutTop(el) {
  const prev = el.style.position;
  el.style.position = "static";
  let y = 0;
  for (let node = el; node; node = node.offsetParent) y += node.offsetTop;
  el.style.position = prev;
  return y;
}

function Frame({ shot }) {
  const frame = useRef(null);
  /* the scroll position at which this frame reaches its sticky offset */
  const pinAt = useRef(Infinity);

  const scale = useMotionValue(1);
  const tilt = useTransform(scale, (s) => (1 - s) * MAX_TILT);
  const untilt = useTransform(tilt, (t) => -t);

  const { scrollY } = useScroll();

  useEffect(() => {
    const el = frame.current;
    if (!el) return;

    /* the shrink-and-tilt is the whole effect, so reduced motion just leaves
       the frames pinning plainly over one another */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = () => {
      const past = scrollY.get() - pinAt.current;
      scale.set(past > 0 ? Math.max(0, 1 - past / SHRINK_OVER) : 1);
    };

    const measure = () => {
      const stickyTop = parseFloat(getComputedStyle(el).top) || 0;
      pinAt.current = layoutTop(el) - stickyTop;
      apply();
    };

    measure();
    const stop = scrollY.on("change", apply);
    window.addEventListener("resize", measure);
    return () => {
      stop();
      window.removeEventListener("resize", measure);
    };
  }, [scale, scrollY]);

  return (
    <motion.div className="estack__frame" ref={frame} style={{ scale, rotate: tilt }}>
      <motion.img
        src={shot.src}
        alt={shot.alt}
        title={shot.title}
        style={{ rotate: untilt, scale: PHOTO_ZOOM }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}

export default function EditorialStack() {
  return (
    <section className="estack" aria-label="Sage Thread fashion editorial">
      <div className="estack__intro">
        <p className="eyebrow" data-reveal>
          Editorial
        </p>
        <h2 data-reveal style={{ "--d": ".1s" }}>
          The season, frame by frame
        </h2>
      </div>

      {SHOTS.map((shot) => (
        <Frame key={shot.src} shot={shot} />
      ))}

      {/* a sticky child pins only as far as its parent's content box, so the
          last frame needs a little floor under it to hold on for a beat */}
      <div className="estack__tail" aria-hidden="true" />
    </section>
  );
}
