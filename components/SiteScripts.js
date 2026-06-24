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

    /* Expanding media box (marble page): scrub clip-path with scroll
       progress through the [data-expand] section. */
    const expandSection = reduceMotion
      ? null
      : document.querySelector("[data-expand]");
    const expandBox = expandSection
      ? expandSection.querySelector(".expand__box")
      : null;

    let ticking = false;
    let lastY = -1;

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
        const vh = window.innerHeight;
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

      if (expandBox) {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const r = expandSection.getBoundingClientRect();
        const total = r.height - vh;
        let p = total > 0 ? -r.top / total : 0;
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        const eased = 1 - Math.pow(1 - p, 1.6); // ease-out for a soft finish
        const iy = ((1 - eased) * vh * 0.3).toFixed(1);
        const ix = ((1 - eased) * vw * 0.32).toFixed(1);
        const rad = ((1 - eased) * 18).toFixed(1);
        const clip =
          "inset(" + iy + "px " + ix + "px " + iy + "px " + ix + "px round " + rad + "px)";
        expandBox.style.clipPath = clip;
        expandBox.style.webkitClipPath = clip; // older WebKit/Safari

      }
    }
    // On resize the scroll position may be unchanged, so force a recompute
    // (parallax offsets + the expand-box clip-path depend on viewport size).
    const onResize = () => {
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
    if (scrollCue && hero) {
      let cueRaf = null;
      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const onCueClick = () => {
        const next = hero.nextElementSibling;
        const targetY = next
          ? next.getBoundingClientRect().top + window.pageYOffset
          : window.innerHeight;

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
