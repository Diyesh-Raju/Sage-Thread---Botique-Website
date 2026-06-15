"use client";

import { useEffect, useState } from "react";

const FABRICS = [
  { name: "Silk", img: "/assets/img/wood-teak.jpg" },
  { name: "Linen", img: "/assets/img/wood-dark-oak.jpg" },
  { name: "Cotton", img: "/assets/img/wood-rustic-walnut.jpg" },
  { name: "Georgette", img: "/assets/img/wood-holly.jpg" },
];

export default function FurnitureFinishes() {
  const [selected, setSelected] = useState(0);
  const [base, setBase] = useState(0);

  useEffect(() => {
    FABRICS.forEach((w) => {
      const im = new Image();
      im.src = w.img;
    });
  }, []);

  const choose = (i) => {
    if (i === selected) return;
    setSelected(i);
  };

  return (
    <section className="section">
      <div className="container split">
        <div className="feature__media" data-reveal>
          <div className="media" data-img style={{ position: "relative" }}>
            <img
              src={FABRICS[base].img}
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
            <img
              key={selected}
              src={FABRICS[selected].img}
              alt={`${FABRICS[selected].name} fabric for designer dresses at Sage Thread Boutique Bangalore`}
              title={`${FABRICS[selected].name} — Sage Thread Fabrics`}
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
            <small>by master tailors across India</small>
          </div>
        </div>
        <div data-reveal="right">
          <p className="eyebrow">Designer dresses</p>
          <h2 style={{ fontSize: "clamp(1.6rem,2.8vw,2.55rem)" }}>
            Luxury is not excess;
            <br />
            it&apos;s the perfect fit
          </h2>
          <p className="lead mt-2 measure">
            Every designer dress at Sage Thread Boutique is chosen for silhouette,
            fabric, and the way it flatters. Our Bangalore stylists work with
            skilled tailors who measure twice and finish by hand — so your
            occasion wear drapes beautifully and lasts beyond a single season.
          </p>
          <div className="chiplist mt-3">
            {FABRICS.map((w, i) => (
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
