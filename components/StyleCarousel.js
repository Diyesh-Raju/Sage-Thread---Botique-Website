"use client";

/* Full-viewport figurine carousel (the "3D Collectible Hero" layout), reworked
   for Sage Thread: three styled models rotate through a centre stage while the
   page colour crossfades to match the outfit. Roles are derived from the active
   index — centre, left, right — so with three slides every model always has a
   place on stage. */

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./StyleCarousel.css";

/* Each style sets its own type, so the name reads as the thing it names:
   urban signage for street wear, soft rounded for comfort, a high-fashion
   didone for timeless, a Devanagari-flavoured face for traditional. The
   faces differ enormously in weight and x-height, so size/tracking travel
   with the family rather than living in the stylesheet. */
const SLIDES = [
  {
    name: "Street Wear",
    src: "/assets/img/style-streetwear.png",
    alt: "Woman in a white racer tank and navy wide-leg track pants — streetwear at Sage Thread Boutique Bangalore",
    bg: "#1B2A4E",
    ink: "#ffffff",
    type: {
      fontFamily: '"Bungee", "Anton", sans-serif',
      fontWeight: 400,
      fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)",
      letterSpacing: ".02em",
      textTransform: "uppercase",
    },
  },
  {
    name: "Comfort Clothes",
    src: "/assets/img/style-comfort.png",
    alt: "Woman in an oatmeal hoodie and matching joggers — comfort wear at Sage Thread Boutique Bangalore",
    /* Slightly deeper taupe so white sneakers stay distinct against the stage */
    bg: "#8E8574",
    ink: "#ffffff",
    type: {
      fontFamily: '"Quicksand", "Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
      letterSpacing: ".14em",
      textTransform: "lowercase",
    },
  },
  {
    name: "Timeless Fashion",
    src: "/assets/img/style-timeless.png",
    alt: "Woman in a cream trench coat over a black slip dress — timeless fashion at Sage Thread Boutique Bangalore",
    bg: "#F2EADC",
    /* white would vanish on cream — this slide runs on the site's dark ink */
    ink: "#1D1419",
    type: {
      fontFamily: '"Bodoni Moda", "Italiana", serif',
      fontWeight: 400,
      fontStyle: "italic",
      fontSize: "clamp(1.6rem, 3.4vw, 2.6rem)",
      letterSpacing: ".06em",
      textTransform: "none",
    },
  },
  {
    name: "Traditional",
    src: "/assets/img/style-traditional.png",
    alt: "Woman in a mirror-work blouse and printed sharara with a cape — traditional Indian wear at Sage Thread Boutique Bangalore",
    bg: "#B9836F",
    ink: "#ffffff",
    type: {
      fontFamily: '"Yatra One", "Bodoni Moda", serif',
      fontWeight: 400,
      fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
      letterSpacing: ".04em",
      textTransform: "none",
    },
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")";

const EASE = "cubic-bezier(.4,0,.2,1)";
const DUR = 650;
const AUTOPLAY = 1700;

export default function StyleCarousel() {
  const [active, setActive] = useState(0);
  /* a ref, not state: re-rendering on lock/unlock would restart the autoplay
     timer twice per slide and stretch the interval past 1.7s */
  const locked = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [onStage, setOnStage] = useState(false);
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = useCallback((dir) => {
    if (locked.current) return;
    locked.current = true;
    setActive((i) => (dir === "next" ? (i + 1) % SLIDES.length : (i + SLIDES.length - 1) % SLIDES.length));
    setTimeout(() => {
      locked.current = false;
    }, DUR);
  }, []);

  /* only run while the section is actually on screen — an off-screen carousel
     ticking away is wasted paint, and it would land the user mid-rotation */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnStage(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* advances every 1.7s; keyed on `active` so a manual click restarts the wait */
  useEffect(() => {
    if (!onStage || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => navigate("next"), AUTOPLAY);
    return () => clearTimeout(t);
  }, [active, onStage, hovered, navigate]);

  const roleOf = (i) => {
    if (i === active) return "center";
    if (i === (active + SLIDES.length - 1) % SLIDES.length) return "left";
    if (i === (active + 1) % SLIDES.length) return "right";
    return "back";
  };

  const styleFor = (role) => {
    if (role === "center") {
      return {
        left: "50%",
        bottom: 0,
        /* the cut-outs are trimmed tight to the subject, so the figure is
           sized by height alone — no scale-up, or the head leaves the stage */
        height: isMobile ? "62%" : "86%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };
    }
    if (role === "back") {
      return {
        left: "50%",
        bottom: isMobile ? "32%" : "12%",
        height: isMobile ? "13%" : "22%",
        transform: "translateX(-50%) scale(1)",
        filter: "blur(4px)",
        opacity: 1,
        zIndex: 5,
      };
    }
    return {
      left: role === "left" ? (isMobile ? "20%" : "30%") : isMobile ? "80%" : "70%",
      bottom: isMobile ? "32%" : "12%",
      height: isMobile ? "16%" : "28%",
      transform: "translateX(-50%) scale(1)",
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
    };
  };

  const slide = SLIDES[active];

  return (
    <section
      className="stylecar"
      aria-label="Shop by style"
      style={{
        backgroundColor: slide.bg,
        color: slide.ink,
        transition: `background-color ${DUR}ms ${EASE}, color ${DUR}ms ${EASE}`,
      }}
    >
      <div
        className="stylecar__stage"
        ref={stageRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="stylecar__grain" style={{ backgroundImage: GRAIN }} />

        <div className="stylecar__track">
          {SLIDES.map((s, i) => {
            const role = roleOf(i);
            return (
              <div
                key={s.src}
                className="stylecar__figure"
                style={{
                  ...styleFor(role),
                  transition: `transform ${DUR}ms ${EASE}, filter ${DUR}ms ${EASE}, opacity ${DUR}ms ${EASE}, left ${DUR}ms ${EASE}, bottom ${DUR}ms ${EASE}, height ${DUR}ms ${EASE}`,
                }}
              >
                <img src={s.src} alt={s.alt} title={`${s.name} — Sage Thread`} draggable={false} />
              </div>
            );
          })}
        </div>

        <div className="stylecar__copy">
          {/* keyed on the name so React swaps the node and the fade-in
              replays each time the style changes */}
          <p key={slide.name} className="stylecar__title" style={slide.type}>
            {slide.name}
          </p>
          <p className="stylecar__blurb">
            Pieces chosen one at a time, fitted in the atelier and finished by hand. Walk in, try the
            rail, leave with a wardrobe that already fits. Book a styling visit.
          </p>
          <div className="stylecar__nav">
            <button type="button" onClick={() => navigate("prev")} aria-label="Previous style">
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={() => navigate("next")} aria-label="Next style">
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <a className="stylecar__cta" href="/contact">
          Discover it
          <ArrowRight strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}
