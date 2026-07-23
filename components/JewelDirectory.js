"use client";

/* Jewellery directory: a rail of category icons, a filtered row of pieces, and
   a "shop by category" row of stone cuts.

   Both icon sets are drawn here as inline SVG rather than shipped as files —
   they are line art on a single stroke, so as markup they inherit currentColor
   (which is what lets them pick up the rose gold on hover), stay sharp at any
   size, and cost no requests. The cut geometry is generated rather than eyeballed:
   each is a ring of points at even angles, so the facets meet the girdle exactly.

   No prices: nothing else on this site quotes one, and inventing figures for a
   real boutique would be putting words in its mouth. Each piece carries its
   materials instead, the way the look-book pieces do. */

import { useState } from "react";
import "./JewelDirectory.css";

/* ── the category rail ───────────────────────────────────────────────── */
const ICONS = [
  {
    name: "Pendants",
    /* collar with a drop hung from its point */
    art: (
      <>
        <path d="M16 24.4C12.5 21.4 5.5 17 5.5 11.8 5.5 8.7 8 7 10.4 7c2.6 0 4.8 2 5.6 4.4C16.8 9 19 7 21.6 7 24 7 26.5 8.7 26.5 11.8c0 5.2-7 9.6-10.5 12.6Z" />
        <path d="M16 24.4v1.5" />
        <ellipse cx="16" cy="27.6" rx="1.7" ry="2" />
      </>
    ),
  },
  {
    name: "Gold",
    /* stacked ingots, catching light */
    art: (
      <>
        <path d="M8 22.2l1.7-4.6h4.6l1.7 4.6H8Z" />
        <path d="M16 22.2l1.7-4.6h4.6l1.7 4.6H16Z" />
        <path d="M12 16.4l1.7-4.6h4.6l1.7 4.6H12Z" />
        <path d="M13.1 9.4l-.7-2M16 8.8V6.6M18.9 9.4l.7-2" />
      </>
    ),
  },
  {
    name: "Necklaces",
    /* two strands, the inner one beaded */
    art: (
      <>
        <path d="M7 7c0 10.4 4 16.4 9 16.4s9-6 9-16.4" />
        <path
          d="M9.6 7c0 8.4 2.9 13.4 6.4 13.4s6.4-5 6.4-13.4"
          strokeDasharray="0.01 2.7"
        />
      </>
    ),
  },
  {
    name: "Bands",
    /* two bands, linked */
    art: (
      <>
        <circle cx="12.6" cy="16" r="6.8" />
        <circle cx="19.4" cy="16" r="6.8" opacity="0.45" />
      </>
    ),
  },
  {
    name: "Diamonds",
    /* brilliant cut, crown over pavilion */
    art: (
      <>
        <path d="M9 13.2l3.2-4.6h7.6l3.2 4.6L16 24 9 13.2Z" />
        <path d="M9 13.2h14M12.2 8.6l2 4.6M19.8 8.6l-2 4.6M14.2 13.2 16 24M17.8 13.2 16 24" />
        <path d="M12.6 6.2l-.6-1.8M16 5.6V3.6M19.4 6.2l.6-1.8" />
      </>
    ),
  },
  {
    name: "Rings",
    /* band under a set stone */
    art: (
      <>
        <circle cx="16" cy="19.6" r="6.6" />
        <rect x="11.8" y="8" width="8.4" height="4.2" rx="1" />
        <path d="M14 8v4.2M16 8v4.2M18 8v4.2" />
      </>
    ),
  },
];

/* ── the pieces, by rail ─────────────────────────────────────────────── */
/* Product frames — minimalist fine-jewellery photography (licensed stock,
   Pexels free licence: commercial use, no attribution required). Each is a
   fresh 720×900 crop, not used elsewhere on the site. Swapping a piece is a
   matter of replacing `img`/`name`/`meta`/`alt` here; nothing else reads them. */
const GROUPS = [
  {
    tab: "Necklaces",
    pieces: [
      {
        img: "/assets/img/piece-necklace-1.jpg",
        name: "Riviera Line",
        meta: "Brilliant-cut diamond, platinum",
        alt: "Diamond riviera line necklace — brilliant-cut solitaire pendants on fine chains — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-necklace-2.jpg",
        name: "Emerald-Cut Pendant",
        meta: "Step-cut diamond, white gold",
        alt: "Emerald-cut diamond halo pendant necklace in white gold — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-necklace-3.jpg",
        name: "Cluster Halo",
        meta: "Brilliant-cut diamond, white gold",
        alt: "Round diamond cluster halo pendant necklace in white gold — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-necklace-4.jpg",
        name: "Ligne Bar",
        meta: "Pavé diamond, rose gold",
        alt: "Rose gold pavé diamond bar necklace — minimalist fine jewellery at Sage Thread Boutique Bangalore",
      },
    ],
  },
  {
    tab: "Earrings",
    pieces: [
      {
        img: "/assets/img/piece-earring-1.jpg",
        name: "Solitaire Studs",
        meta: "Brilliant-cut diamond",
        alt: "Brilliant-cut diamond solitaire stud earrings — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-earring-2.jpg",
        name: "Cluster Studs",
        meta: "Pavé diamond, rose gold",
        alt: "Rose gold pavé diamond cluster stud earrings — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-earring-3.jpg",
        name: "Éternité Hoops",
        meta: "Brilliant-cut diamond",
        alt: "Inside-out diamond eternity hoop earrings in white gold — fine jewellery at Sage Thread Boutique Bangalore",
      },
      {
        img: "/assets/img/piece-earring-4.jpg",
        name: "Solitaire Drops",
        meta: "Brilliant-cut diamond, white gold",
        alt: "Brilliant-cut diamond drop earrings on fine posts — fine jewellery at Sage Thread Boutique Bangalore",
      },
    ],
  },
];

/* ── the cuts ────────────────────────────────────────────────────────── */
/* Facet lines are on an even ring of angles so every spoke lands on the girdle
   — see the note at the top of the file. */
const CUTS = [
  {
    name: "Round Brilliant",
    note: "Fifty-eight facets",
    art: (
      <>
        <circle cx="24" cy="24" r="19" />
        <path d="M33.24 27.83 27.83 33.24 20.17 33.24 14.76 27.83 14.76 20.17 20.17 14.76 27.83 14.76 33.24 20.17Z" />
        <path d="M33.24 27.83 41.55 31.27M27.83 33.24 31.27 41.55M20.17 33.24 16.73 41.55M14.76 27.83 6.45 31.27M14.76 20.17 6.45 16.73M20.17 14.76 16.73 6.45M27.83 14.76 31.27 6.45M33.24 20.17 41.55 16.73" />
      </>
    ),
  },
  {
    name: "Cushion Cut",
    note: "Rounded corners",
    art: (
      <>
        <rect x="5" y="5" width="38" height="38" rx="11" />
        <path d="M33.24 27.83 27.83 33.24 20.17 33.24 14.76 27.83 14.76 20.17 20.17 14.76 27.83 14.76 33.24 20.17Z" />
        <path d="M33.24 27.83 38.6 33.2M27.83 33.24 27.83 40.5M20.17 33.24 20.17 40.5M14.76 27.83 9.4 33.2M14.76 20.17 9.4 14.8M20.17 14.76 20.17 7.5M27.83 14.76 27.83 7.5M33.24 20.17 38.6 14.8" />
      </>
    ),
  },
  {
    name: "Kite Cut",
    note: "Four drawn points",
    art: (
      <>
        <path d="M24 4 44 24 24 44 4 24Z" />
        <path d="M24 12c1.6 8 4 10.4 12 12-8 1.6-10.4 4-12 12-1.6-8-4-10.4-12-12 8-1.6 10.4-4 12-12Z" />
      </>
    ),
  },
  {
    name: "Oval Cut",
    note: "Light drawn long",
    art: (
      <>
        <ellipse cx="24" cy="24" rx="14" ry="19" />
        <path d="M30.93 28.02 26.87 33.7 21.13 33.7 17.07 28.02 17.07 19.98 21.13 14.3 26.87 14.3 30.93 19.98Z" />
        <path d="M30.93 28.02 36.93 31.27M26.87 33.7 29.36 41.55M21.13 33.7 18.64 41.55M17.07 28.02 11.07 31.27M17.07 19.98 11.07 16.73M21.13 14.3 18.64 6.45M26.87 14.3 29.36 6.45M30.93 19.98 36.93 16.73" />
      </>
    ),
  },
  {
    name: "Emerald Cut",
    note: "Facets cut in steps",
    art: (
      <>
        <rect x="6" y="6" width="36" height="36" rx="7" />
        <rect x="13" y="13" width="22" height="22" rx="3" />
        <path d="M13 13 6.8 6.8M35 13 41.2 6.8M35 35 41.2 41.2M13 35 6.8 41.2" />
      </>
    ),
  },
  {
    name: "Hexagon Cut",
    note: "Six even sides",
    art: (
      <>
        <path d="M37.86 33.5 24 43 10.14 33.5 10.14 14.5 24 5 37.86 14.5Z" />
        <path d="M31.36 29 24 34 16.64 29 16.64 19 24 14 31.36 19Z" />
        <path d="M31.36 29 37.86 33.5M24 34 24 43M16.64 29 10.14 33.5M16.64 19 10.14 14.5M24 14 24 5M31.36 19 37.86 14.5" />
      </>
    ),
  },
];

export default function JewelDirectory() {
  const [tab, setTab] = useState(0);
  const group = GROUPS[tab];

  return (
    <section className="jdir" aria-label="Sage Thread jewellery — browse by piece and by cut">
      {/* ── category rail ── */}
      {/* Decorative marks, not links: they light up rose gold on hover but do
          nothing on click, so the scroll position never jumps. Rendered as
          spans (no href, default cursor) so there's no navigation to prevent. */}
      <div className="jdir__rail" data-reveal>
        {ICONS.map((ic) => (
          <span key={ic.name} className="jdir__railLink" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5"
                 strokeLinecap="round" strokeLinejoin="round">
              {ic.art}
            </svg>
          </span>
        ))}
      </div>

      {/* ── pieces ── */}
      <div className="jdir__tabs" role="tablist" aria-label="Jewellery type" data-reveal>
        {GROUPS.map((g, i) => (
          <button
            key={g.tab}
            type="button"
            role="tab"
            id={`jdir-tab-${i}`}
            aria-selected={i === tab}
            aria-controls="jdir-panel"
            className={"jdir__tab" + (i === tab ? " is-on" : "")}
            onClick={() => setTab(i)}
          >
            {g.tab}
          </button>
        ))}
      </div>

      {/* Keyed on the tab so the cards remount and replay their entrance.
          Deliberately NOT [data-reveal]: the page's reveal observer collects its
          targets once on mount, so anything React swaps in afterwards is never
          observed and would sit at opacity 0 for good. These carry their own
          entrance instead. */}
      <ul
        className="jdir__grid"
        id="jdir-panel"
        key={tab}
        role="tabpanel"
        aria-labelledby={`jdir-tab-${tab}`}
      >
        {group.pieces.map((p, i) => (
          <li className="jdir__card" key={p.img} style={{ "--d": `${i * 0.06}s` }}>
            <a className="jdir__shot" href="/contact" aria-label={`Ask about the ${p.name}`}>
              <img src={p.img} alt={p.alt} loading="lazy" decoding="async" width="720" height="900" />
            </a>
            <p className="jdir__name">{p.name}</p>
            <p className="jdir__meta">{p.meta}</p>
          </li>
        ))}
      </ul>

      {/* ── cuts ── */}
      <h2 className="jdir__heading" data-reveal>
        Shop by <em>Category</em>
      </h2>

      <ul className="jdir__cuts">
        {CUTS.map((c, i) => (
          <li key={c.name} data-reveal style={{ "--d": `${i * 0.05}s` }}>
            {/* A card, not a link: hover still lifts it and warms the line art,
                but a click does nothing and stays put — no visit-page jump. */}
            <div className="jdir__cut">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.25"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {c.art}
              </svg>
              <span className="jdir__cutNote">{c.note}</span>
              <span className="jdir__cutName">{c.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
