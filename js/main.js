/* =========================================================================
   SAGE THREAD — interactions
   Designed for buttery-smooth, lag-free behaviour on every browser:
   - Scroll reveals via IntersectionObserver (no scroll math per element)
   - One throttled rAF scroll loop for header state + parallax
   - transform/opacity only, passive listeners, reduced-motion aware
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia("(hover: none)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var body = document.body;
  if (toggle) {
    toggle.addEventListener("click", function () {
      body.classList.toggle("nav-open");
    });
    document.querySelectorAll("[data-nav] a").forEach(function (a) {
      a.addEventListener("click", function () { body.classList.remove("nav-open"); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal], [data-img]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target); // reveal once -> no further work
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1600, start = null;
        if (reduceMotion) { el.textContent = target + suffix; cObs.unobserve(el); return; }
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObs.observe(c); });
  }

  /* ---------- Header state + parallax (single rAF loop) ---------- */
  var header = document.querySelector("[data-header]");
  var parallaxEls = reduceMotion ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;
  var lastY = -1;

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  function update() {
    ticking = false;
    var y = window.pageYOffset;
    if (y === lastY) return;
    lastY = y;
    if (header) header.classList.toggle("scrolled", y > 24);

    if (parallaxEls.length) {
      var vh = window.innerHeight;
      for (var i = 0; i < parallaxEls.length; i++) {
        var el = parallaxEls[i];
        var rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue; // skip offscreen
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();

  /* ---------- Hero entrance ---------- */
  var hero = document.querySelector(".hero");
  if (hero) {
    requestAnimationFrame(function () { hero.classList.add("loaded"); });
  }

  /* ---------- Footer year ---------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Newsletter (demo, no backend) ---------- */
  var nf = document.querySelector("[data-newsletter]");
  if (nf) {
    nf.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var btn = nf.querySelector("button");
      if (btn) { btn.textContent = "Merci ✦"; btn.disabled = true; }
      nf.querySelector("input").value = "";
    });
  }

  /* ---------- Contact form (demo, no backend) ---------- */
  var cf = document.querySelector("[data-contact-form]");
  if (cf) {
    cf.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var note = cf.querySelector("[data-form-note]");
      if (note) { note.hidden = false; }
      cf.reset();
    });
  }

  /* ---------- Tilt on pointer (cards) — desktop only, GPU transform ---------- */
  if (!isTouch && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var raf = null;
      el.addEventListener("pointermove", function (e) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = null;
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg)";
        });
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }
})();
