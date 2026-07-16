"use client";

/* Sticky-card stack scroll effect (Skiper34 / StickyCard_003), ported to JS
   and laid out as a split: a pinned heading + text on the LEFT, the big
   scaling/rotating card stack pinned to the RIGHT.  Lenis smooth-scroll from
   the original is intentionally omitted so it can't hijack the rest of the
   page's scroll (hero, reel, IntersectionObserver reveals). */

import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./LookStack.css";

const images = [
  "/assets/img/fashion-5.jpg",
  "/assets/img/fashion-6.jpg",
  "/assets/img/fashion-3.jpg",
  "/assets/img/collection-traditional.jpg",
  "/assets/img/collection-modern.jpg",
  "/assets/img/fashion-rack.jpg",
  "/assets/img/collection-timeless.jpg",
];

export default function LookStack() {
  return (
    <section className="lookstack">
      <div className="lookstack__intro">
        <p className="lookstack__eyebrow">Scroll to explore</p>
        <h2 className="lookstack__title">
          The Collection,
          <br />
          in Motion
        </h2>
        <p className="lookstack__text">
          A frame-by-frame edit of the season — each piece rises, holds, and
          gives way to the next as you move through the story.
        </p>
      </div>

      <div className="lookstack__cards">
        {images.map((img, idx) => (
          <StickyCard key={idx} imgUrl={img} />
        ))}
      </div>
    </section>
  );
}

function StickyCard({ imgUrl }) {
  const vertMargin = 10;
  const container = useRef(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);

  // scale is driven manually (below) rather than via a scrollY transform, so
  // the initial maxScrollY = Infinity can't produce a degenerate NaN range.
  const scale = useMotionValue(1);
  const filter = useMotionValue(0);
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({ target: container });
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - vertMargin}% 0px`,
    once: true,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    let animationValue = 1;
    if (y > maxScrollY) {
      animationValue = Math.max(0, 1 - (y - maxScrollY) / 10000);
    }
    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="lookstack__card"
      style={{
        scale: scale,
        rotate: filter,
        height: `${100 - 2 * vertMargin}vh`,
        top: `${vertMargin}vh`,
      }}
    >
      <motion.img
        src={imgUrl}
        alt=""
        style={{ rotate: negateFilter }}
        className="lookstack__img"
        sizes="60vw"
      />
    </motion.div>
  );
}
