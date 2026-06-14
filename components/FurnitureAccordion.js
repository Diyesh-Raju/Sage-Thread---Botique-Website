"use client";

import { useState } from "react";

/* Image-accordion (21st.dev template, ported off Tailwind to inline styles).
   Hovering a category expands it; the rest collapse to a thin strip with a
   vertical caption. Styled to match the furniture page (cream ground, Playfair
   heading, terracotta button). */

const accordionItems = [
  { id: 1, title: "Couches", imageUrl: "/assets/img/furn-couches.jpg" },
  { id: 2, title: "Lounge Chair", imageUrl: "/assets/img/furn-lounge-chair.jpg" },
  { id: 3, title: "Bed Frames", imageUrl: "/assets/img/furn-bed-frames.jpg" },
  { id: 4, title: "Kitchen Furniture", imageUrl: "/assets/img/furn-kitchen.jpg" },
  { id: 5, title: "Closet & Wardrobe", imageUrl: "/assets/img/furn-closet.jpg" },
];

const FALLBACK = "https://placehold.co/400x450/2d3748/ffffff?text=Image";

function AccordionItem({ item, isActive, onMouseEnter }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      style={{
        position: "relative",
        height: "450px",
        width: isActive ? "380px" : "56px",
        flex: "0 0 auto",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: "width 700ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = FALLBACK;
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          bottom: isActive ? "1.5rem" : "6rem",
          transform: isActive
            ? "translateX(-50%) rotate(0deg)"
            : "translateX(-50%) rotate(90deg)",
          color: "#ffffff",
          fontSize: "1.125rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
          transition: "all 300ms ease-in-out",
        }}
      >
        {item.title}
      </span>
    </div>
  );
}

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section style={{ background: "var(--bg)" }}>
      <div
        style={{
          maxWidth: "var(--maxw)",
          margin: "0 auto",
          padding: "clamp(3rem, 6vw, 6rem) var(--pad)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "3rem",
          }}
        >
          {/* Left: text content */}
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <p className="eyebrow">Explore by room</p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                color: "var(--text)",
                lineHeight: 1.08,
                marginTop: ".4rem",
              }}
            >
              A piece for every
              <br />
              corner of the home
            </h2>
            <p
              className="lead"
              style={{ marginTop: "1.4rem", maxWidth: "34rem" }}
            >
              Explore the collection by category — sink-in sofas and sculptural
              lounge chairs, bed frames, kitchen and the quiet luxury of a
              fitted wardrobe. Each piece made to be lived with for a lifetime.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <a href="/contact" className="btn btn--solid">
                Contact Us <span className="arrow">→</span>
              </a>
            </div>
          </div>

          {/* Right: image accordion */}
          <div style={{ flex: "1.8 1 540px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                overflowX: "auto",
                padding: "1rem",
              }}
            >
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
