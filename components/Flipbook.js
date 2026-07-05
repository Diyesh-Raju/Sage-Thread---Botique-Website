"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Page-by-page flipbook reader built on StPageFlip (page-flip). The page DOM is
   built imperatively and handed to the library, so React never tries to remove
   nodes the library has moved. The library is dynamically imported so it only
   ever runs in the browser. */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])
  );

function buildPagesHTML(c) {
  const cover = `
    <div class="fbpage fbpage--cover" data-density="hard">
      <img class="fbpage__bg" src="${c.cover}" alt="" />
      <div class="fbpage__coverwrap">
        <span class="fbpage__eyebrow fbpage__eyebrow--light">${esc(c.eyebrow)}</span>
        <h2 class="fbpage__covertitle">${esc(c.title)}</h2>
        <span class="fbpage__brand">Sage Thread · Natural Stone</span>
      </div>
    </div>`;

  const inner = c.pages
    .map(
      (p, i) => `
    <div class="fbpage">
      <div class="fbpage__img" style="background-image:url('${p.img}')"></div>
      <div class="fbpage__cap">
        <span class="fbpage__eyebrow">${esc(p.eyebrow)}</span>
        <h3 class="fbpage__title">${esc(p.title)}</h3>
        <p class="fbpage__text">${esc(p.text)}</p>
      </div>
      <span class="fbpage__no">${String(i + 1).padStart(2, "0")}</span>
    </div>`
    )
    .join("");

  const back = `
    <div class="fbpage fbpage--back" data-density="hard">
      <div class="fbpage__backwrap">
        <span class="fbpage__eyebrow fbpage__eyebrow--light">Sage Thread · Bengaluru</span>
        <h3 class="fbpage__covertitle">Bring this home</h3>
        <p class="fbpage__text fbpage__text--light">Book a consultation to select your stone and finish with our atelier.</p>
        <a class="fbpage__btn" href="/contact">Book a consultation</a>
      </div>
    </div>`;

  return cover + inner + back;
}

export default function Flipbook({ catalogue }) {
  const bookRef = useRef(null);
  const pfRef = useRef(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  // the book sits centred while closed (cover showing) and slides into the
  // spread position the first time it is opened
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return undefined;
    let pf;
    let destroyed = false;

    el.innerHTML = buildPagesHTML(catalogue);

    (async () => {
      const { PageFlip } = await import("page-flip");
      if (destroyed) return;
      pf = new PageFlip(el, {
        width: 460,
        height: 600,
        size: "stretch",
        minWidth: 280,
        maxWidth: 560,
        minHeight: 360,
        maxHeight: 760,
        maxShadowOpacity: 0.5,
        showCover: true,
        flippingTime: 850,
        usePortrait: true,
        autoSize: true,
        mobileScrollSupport: false,
        drawShadow: true,
      });
      pf.loadFromHTML(el.querySelectorAll(".fbpage"));
      pfRef.current = pf;
      setTotal(pf.getPageCount());
      setPage(pf.getCurrentPageIndex() || 0);
      pf.on("flip", (e) => {
        setPage(e.data);
        setClosed(e.data === 0); // re-centre whenever we land back on the cover
      });
    })();

    return () => {
      destroyed = true;
      try {
        pf?.destroy();
      } catch {
        /* ignore */
      }
      pfRef.current = null;
      if (el) el.innerHTML = "";
    };
  }, [catalogue]);

  const prev = () => pfRef.current?.flipPrev();
  const next = () => {
    const pf = pfRef.current;
    if (!pf) return;
    // first turn from the cover: slide the book to position, then open it
    if (closed && pf.getCurrentPageIndex() === 0) {
      setClosed(false);
      setTimeout(() => pf.flipNext(), 460);
    } else {
      pf.flipNext();
    }
  };

  return (
    <div className="fb">
      <div className="fb-stage">
        <div ref={bookRef} className={`fb-book${closed ? " is-closed" : ""}`} />
      </div>

      <div className="fb-controls">
        <button type="button" className="fb-arrow" onClick={prev} aria-label="Previous page">
          <ChevronLeft size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <span className="fb-count">
          {Math.min(page + 1, total || 1)} <i>/</i> {total || "—"}
        </span>
        <button type="button" className="fb-arrow" onClick={next} aria-label="Next page">
          <ChevronRight size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      <p className="fb-hint">Use arrows to discover</p>
    </div>
  );
}
