"use client";

/* Lumina interactive list (21st.dev), ported to JS + plain CSS.
   Four photographs in a contained box. Each hands over to the next through a
   bubble of glass that swells out of the middle, bending and splitting the
   arriving picture around its wall.

   Three things about the original could not come across as written:

   - It pulls GSAP and three.js off cdnjs at runtime. This site is prerendered
     and served static, so a third-party script on the critical path of a
     section is both a rendering risk and a deploy one. three.js in particular
     buys nothing here: the whole effect is one screen-filling quad and one
     fragment shader, which is the ~70 lines of plain WebGL below, against some
     600KB of library. GSAP's two jobs — tweening the transition and staggering
     the letters — are a rAF loop and a CSS keyframe respectively.
   - It renders continuously, forever, from the moment it mounts. Off-screen
     that is a GPU held awake for nothing. The picture only moves while a
     handover is running, so that is the only time this draws.
   - It fills the viewport. This one sits in a box (see LuminaSlider.css).

   Six slides became four, which is also why the counter reads /04. */

import { useCallback, useEffect, useRef, useState } from "react";
import "./LuminaSlider.css";

/* The four photographs are shipped 16:9, at the largest crop of each frame that
   still centres its subject. The box is a wide letterbox on a desktop and
   upright on a phone, so one file has to compose into both: 16:9 loses only the
   top and bottom to the desktop crop, while the phone's upright crop keeps the
   middle ~45% of the width — which is why the subject has to be centred rather
   than the frame. Untouched masters are kept out of the repo in
   media-source/lumina/.

   These frames are ~1280px to begin with, so they are shipped at their own size
   rather than padded out to a fixed one; `w` is each file's real width, because
   the srcset below has to describe them honestly for the browser to choose
   between them. Swapping in a different shoot: centre the subject, and keep it
   out of the top and bottom sixth or the desktop crop will clip it. */
const SLIDES = [
  {
    img: "/assets/img/lumina-1.jpg",
    w: 1152,
    title: "Brilliant Cut",
    desc: "Fifty-eight facets, set high off the finger so the stone always has light to work with.",
    alt: "Model wearing a diamond necklace, bracelet and rings by the sea — high jewellery at Sage Thread Boutique Bangalore",
  },
  {
    img: "/assets/img/lumina-2.jpg",
    w: 1060,
    title: "Temple Gold",
    desc: "Twenty-two carat, struck rather than cast — you feel the weight of it before you read the work.",
    alt: "Model in a gold tissue saree with a temple gold necklace and waist belt beside a lotus pond — bridal gold at Sage Thread Boutique Bangalore",
  },
  {
    img: "/assets/img/lumina-3.jpg",
    w: 1228,
    title: "Uncut Polki",
    desc: "Flat uncut diamond bedded on gold foil, so the shine comes up lamplit instead of sharp and white.",
    alt: "Model holding a lotus, wearing an uncut polki necklace and earrings — polki jewellery at Sage Thread Boutique Bangalore",
  },
  {
    img: "/assets/img/lumina-4.jpg",
    w: 1280,
    title: "The Bridal Set",
    desc: "Seven rows sitting high on the throat. Everything else worn that day is chosen around it.",
    alt: "Model in a diamond and sapphire bridal choker with layered chains — bridal jewellery at Sage Thread Boutique Bangalore",
  },
];

/* A phone is showing the picture in a ~350px box, so it loads a set cut to 62%
   instead — a quarter of the texture memory for a box that cannot resolve the
   difference. The poster below carries the matching srcset, so whichever file
   the texture asks for is the one already in the cache. */
const small = (src) => src.replace(/\.jpg$/, "-sm.jpg");
const SMALL_SCALE = 0.62;

/* how long the glass takes to cross the box, and how long a slide is held
   once it has arrived. the pair is the full cycle — the progress line under
   each title runs for the hold only, as in the original. */
const CROSS_MS = 1500;
const HOLD_MS = 5000;

/* The glass, at the original's "Default" preset. These are constants rather
   than uniforms because nothing animates them — the preset picker they came
   from is not part of this. Folded into the shader source below. */
const GLASS = {
  refraction: 1.0,   /* how hard the wall bends what is behind it */
  chromatic: 1.0,    /* how far the channels split along that bend */
  clarity: 1.0,      /* how much of the middle stays undistorted */
  edgeGlow: 1.0,     /* the catch of light riding the wall */
  flow: 1.0,         /* the liquid wobble, strongest near the wall */
};

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;

uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2 uSize;       /* the canvas, in device pixels */
uniform vec2 uFromSize;   /* each photograph at its own natural size */
uniform vec2 uToSize;
uniform float uProgress;

varying vec2 vUv;

/* object-fit: cover, done here — the photographs are not the box's shape */
vec2 coverUV(vec2 uv, vec2 art) {
  float scale = max(uSize.x / art.x, uSize.y / art.y);
  vec2 shown = art * scale;
  return (uv * uSize - (uSize - shown) * 0.5) / shown;
}

void main() {
  vec2 fromUV = coverUV(vUv, uFromSize);
  vec2 toUV = coverUV(vUv, uToSize);

  vec2 px = vUv * uSize;
  vec2 mid = uSize * 0.5;
  float dist = length(px - mid);
  float radius = uProgress * length(uSize) * 0.85;

  /* 1 inside the bubble, 0 outside it, with a few pixels of feather at the
     wall so the edge is not a staircase */
  float inside = smoothstep(radius + 3.0, radius - 3.0, dist);

  /* how far out towards the wall this pixel sits. clamped, because on the
     opening frame the radius is nearly zero and the ratio runs away — which
     would throw the wobble below into a wild sample of the picture. Everything
     downstream of this saturates well before 2.0. */
  float edge = min(dist / max(radius, 0.001), 2.0);
  vec2 out_ = dist > 0.0 ? (px - mid) / dist : vec2(0.0);

  /* the glass is thickest at the wall and clear through the middle */
  float bend = 0.08 * ${GLASS.refraction.toFixed(2)}
             * pow(smoothstep(0.3 * ${GLASS.clarity.toFixed(2)}, 1.0, edge), 1.5);
  vec2 uv = toUV - out_ * bend;
  uv += vec2(sin(uProgress * 5.0 + edge * 10.0),
             cos(uProgress * 4.0 + edge * 8.0))
      * 0.015 * ${GLASS.flow.toFixed(2)} * edge * inside;

  /* the channels part along that same line, so the wall carries a prism */
  float split = 0.02 * ${GLASS.chromatic.toFixed(2)}
              * pow(smoothstep(0.3, 1.0, edge), 1.2);
  vec4 lit = vec4(
    texture2D(uTo, uv + out_ * split * 1.2).r,
    texture2D(uTo, uv + out_ * split * 0.2).g,
    texture2D(uTo, uv - out_ * split * 0.8).b,
    1.0);

  /* a thin light on the wall itself */
  float rim = smoothstep(0.95, 1.0, edge) * (1.0 - smoothstep(1.0, 1.01, edge));
  lit.rgb += rim * 0.08 * ${GLASS.edgeGlow.toFixed(2)};

  /* let the glass settle out over the last of the crossing, so the slide
     comes to rest as a clean photograph rather than a distorted one */
  lit = mix(lit, texture2D(uTo, toUV), smoothstep(0.95, 1.0, uProgress));

  gl_FragColor = mix(texture2D(uFrom, fromUV), lit, inside);
}`;

/* GSAP's power2.inOut — a cubic, the ease the handover was authored against */
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("LuminaSlider shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/* The photographs are not powers of two, so they get clamped edges and no
   mipmaps — the only filtering combination WebGL 1 allows for those. */
function upload(gl, img) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return { tex, w: img.naturalWidth, h: img.naturalHeight };
}

function buildStage(canvas, images) {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    /* one quad, drawn only while a slide is crossing — no reason to wake a
       discrete GPU for it */
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("LuminaSlider link:", gl.getProgramInfoLog(prog));
    return null;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  for (const name of ["uFrom", "uTo", "uSize", "uFromSize", "uToSize", "uProgress"]) {
    u[name] = gl.getUniformLocation(prog, name);
  }

  const textures = images.map((img) => upload(gl, img));
  gl.uniform1i(u.uFrom, 0);
  gl.uniform1i(u.uTo, 1);

  let from = 0;
  let to = 0;

  const stage = {
    pair(a, b) {
      from = a;
      to = b;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[from].tex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[to].tex);
      gl.uniform2f(u.uFromSize, textures[from].w, textures[from].h);
      gl.uniform2f(u.uToSize, textures[to].w, textures[to].h);
    },
    /* the backing store follows the box, capped so a 3x phone does not render
       nine times the pixels it can show */
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width === w && canvas.height === h) return false;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.uSize, w, h);
      return true;
    },
    draw(progress) {
      gl.uniform1f(u.uProgress, progress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    destroy() {
      textures.forEach((t) => gl.deleteTexture(t.tex));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };

  stage.resize();
  return stage;
}

export default function LuminaSlider() {
  const section = useRef(null);
  const canvas = useRef(null);

  const stage = useRef(null);
  const raf = useRef(0);
  const timer = useRef(0);
  const busy = useRef(false);
  const rest = useRef(0);      /* the slide the shader is resting on */
  const near = useRef(false);  /* section within reach of the viewport */
  const still = useRef(false); /* prefers-reduced-motion */

  const [live, setLive] = useState(false);
  const [index, setIndex] = useState(0);
  /* bumped whenever a hold begins, to restart the progress line under the
     active title — a CSS animation restarts by remounting, not by re-running */
  const [hold, setHold] = useState(0);
  /* The line under the active title measures the hold, so it may only run
     during one. The active title moves at the *start* of the crossing, a
     couple of seconds before the slide it belongs to has arrived, so keying
     the line off that alone had it fill part way, snap back and start over. */
  const [holding, setHolding] = useState(false);

  const clearTimer = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = 0;
  }, []);

  const queueNext = useCallback(() => {
    clearTimer();
    setHold((h) => h + 1);
    setHolding(true);
    if (still.current || !near.current || document.hidden) return;
    timer.current = setTimeout(() => {
      goRef.current((rest.current + 1) % SLIDES.length);
    }, HOLD_MS);
  }, [clearTimer]);

  /* `go` is reached from a timer that is scheduled inside `go` itself, so it
     is held in a ref rather than tangling the two in a dependency cycle */
  const goRef = useRef(null);

  const go = useCallback(
    (target) => {
      const st = stage.current;
      if (!st || busy.current || target === rest.current) return;

      busy.current = true;
      clearTimer();
      setHolding(false); /* nothing is being held while the glass is crossing */
      st.pair(rest.current, target);
      setIndex(target); /* the words and the counter move with the glass */

      const arrive = () => {
        rest.current = target;
        st.pair(target, target);
        st.draw(0);
        busy.current = false;
        queueNext();
      };

      if (still.current) {
        st.draw(1);
        arrive();
        return;
      }

      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / CROSS_MS);
        st.draw(ease(t));
        if (t < 1) raf.current = requestAnimationFrame(step);
        else arrive();
      };
      raf.current = requestAnimationFrame(step);
    },
    [clearTimer, queueNext]
  );

  goRef.current = go;

  /* ---- build ---------------------------------------------------------- */
  useEffect(() => {
    const el = section.current;
    if (!el) return;

    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dead = false;
    let started = false;

    const start = async () => {
      if (started) return;
      started = true;

      /* how many pixels across the box actually resolves to, at the cap the
         stage renders at */
      const need = (canvas.current?.clientWidth || 0) * Math.min(window.devicePixelRatio || 1, 2);
      const pick = need > 1200 ? (s) => s.img : (s) => small(s.img);

      const images = await Promise.all(
        SLIDES.map(
          (s) =>
            new Promise((res) => {
              const img = new Image();
              img.decoding = "async";
              img.onload = () => res(img);
              img.onerror = () => res(null);
              img.src = pick(s);
            })
        )
      );
      if (dead || images.some((i) => !i) || !canvas.current) return;

      const built = buildStage(canvas.current, images);
      if (dead || !built) return; /* no WebGL — the poster below stands in */

      stage.current = built;
      built.pair(0, 0);
      built.draw(0);
      setLive(true);
      queueNext();
    };

    /* nothing is fetched or compiled until the section is within reach —
       it sits a long way down a tall page */
    const io = new IntersectionObserver(
      ([entry]) => {
        near.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
        else clearTimer();
        if (entry.isIntersecting && stage.current && !busy.current) queueNext();
      },
      { rootMargin: "250px 0px" }
    );
    io.observe(el);

    /* a tab in the background gets no timers; it picks the cycle back up on
       return rather than firing everything it missed at once */
    const onVisible = () => {
      if (document.hidden) clearTimer();
      else if (near.current && stage.current && !busy.current) queueNext();
    };
    document.addEventListener("visibilitychange", onVisible);

    /* the box is fluid, so the backing store has to follow it. a resize
       mid-crossing is left alone — the running loop draws the next frame at
       the new size anyway. */
    const ro = new ResizeObserver(() => {
      const st = stage.current;
      if (st && st.resize() && !busy.current) st.draw(0);
    });
    if (canvas.current) ro.observe(canvas.current);

    return () => {
      dead = true;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
      clearTimeout(timer.current);
      cancelAnimationFrame(raf.current);
      stage.current?.destroy();
      stage.current = null;
    };
  }, [clearTimer, queueNext]);

  const slide = SLIDES[index];

  return (
    <section
      className={"lumina" + (live ? " is-live" : "") + (holding ? " is-holding" : "")}
      ref={section}
      style={{ "--hold": `${HOLD_MS}ms` }}
      aria-roledescription="carousel"
      aria-label="Sage Thread — jewellery in four frames"
    >
      <div className="lumina__stage">
        {/* stands in until the canvas is live, and stays the whole story for
            a browser without WebGL or a crawler reading the page */}
        <img
          className="lumina__poster"
          src={slide.img}
          srcSet={`${small(slide.img)} ${Math.round(slide.w * SMALL_SCALE)}w, ${slide.img} ${slide.w}w`}
          sizes="(max-width: 760px) 92vw, min(1240px, 100vw)"
          alt={slide.alt}
          loading="lazy"
          decoding="async"
        />
        <canvas className="lumina__canvas" ref={canvas} aria-hidden="true" />
        <div className="lumina__scrim" aria-hidden="true" />

        <span className="lumina__count lumina__count--now" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="lumina__count lumina__count--all" aria-hidden="true">
          {String(SLIDES.length).padStart(2, "0")}
        </span>

        {/* deliberately not a live region: this advances on its own every few
            seconds, and announcing each turn would talk over the reader. The
            poster's alt and the buttons below cover the same ground. */}
        <div className="lumina__copy">
          {/* keyed so each slide's letters mount fresh and run their entrance,
              and keyed on `live` as well so the first slide runs its own when
              the section arrives rather than silently back at page load. The
              four slides carry four different entrances. */}
          <h3
            className="lumina__title"
            key={`t${live}${index}`}
            data-anim={index % 4}
            aria-label={slide.title}
          >
            {Array.from(slide.title).map((ch, i) => (
              <span key={i} style={{ "--i": i }}>
                {/* inline-block letters collapse a plain space away */}
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h3>
          <p className="lumina__desc" key={`d${live}${index}`}>
            {slide.desc}
          </p>
        </div>

        <nav className="lumina__nav">
          {SLIDES.map((s, i) => (
            <button
              key={s.img}
              type="button"
              className="lumina__item"
              aria-current={i === index}
              aria-label={`Show ${s.title}`}
              onClick={() => go(i)}
            >
              <span className="lumina__line">
                <span className="lumina__fill" key={hold} />
              </span>
              <span className="lumina__label">{s.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
