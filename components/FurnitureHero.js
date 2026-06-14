"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* Furniture hero — full-bleed room photos that fill the screen and crossfade
   every 2 seconds. Same bottom-left nav arrows as before step through manually. */

const ITEMS = [
  {
    img: "/assets/img/furniture-hero-1.jpg",
    heading: ["Where Comfort", "Commands Attention"],
    sub: [
      "Sink in. Stay awhile. A sofa that invites you to stay.",
      "Deep comfort meets undeniable presence — the piece every room needs.",
    ],
  },
  {
    img: "/assets/img/furniture-hero-2.jpg",
    heading: ["Luxury Begins Where", "Your Head Rests"],
    sub: [
      "We craft beds that don’t just hold you,",
      "they embrace you.",
    ],
  },
  {
    img: "/assets/img/furniture-hero-3.jpg",
    // heading + description to be added later
  },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";
const FADE = 900; // crossfade duration (ms)

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

export default function FurnitureHero() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timer = useRef(null);
  const n = ITEMS.length;

  // Preload both images up front so crossfades never flash.
  useEffect(() => {
    ITEMS.forEach((it) => {
      const im = new Image();
      im.src = it.img;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-advance through the photos every 2 seconds.
  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setActive((p) => (p + 1) % n), 2000);
  };
  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, []);

  const go = (dir) => {
    setActive((p) => (p + (dir === "next" ? 1 : n - 1)) % n);
    startTimer(); // restart the clock so it doesn't jump right after a click
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        background: "#0d0b0a",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Full-width room photos shown whole — crossfade between pieces */}
      {ITEMS.map((it, i) => (
        <img
          key={"bg" + i}
          src={it.img}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === active ? 1 : 0,
            transition: `opacity ${FADE}ms ${EASE}`,
            zIndex: 0,
          }}
        />
      ))}

      {/* Legibility gradients for the bottom-left copy + controls */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.15) 42%, transparent 68%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.5), transparent 38%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 6,
          opacity: 0.32,
          backgroundImage: GRAIN,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Bottom-left copy (per image) */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "1.5rem" : "4.5rem",
          left: isMobile ? "1rem" : "6rem",
          zIndex: 20,
          width: isMobile ? "92vw" : "640px",
          height: isMobile ? "190px" : "220px",
        }}
      >
        {ITEMS.map((it, i) =>
          !it.heading ? null : (
          <div
            key={"t" + i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              opacity: i === active ? 1 : 0,
              transition: `opacity ${FADE}ms ${EASE}`,
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                color: "#ffffff",
                fontSize: isMobile
                  ? "clamp(1.5rem, 7vw, 2rem)"
                  : "clamp(1.9rem, 2.9vw, 2.9rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.01em",
                textShadow: "0 2px 18px rgba(0,0,0,0.45)",
              }}
            >
              {it.heading[0]}
              <br />
              {it.heading[1]}
            </h1>
            <p
              style={{
                marginTop: isMobile ? "0.6rem" : "0.9rem",
                color: "#ffffff",
                opacity: 0.85,
                fontSize: isMobile ? "0.85rem" : "0.98rem",
                lineHeight: 1.6,
                textShadow: "0 1px 10px rgba(0,0,0,0.4)",
              }}
            >
              {it.sub[0]}
              <br />
              {it.sub[1]}
            </p>
          </div>
          )
        )}
      </div>

      {/* Bottom-right nav arrows */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "1.5rem" : "4.5rem",
          right: isMobile ? "1rem" : "6rem",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            { Icon: ArrowLeft, dir: "prev", label: "Previous image" },
            { Icon: ArrowRight, dir: "next", label: "Next image" },
          ].map(({ Icon, dir, label }) => (
            <button
              key={dir}
              type="button"
              aria-label={label}
              onClick={() => go(dir)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              style={{
                width: isMobile ? "3rem" : "3.75rem",
                height: isMobile ? "3rem" : "3.75rem",
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "2px solid #ffffff",
                color: "#ffffff",
                cursor: "pointer",
                transition: "transform 150ms, background-color 150ms",
              }}
            >
              <Icon size={24} strokeWidth={2.25} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
