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

/* Sizing lives in furniture.css (.room-acc*) rather than inline, so the strip
   can be re-proportioned on a phone to fit all five panels on screen at once.
   The desktop numbers are unchanged. */
function AccordionItem({ item, isActive, onOpen }) {
  return (
    // A button, not a div: hover alone leaves this unreachable on touch and by
    // keyboard, so opening is driven by click/focus and hover is a shortcut.
    <button
      type="button"
      className="room-acc__item"
      onClick={onOpen}
      onFocus={onOpen}
      onMouseEnter={onOpen}
      aria-expanded={isActive}
    >
      <img
        className="room-acc__img"
        src={item.imageUrl}
        alt={`${item.title} furniture at Sage Thread Boutique Bangalore`}
        title={`${item.title} — Sage Thread`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = FALLBACK;
        }}
      />
      <div className="room-acc__veil" />
      <span className="room-acc__label">{item.title}</span>
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
            <div className="room-acc">
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
