"use client";

import { useState } from "react";
import "./Faq.css";

/* Accordion FAQ — design mirrors the Obsidian Blade FAQ (centered small-caps
   heading, hairline dividers, a question button with a chevron that flips, and
   answers that expand via the grid-rows 0fr→1fr technique). Themed with this
   site's tokens. One item open at a time. */
export default function Faq({ items }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="faq">
      <div className="faq-list">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div className={"faq-item" + (isOpen ? " is-open" : "")} key={it.q}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{it.q}</span>
                <svg
                  className="faq-chevron"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="faq-a-wrap">
                <div className="faq-a-inner">
                  <p className="faq-a">{it.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
