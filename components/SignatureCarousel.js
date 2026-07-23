"use client";

/* Signature carousel — a still portrait on the right, and on the left a small
   self-paced reel of signature pieces. Only the left product (photo + name +
   material) cross-fades; the portrait, the dots and the "More Creations" link
   hold still. Auto-advances, pauses while the pointer is over the panel, and
   the dots jump straight to a piece. Reduced motion holds slide one and lets
   the dots do the driving.

   The three pieces below are licensed royalty-free stock (Pexels licence —
   commercial use, no attribution required); swap the four files in
   /public/assets/img (maison-model + maison-piece-1..3) for real product
   frames and nothing else changes. */

import { useEffect, useState } from "react";
import "./SignatureCarousel.css";

const PIECES = [
  {
    img: "/assets/img/maison-piece-1.jpg",
    name: "Beaded Gold Bangle",
    meta: "18k gold",
    alt: "Beaded gold bangle bracelet — fine jewellery at Sage Thread Boutique Bangalore",
  },
  {
    img: "/assets/img/maison-piece-2.jpg",
    name: "Beaded Gold Ring",
    meta: "18k gold",
    alt: "Beaded gold band rings — fine jewellery at Sage Thread Boutique Bangalore",
  },
  {
    img: "/assets/img/maison-piece-3.jpg",
    name: "Gold Hoop Earrings",
    meta: "18k gold",
    alt: "Gold hoop earrings on ivory silk — fine jewellery at Sage Thread Boutique Bangalore",
  },
];

const INTERVAL = 4200;

export default function SignatureCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((n) => (n + 1) % PIECES.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="sig" aria-label="Sage Thread signature creations">
      <div
        className="sig__panel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-reveal
      >
        <div className="sig__stage">
          {PIECES.map((p, n) => (
            <figure
              key={p.img}
              className={"sig__slide" + (n === active ? " is-on" : "")}
              aria-hidden={n === active ? undefined : true}
            >
              <img
                className="sig__piece"
                src={p.img}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <figcaption>
                <h3 className="sig__name">{p.name}</h3>
                <p className="sig__meta">{p.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="sig__dots" role="tablist" aria-label="Choose a creation">
          {PIECES.map((p, n) => (
            <button
              key={p.img}
              type="button"
              role="tab"
              aria-selected={n === active}
              aria-label={p.name}
              className={"sig__dot" + (n === active ? " is-on" : "")}
              onClick={() => setActive(n)}
            />
          ))}
        </div>

        <a className="sig__more" href="/contact">
          More Creations
        </a>
      </div>

      <div className="sig__media" data-reveal="scale">
        <img
          src="/assets/img/maison-model.jpg"
          alt="Model wearing gold hoop earrings — fine jewellery styling at Sage Thread Boutique Bangalore"
          title="Signature creations — Sage Thread"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
