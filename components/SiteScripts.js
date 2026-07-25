"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* =========================================================================
   SAGE THREAD — interactions (ported from the original js/main.js)
   Runs after each route renders so IntersectionObservers, the rAF scroll
   loop, counters and form handlers re-bind to the freshly mounted DOM.

   Reveals + counters REPLAY: they toggle on every entry/exit of the
   viewport (scroll down -> animate in, scroll back up -> reset, scroll
   down again -> animate in once more).
   ========================================================================= */
export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const body = document.body;

    // track everything we need to clean up
    const cleanups = [];

    /* ---------- Always start a new page at the top ----------
       Bypass CSS `scroll-behavior: smooth` so the jump is instant on a
       cross-page navigation (same-page menu clicks are smooth — see Header). */
    const htmlEl = document.documentElement;
    const prevBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    htmlEl.style.scrollBehavior = prevBehavior;

    /* ---------- Mobile nav ---------- */
    const toggle = document.querySelector("[data-nav-toggle]");
    if (toggle) {
      const onToggle = () => body.classList.toggle("nav-open");
      toggle.addEventListener("click", onToggle);
      cleanups.push(() => toggle.removeEventListener("click", onToggle));

      document.querySelectorAll("[data-nav] a").forEach((a) => {
        const close = () => body.classList.remove("nav-open");
        a.addEventListener("click", close);
        cleanups.push(() => a.removeEventListener("click", close));
      });
    }

    /* ---------- Scroll reveal (replays on every entry/exit) ---------- */
    const revealEls = document.querySelectorAll("[data-reveal], [data-img]");
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
            } else {
              // reset so it animates again next time it scrolls into view
              e.target.classList.remove("is-visible");
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---------- Counters (replay: count up on enter, reset on exit) ---------- */
    const counters = document.querySelectorAll("[data-count]");
    const counterRafs = new Map();
    if (counters.length && "IntersectionObserver" in window) {
      const dur = 1600;
      const cObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const el = e.target;
            const target = parseFloat(el.getAttribute("data-count"));
            const suffix = el.getAttribute("data-suffix") || "";

            if (!e.isIntersecting) {
              // leaving view -> cancel + reset to 0 so it can replay
              const r = counterRafs.get(el);
              if (r) {
                cancelAnimationFrame(r);
                counterRafs.delete(el);
              }
              el.textContent = "0";
              return;
            }

            if (reduceMotion) {
              el.textContent = target + suffix;
              return;
            }
            if (counterRafs.has(el)) return; // already counting

            let start = null;
            const step = (ts) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (p < 1) {
                counterRafs.set(el, requestAnimationFrame(step));
              } else {
                counterRafs.delete(el);
              }
            };
            counterRafs.set(el, requestAnimationFrame(step));
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => cObs.observe(c));
      cleanups.push(() => {
        cObs.disconnect();
        counterRafs.forEach((r) => cancelAnimationFrame(r));
        counterRafs.clear();
      });
    }

    /* ---------- Header state + parallax (single rAF loop) ---------- */
    const header = document.querySelector("[data-header]");
    const parallaxEls = reduceMotion
      ? []
      : Array.prototype.slice.call(
          document.querySelectorAll("[data-parallax]")
        );

    /* Pinned intro sequence (marble page): one sticky stage whose beats
       (marble slides up -> stone line -> box appears -> box expands) are
       scrubbed from scroll progress through the tall [data-intro] track. */
    const introSection = reduceMotion
      ? null
      : document.querySelector("[data-intro]");
    const introMarble = introSection
      ? introSection.querySelector("[data-intro-marble]")
      : null;
    const introText = introSection
      ? introSection.querySelector("[data-intro-text]")
      : null;
    const introBox = introSection
      ? introSection.querySelector("[data-intro-box]")
      : null;
    const introCue = introSection
      ? introSection.querySelector(".scroll-cue")
      : null;
    // phone-only second cue that holds under the video box (marble page)
    const introCue2 = introSection
      ? introSection.querySelector("[data-intro-cue2]")
      : null;
    const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    const easeInOut = (x) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    let ticking = false;
    let lastY = -1;
    // Cached viewport box. On touch the URL bar collapses and expands as you
    // scroll, which changes innerHeight mid-sequence; reading it live would
    // re-scale the pinned-intro beats under the user's finger. So the beats
    // run against a height that only moves when the width does (rotation).
    let viewW = window.innerWidth;
    let viewH = window.innerHeight;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    function update() {
      ticking = false;
      const y = window.pageYOffset;
      if (y === lastY) return;
      lastY = y;
      if (header) header.classList.toggle("scrolled", y > 24);

      if (parallaxEls.length) {
        const vh = viewH;
        for (let i = 0; i < parallaxEls.length; i++) {
          const el = parallaxEls[i];
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) continue;
          const speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
          const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
          el.style.transform =
            "translate3d(0," + offset.toFixed(1) + "px,0)";
        }
      }

      if (introSection) {
        const vh = viewH;
        const vw = viewW;
        const r = introSection.getBoundingClientRect();
        const total = r.height - vh;
        const p = total > 0 ? clamp01(-r.top / total) : 0;

        // fade the scroll cue out once the first beat is underway
        if (introCue) introCue.style.opacity = (1 - clamp01(p / 0.1)).toFixed(3);
        // second cue (phones): in with the stone line, held through the box
        // rise and expansion, out as the pin releases
        if (introCue2) {
          const cueIn = clamp01((p - 0.16) / 0.08);
          const cueOut = 1 - clamp01((p - 0.88) / 0.08);
          introCue2.style.opacity = (cueIn * cueOut).toFixed(3);
        }
        // 1) marble slides up from the bottom to cover the hero (p: 0 -> .24)
        if (introMarble) {
          const m = easeOut(clamp01(p / 0.24));
          introMarble.style.transform =
            "translate3d(0," + ((1 - m) * 100).toFixed(2) + "%,0)";
        }
        // 2) the stone line fades / rises in over the marble (p: .16 -> .34)
        if (introText) {
          const t = clamp01((p - 0.16) / 0.18);
          introText.style.opacity = t.toFixed(3);
          introText.style.transform =
            "translate3d(0," + ((1 - t) * 28).toFixed(1) + "px,0)";
        }
        // 3) the small box rises UP from the bottom of the screen into the
        //    centre (p: .38 -> .50), holds briefly, then
        //    4) expands smoothly (p: .54 -> .84) to a large CONTAINED video box
        //    (matching the Marble Center site — it stops short of full bleed,
        //    keeping a margin of dark background all around it).
        if (introBox) {
          // quick fade so it's visible as it clears the bottom edge
          introBox.style.opacity = clamp01((p - 0.38) / 0.04).toFixed(3);
          // slide up from below the viewport into its resting position
          const rise = easeOut(clamp01((p - 0.38) / 0.12));
          introBox.style.transform =
            "translate3d(0," + ((1 - rise) * 100).toFixed(2) + "%,0)";
          // expand from the small card to the contained final size
          const e = easeInOut(clamp01((p - 0.54) / 0.3));
          const sy = vh * 0.36, sx = vw * 0.37; // small starting card insets
          const fy = vh * 0.14, fx = vw * 0.085; // expanded insets — smaller box,
          // leaving clear space top (below the nav) / bottom / left / right
          const iy = (sy + (fy - sy) * e).toFixed(1);
          const ix = (sx + (fx - sx) * e).toFixed(1);
          const rad = (16 + (10 - 16) * e).toFixed(1);
          const clip =
            "inset(" + iy + "px " + ix + "px " + iy + "px " + ix + "px round " + rad + "px)";
          introBox.style.clipPath = clip;
          introBox.style.webkitClipPath = clip; // older WebKit/Safari
        }
      }
    }
    // On resize the scroll position may be unchanged, so force a recompute
    // (parallax offsets + the pinned-intro beats depend on viewport size).
    // A height-only change on touch is the URL bar, not a real resize — take
    // the new height but leave the sequence alone so it doesn't jump.
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const heightOnly = w === viewW && h !== viewH;
      viewW = w;
      if (isTouch && heightOnly) return;
      viewH = h;
      lastY = -1;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });

    /* ---------- Hero entrance ---------- */
    const hero = document.querySelector(".hero");
    if (hero) {
      requestAnimationFrame(() => hero.classList.add("loaded"));
    }

    /* ---------- Scroll cue -> smooth-scroll to the next section ----------
       A custom rAF tween (easeInOutCubic, ~900ms) rather than the native
       scrollIntoView: that jumped instantly here and gave no control over the
       pace. We force scroll-behavior:auto for the duration so the global
       `scroll-behavior: smooth` (base.css) doesn't fight the per-frame jumps. */
    const scrollCue = document.querySelector(".scroll-cue");
    if (scrollCue) {
      let cueRaf = null;
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const onCueClick = () => {
        // On hero pages jump to the next section; on the pinned-intro page
        // (no .hero) nudge one viewport down to advance the sequence.
        const next = hero ? hero.nextElementSibling : null;
        const targetY = next
          ? next.getBoundingClientRect().top + window.pageYOffset
          : window.pageYOffset + window.innerHeight;

        if (reduceMotion) {
          window.scrollTo(0, targetY);
          return;
        }

        if (cueRaf) cancelAnimationFrame(cueRaf);
        const startY = window.pageYOffset;
        const dist = targetY - startY;
        const dur = 900;
        let startTs = null;

        const prevBehavior = htmlEl.style.scrollBehavior;
        htmlEl.style.scrollBehavior = "auto";

        const step = (ts) => {
          if (startTs === null) startTs = ts;
          const p = Math.min((ts - startTs) / dur, 1);
          window.scrollTo(0, startY + dist * easeInOutCubic(p));
          if (p < 1) {
            cueRaf = requestAnimationFrame(step);
          } else {
            cueRaf = null;
            htmlEl.style.scrollBehavior = prevBehavior;
          }
        };
        cueRaf = requestAnimationFrame(step);
      };
      scrollCue.addEventListener("click", onCueClick);
      cleanups.push(() => {
        scrollCue.removeEventListener("click", onCueClick);
        if (cueRaf) cancelAnimationFrame(cueRaf);
      });
    }

    /* ---------- Newsletter (demo, no backend) ---------- */
    const nf = document.querySelector("[data-newsletter]");
    if (nf) {
      const onSubmit = (ev) => {
        ev.preventDefault();
        const btn = nf.querySelector("button");
        if (btn) {
          btn.textContent = "Merci ✦";
          btn.disabled = true;
        }
        const input = nf.querySelector("input");
        if (input) input.value = "";
      };
      nf.addEventListener("submit", onSubmit);
      cleanups.push(() => nf.removeEventListener("submit", onSubmit));
    }

    /* ---------- Contact form (demo, no backend) ---------- */
    const cf = document.querySelector("[data-contact-form]");
    if (cf) {
      const onSubmit = (ev) => {
        ev.preventDefault();
        const note = cf.querySelector("[data-form-note]");
        if (note) note.hidden = false;
        cf.reset();
      };
      cf.addEventListener("submit", onSubmit);
      cleanups.push(() => cf.removeEventListener("submit", onSubmit));
    }

    /* ---------- Tilt on pointer (cards) — desktop only ---------- */
    if (!isTouch && !reduceMotion) {
      document.querySelectorAll("[data-tilt]").forEach((el) => {
        let raf = null;
        const onMove = (e) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = null;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform =
              "perspective(900px) rotateX(" +
              (-py * 5).toFixed(2) +
              "deg) rotateY(" +
              (px * 5).toFixed(2) +
              "deg)";
          });
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
