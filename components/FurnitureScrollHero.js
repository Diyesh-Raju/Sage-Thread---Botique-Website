"use client";

import { useEffect, useRef } from "react";

/* Scroll-scrubbed video hero.
   The source video is pre-decoded into a JPEG frame sequence (public/assets/
   furn-hero-seq) and drawn to a <canvas>. Scrubbing a frame sequence is far
   smoother and more reliable across browsers (Safari / Opera / Chrome) than
   seeking a <video> element's currentTime, which stutters badly on seek.
   Frames are loaded progressively; the canvas always draws the nearest loaded
   frame so scrolling never blocks, and a preloaded poster shows instantly. */

const FRAME_COUNT = 91;
const framePath = (i) => `/assets/furn-hero-seq/f_${String(i + 1).padStart(3, "0")}.jpg`;
const POSTER = framePath(0);

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export default function FurnitureScrollHero() {
  const stageRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  const cueRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <section
      ref={stageRef}
      className="furn-scrollhero"
      aria-label="Luxury living room interior — Sage Thread"
    >
      <div ref={stickyRef} className="furn-scrollhero__sticky">
        <img
          className="furn-scrollhero__poster"
          src={POSTER}
          alt="Luxury living room interior at Sage Thread Bangalore"
          fetchPriority="high"
          decoding="async"
          draggable={false}
        />
        <canvas ref={canvasRef} className="furn-scrollhero__canvas" />
        <div ref={cueRef} className="furn-scrollhero__cue" aria-hidden="true">
          <span className="furn-scrollhero__chevron" />
        </div>
      </div>
    </section>
  );
}
