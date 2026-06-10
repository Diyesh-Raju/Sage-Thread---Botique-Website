"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* TOONHUB — full-viewport character-figurine carousel hero.
   Faithful port of the Vite/TS/Tailwind spec to this Next.js + plain-CSS
   project: Tailwind's `sm` breakpoint (>=640px) is expressed through the
   existing `isMobile` (< 640px) logic, and every spec'd style is inline. */

const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

export default function FurnitureHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload all 4 images on mount.
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Track the mobile breakpoint (< 640px === Tailwind `sm`).
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4));
    setTimeout(() => setIsAnimating(false), 650);
  };

  // Roles derived from activeIndex.
  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  const roleOf = (i) => {
    if (i === center) return "center";
    if (i === left) return "left";
    if (i === right) return "right";
    return "back";
  };

  const styleFor = (role) => {
    switch (role) {
      case "center":
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "none",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "60%" : "92%",
          bottom: isMobile ? "22%" : 0,
        };
      case "left":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      case "right":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };
      default: // back
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
        };
    }
  };

  const ITEM_TRANSITION = `transform 650ms ${EASE}, filter 650ms ${EASE}, opacity 650ms ${EASE}, left 650ms ${EASE}`;

  return (
    <div
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color 650ms ${EASE}`,
        fontFamily: "Inter, sans-serif",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        {/* 1. Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: GRAIN,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* 2. Giant ghost text */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "18%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(90px, 28vw, 380px)",
            fontWeight: 900,
            color: "#ffffff",
            opacity: 1,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          3D SHAPE
        </div>

        {/* 3. Top-left brand label */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: isMobile ? "1rem" : "2rem",
            zIndex: 60,
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#ffffff",
            opacity: 0.9,
            letterSpacing: "0.18em",
          }}
        >
          TOONHUB
        </div>

        {/* 4. Carousel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          {IMAGES.map((item, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                aspectRatio: "0.6 / 1",
                transition: ITEM_TRANSITION,
                willChange: "transform, filter, opacity",
                ...styleFor(roleOf(i)),
              }}
            >
              <img
                src={item.src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                }}
              />
            </div>
          ))}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "5rem",
            left: isMobile ? "1rem" : "6rem",
            zIndex: 60,
            maxWidth: "320px",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              marginBottom: isMobile ? "0.5rem" : "0.75rem",
              fontSize: isMobile ? "1rem" : "22px",
              color: "#ffffff",
              opacity: 0.95,
            }}
          >
            TOONHUB FIGURINES
          </p>
          {!isMobile && (
            <p
              style={{
                fontSize: "0.875rem",
                color: "#ffffff",
                opacity: 0.85,
                lineHeight: 1.6,
                marginBottom: "1.25rem",
              }}
            >
              The artwork is stunning, shipped fully prepared. The finish is a
              vision, the 3D craft is flawless. Many thanks! Wishing you the win.
              Order now.
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { Icon: ArrowLeft, dir: "prev", label: "Previous" },
              { Icon: ArrowRight, dir: "next", label: "Next" },
            ].map(({ Icon, dir, label }) => (
              <button
                key={dir}
                type="button"
                aria-label={label}
                onClick={() => navigate(dir)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                style={{
                  width: isMobile ? "3rem" : "4rem",
                  height: isMobile ? "3rem" : "4rem",
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
                <Icon size={26} strokeWidth={2.25} />
              </button>
            ))}
          </div>
        </div>

        {/* 6. Bottom-right link */}
        <a
          href="#"
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.95")}
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "5rem",
            right: isMobile ? "1rem" : "2.5rem",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            fontFamily: "Anton, sans-serif",
            fontSize: "clamp(20px, 4vw, 56px)",
            fontWeight: 400,
            color: "#ffffff",
            opacity: 0.95,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "opacity 200ms",
          }}
        >
          DISCOVER IT
          <ArrowRight
            style={{ width: isMobile ? "1.25rem" : "2rem", height: isMobile ? "1.25rem" : "2rem" }}
            strokeWidth={2.25}
          />
        </a>
      </div>
    </div>
  );
}
