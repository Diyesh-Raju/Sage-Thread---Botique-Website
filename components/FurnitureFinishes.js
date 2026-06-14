"use client";

import { useEffect, useState } from "react";

/* "Made to be lived with" intro — pick a wood finish and its photo appears on
   the left. Teak is selected by default; clicking another finish fades its
   sample in and highlights that chip green. */

const WOODS = [
  { name: "Teak", img: "/assets/img/wood-teak.jpg" },
  { name: "Dark Oak", img: "/assets/img/wood-dark-oak.jpg" },
  { name: "Rustic Walnut", img: "/assets/img/wood-rustic-walnut.jpg" },
  { name: "Holly", img: "/assets/img/wood-holly.jpg" },
];

export default function FurnitureFinishes() {
  const [selected, setSelected] = useState(0);
  // The finish shown fully-opaque underneath while the new one fades in on top.
  // Keeping an opaque base means the light page never bleeds through mid-fade.
  const [base, setBase] = useState(0);

  // Preload every finish up front so switching never flashes an unloaded image.
  useEffect(() => {
    WOODS.forEach((w) => {
      const im = new Image();
      im.src = w.img;
    });
  }, []);

  const choose = (i) => {
    if (i === selected) return;
    // Leave the base on the *previous* finish for the whole fade — swapping it
    // mid-fade is what caused the glitch. We promote the new finish to the base
    // only once it has fully faded in (onAnimationEnd), while it's hidden behind
    // the opaque top layer, so the swap is invisible.
    setSelected(i);
  };

  return (
    <section className="section">
      <div className="container split">
        <div className="feature__media" data-reveal>
          <div className="media" data-img style={{ position: "relative" }}>
            {/* Opaque base = the previous finish; prevents any background bleed */}
            <img
              src={WOODS[base].img}
              alt=""
              loading="eager"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Incoming finish fades in over the base on each change */}
            <img
              key={selected}
              src={WOODS[selected].img}
              alt={`${WOODS[selected].name} finish`}
              loading="eager"
              decoding="async"
              onAnimationEnd={() => setBase(selected)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: "finishFade .6s var(--ease)",
                pointerEvents: "none",
              }}
            />
          </div>
          <div className="feature__badge">
            <span className="script">Hand-finished</span>
            <small>by partner ateliers across Europe</small>
          </div>
        </div>
        <div data-reveal="right">
          <p className="eyebrow">Made to be lived with</p>
          <h2 style={{ fontSize: "clamp(1.6rem,2.8vw,2.55rem)" }}>
            Luxury is not about excess;
            <br />
            it&rsquo;s about intention
          </h2>
          <p className="lead mt-2 measure">
            Every piece earns its place. We work with joiners and weavers who
            still measure twice and finish by hand — so the grain, the joint and
            the seat all age beautifully.
          </p>
          <div className="chiplist mt-3">
            {WOODS.map((w, i) => (
              <button
                key={w.name}
                type="button"
                className={selected === i ? "chip is-on" : "chip"}
                aria-pressed={selected === i}
                onClick={() => choose(i)}
              >
                {w.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
