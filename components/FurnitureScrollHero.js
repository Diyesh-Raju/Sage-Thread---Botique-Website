"use client";

import { useEffect, useRef, useState } from "react";

/* Scroll-scrubbed video hero (desktop).
   The source video is pre-decoded into a JPEG frame sequence (public/assets/
   furn-hero-seq) and drawn to a <canvas>. Scrubbing a frame sequence is far
   smoother and more reliable across browsers (Safari / Opera / Chrome) than
   seeking a <video> element's currentTime, which stutters badly on seek.
   Frames are loaded progressively; the canvas always draws the nearest loaded
   frame so scrolling never blocks, and a preloaded poster shows instantly.

   PHONES (<=760px) get a different hero entirely: four still frames that
   cross-fade on a timer, with the title left where it sits. The scrub is a
   cursor idiom, and the frame sequence is a 9.6MB download that a phone would
   pay for in full to scrub a hero it can't scrub well — the four stills come
   to ~1.9MB and none of the canvas code below runs. */

const FRAME_COUNT = 91;
const framePath = (i) => `/assets/furn-hero-seq/f_${String(i + 1).padStart(3, "0")}.jpg`;
const POSTER = framePath(0);

const PHONE_Q = "(max-width: 760px)";

/* Cropped from 4K masters kept in media-source/furn-hero (gitignored, per the
   repo's convention of shipping only derivatives). Shipped at 1200x2600 — a
   430pt phone at 3x needs 1290x2796, so these carry full detail without
   paying for pixels object-fit would throw away. None appear anywhere else
   on the site. */
const PHONE_SLIDES = [
  {
    src: "/assets/img/furn-hero-lounge.jpg",
    alt: "Warm minimalist lounge with a curved plaster bench and paper lamp at Sage Thread Bangalore",
  },
  {
    src: "/assets/img/furn-hero-scandi.jpg",
    alt: "Light oak cabinets and a moulded plywood chair at Sage Thread Bangalore",
  },
  {
    src: "/assets/img/furn-hero-sideboard.jpg",
    alt: "Ivory sideboard with dried grasses beside a sheer-curtained window at Sage Thread Bangalore",
  },
  {
    src: "/assets/img/furn-hero-atrium.jpg",
    alt: "Bright minimal room with a cane lounge chair and low ivory cabinet at Sage Thread Bangalore",
  },
];
const SLIDE_MS = 4200;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/* Scrub progress over which the intro title fades out — it should be gone
   within the first flick of the wheel, long before the pan gets going. */
const TITLE_FADE_START = 0.004;
const TITLE_FADE_END = 0.075;

export default function FurnitureScrollHero() {
  const stageRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const cueRef = useRef(null);
  const introRef = useRef(null);

  // Starts false so the server render and the first client render agree.
  const [isPhone, setIsPhone] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PHONE_Q);
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Cross-fade timer. Reduced motion holds on the first frame.
  useEffect(() => {
    if (!isPhone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setSlide((s) => (s + 1) % PHONE_SLIDES.length),
      SLIDE_MS
    );
    return () => clearInterval(id);
  }, [isPhone]);

  useEffect(() => {
    // Read the query directly rather than leaning on the state above: this
    // effect and the one that sets isPhone both run on mount, and a phone must
    // not kick off the 91-frame loader for even one pass.
    if (window.matchMedia(PHONE_Q).matches) {
      // Clear anything the scrub handler left behind when crossing the
      // breakpoint on a resize, or the title stays faded out.
      const intro = introRef.current;
      if (intro) {
        intro.style.opacity = "";
        intro.style.transform = "";
        intro.style.filter = "";
      }
      return;
    }

    const stage = stageRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;
    if (!stage || !sticky || !canvas) return;

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d", { alpha: false });

    const frames = new Array(FRAME_COUNT).fill(null); // HTMLImageElement once decoded
    let dispW = 0;
    let dispH = 0;
    let dpr = 1;

    let current = 0; // smoothed frame index (float)
    let target = 0; // scroll-driven target frame index (float)
    let lastDrawn = -1;
    let rafId = null;
    let running = false;
    let cueHidden = false;
    let lastIntro = -1;

    const nearestLoaded = (idx) => {
      if (frames[idx]) return idx;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (idx - d >= 0 && frames[idx - d]) return idx - d;
        if (idx + d < FRAME_COUNT && frames[idx + d]) return idx + d;
      }
      return -1;
    };

    const draw = (idx) => {
      const li = nearestLoaded(idx);
      if (li < 0) return;
      const img = frames[li];
      const scale = Math.max(dispW / img.naturalWidth, dispH / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (dispW - w) / 2, (dispH - h) / 2, w, h);
      lastDrawn = li;
      if (canvas.style.opacity !== "1") canvas.style.opacity = "1";
    };

    const setup = () => {
      dispW = sticky.clientWidth;
      dispH = sticky.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(dispW * dpr);
      canvas.height = Math.round(dispH * dpr);
      canvas.style.width = dispW + "px";
      canvas.style.height = dispH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // high-quality scaling (some browsers reset these on canvas resize)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      lastDrawn = -1;
      draw(Math.round(current));
    };

    const computeTarget = () => {
      const total = stage.offsetHeight - window.innerHeight;
      const scrolled = -stage.getBoundingClientRect().top;
      const p = total > 0 ? clamp(scrolled / total, 0, 1) : 0;
      target = p * (FRAME_COUNT - 1);

      if (cueRef.current && !cueHidden && p > 0.02) {
        cueHidden = true;
        cueRef.current.style.opacity = "0";
      } else if (cueRef.current && cueHidden && p <= 0.02) {
        cueHidden = false;
        cueRef.current.style.opacity = "";
      }

      // Intro title: tied to scroll position rather than a timer, so it
      // dissolves exactly as the pan starts and comes back if you scroll up.
      const intro = introRef.current;
      if (intro) {
        const t = clamp(
          (p - TITLE_FADE_START) / (TITLE_FADE_END - TITLE_FADE_START),
          0,
          1
        );
        if (Math.abs(t - lastIntro) > 0.004) {
          lastIntro = t;
          const e = t * t * (3 - 2 * t); // smoothstep
          intro.style.opacity = String(1 - e);
          intro.style.transform = `translate3d(0, ${(-e * 46).toFixed(1)}px, 0)`;
          intro.style.filter = e > 0.001 ? `blur(${(e * 6).toFixed(2)}px)` : "";
        }
      }
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.04) current = target;
      else current += diff * 0.2;

      const idx = Math.round(current);
      if (idx !== lastDrawn) draw(idx);

      if (current !== target) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        rafId = null;
      }
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      computeTarget();
      ensureRunning();
    };

    const onResize = () => {
      setup();
      computeTarget();
      ensureRunning();
    };

    // ---- progressive, in-order frame loader (cross-browser) ----
    const loadOne = (i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const done = () => {
          frames[i] = img;
          if (i === Math.round(current) || lastDrawn < 0) draw(Math.round(current));
          resolve();
        };
        img.onload = () => {
          if (img.decode) img.decode().then(done, done);
          else done();
        };
        img.onerror = () => resolve();
        img.src = framePath(i);
      });

    setup();
    computeTarget();

    if (reduceMotion) {
      // No scrubbing: just show the first frame (poster already visible).
      loadOne(0);
      return () => {};
    }

    const CONCURRENCY = 6;
    let cursor = 0;
    let inFlight = 0;
    const pump = () => {
      while (inFlight < CONCURRENCY && cursor < FRAME_COUNT) {
        const i = cursor++;
        inFlight++;
        loadOne(i).then(() => {
          inFlight--;
          pump();
        });
      }
    };
    pump();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPhone]);

  return (
    <section
      ref={stageRef}
      className={
        isPhone ? "furn-scrollhero furn-scrollhero--phone" : "furn-scrollhero"
      }
      aria-label="Luxury living room interior — Sage Thread"
    >
      <div ref={stickyRef} className="furn-scrollhero__sticky">
        {isPhone ? (
          <div className="furn-herocycle">
            {PHONE_SLIDES.map((s, i) => (
              <img
                key={s.src}
                className={
                  i === slide
                    ? "furn-herocycle__img is-on"
                    : "furn-herocycle__img"
                }
                src={s.src}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                draggable={false}
                aria-hidden={i === slide ? undefined : "true"}
              />
            ))}
          </div>
        ) : (
          <>
            <img
              className="furn-scrollhero__poster"
              src={POSTER}
              alt="Luxury living room interior at Sage Thread Bangalore"
              fetchPriority="high"
              decoding="async"
              draggable={false}
            />
            <canvas ref={canvasRef} className="furn-scrollhero__canvas" />
          </>
        )}
        <div ref={introRef} className="furn-scrollhero__intro">
          <h1 className="furn-scrollhero__title">Transforming spaces</h1>
        </div>
        <div ref={cueRef} className="furn-scrollhero__cue" aria-hidden="true">
          <span className="furn-scrollhero__chevron" />
        </div>
      </div>
    </section>
  );
}
