"use client";

import { useState } from "react";

const accordionItems = [
  { id: 1, title: "Living Room", imageUrl: "/assets/img/furn-living-room.jpg" },
  { id: 2, title: "Bedroom", imageUrl: "/assets/img/furn-bedroom.jpg" },
  { id: 3, title: "Outdoor", imageUrl: "/assets/img/furn-outdoor.jpg" },
  { id: 4, title: "Dining", imageUrl: "/assets/img/furn-dining.jpg" },
  { id: 5, title: "Dresser", imageUrl: "/assets/img/furn-dresser.jpg" },
];

const FALLBACK = "https://placehold.co/400x450/2d3748/ffffff?text=Image";

function AccordionItem({ item, isActive, onOpen }) {
  return (
    // A button, not a div: hover alone leaves this unreachable on touch and by
    // keyboard, so opening is driven by click/focus and hover is a shortcut.
    <button
      type="button"
      onClick={onOpen}
      onFocus={onOpen}
      onMouseEnter={onOpen}
      aria-expanded={isActive}
      style={{
        position: "relative",
        height: "450px",
        width: isActive ? "380px" : "56px",
        flex: "0 0 auto",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: "width 700ms cubic-bezier(0.4,0,0.2,1)",
        appearance: "none",
        border: 0,
        padding: 0,
        background: "transparent",
        font: "inherit",
        color: "inherit",
        textAlign: "left",
      }}
    >
      <img
        src={item.imageUrl}
        alt={`${item.title} furniture at Sage Thread Boutique Bangalore`}
        title={`${item.title} — Sage Thread`}
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
    </button>
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
          <div style={{ flex: "1 1 300px", minWidth: 0 }}>
            <p className="eyebrow">Shop by room</p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                color: "var(--text)",
                lineHeight: 1.08,
                marginTop: ".4rem",
              }}
            >
              Curated Furniture
              <br />
              for Every Space
            </h2>
            <p
              className="lead"
              style={{ marginTop: "1.4rem", maxWidth: "34rem" }}
            >
              Explore our furniture collection room by room — from living room
              seating and bedroom suites to outdoor lounging, dining sets, and
              dressers. Each piece at our Bangalore boutique is chosen for homes
              that expect more from every corner.
            </p>
            <div style={{ marginTop: "2rem" }}>
              <a href="/contact" className="btn btn--solid">
                Schedule a Boutique Visit <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div style={{ flex: "1.8 1 540px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // `safe` so that once the strip overflows on a phone the first
                // card stays scrollable instead of being centred off the edge
                justifyContent: "safe center",
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
                  onOpen={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
