"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* =========================================================================
   SAGE THREAD — interactions (ported from the original js/main.js)
   Runs after each route renders so IntersectionObservers, the rAF scroll
   loop, counters and form handlers re-bind to the freshly mounted DOM.
   All listeners/observers are torn down on cleanup to avoid stacking across
   client-side navigations.
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

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll("[data-reveal], [data-img]");
    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
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

    /* ---------- Counters ---------- */
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window) {
      const cObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseFloat(el.getAttribute("data-count"));
            const suffix = el.getAttribute("data-suffix") || "";
            const dur = 1600;
            let start = null;
            if (reduceMotion) {
              el.textContent = target + suffix;
              cObs.unobserve(el);
              return;
            }
            function step(ts) {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            cObs.unobserve(el);
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((c) => cObs.observe(c));
      cleanups.push(() => cObs.disconnect());
    }

    /* ---------- Header state + parallax (single rAF loop) ---------- */
    const header = document.querySelector("[data-header]");
    const parallaxEls = reduceMotion
      ? []
      : Array.prototype.slice.call(
          document.querySelectorAll("[data-parallax]")
        );
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
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    });

    /* ---------- Hero entrance ---------- */
    const hero = document.querySelector(".hero");
    if (hero) {
      requestAnimationFrame(() => hero.classList.add("loaded"));
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
