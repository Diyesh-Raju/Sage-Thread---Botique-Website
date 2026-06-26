"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  PenTool,
  Home,
  Building2,
  Ruler,
  PaintBucket,
  Sparkles,
  Calendar,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

/* "About the house" section — a 21st.dev-style about block adapted to this
   project's stack (plain JS + CSS, lucide icons, the site's data-reveal
   observer + CSS animation instead of Tailwind/framer-motion). Service cards
   flank a central arched image of a marble staircase; animated stat counters
   and a CTA sit below. Placed right under the Curated Collections carousel. */

const SERVICES = [
  { icon: PenTool, title: "Bespoke Design", desc: "Drawings tailored to your space and the stone you choose." },
  { icon: Home, title: "Interior Stonework", desc: "Floors, walls, basins and sculptural detail in natural stone." },
  { icon: Building2, title: "Architectural Marble", desc: "Staircases and statement structures shaped from solid stone." },
  { icon: Ruler, title: "Made to Measure", desc: "Hand-cut and fitted to the millimetre for your space." },
  { icon: PaintBucket, title: "Finishing & Honing", desc: "Polished, honed or brushed surfaces, finished by hand." },
  { icon: Sparkles, title: "Restoration & Care", desc: "Bringing tired marble and stone back to life." },
];

const STATS = [
  { icon: Calendar, value: 12, suffix: "+", label: "Years of craft" },
  { icon: Building2, value: 500, suffix: "+", label: "Projects delivered" },
  { icon: Users, value: 40, suffix: "+", label: "Master artisans" },
  { icon: Award, value: 100, suffix: "%", label: "Hand-finished" },
];

function Stat({ icon: Icon, value, suffix, label, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    let raf;
    const start = performance.now();
    const dur = 1500;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <div className="mabout__stat">
      <Icon className="mabout__statIcon" size={26} strokeWidth={1.4} aria-hidden="true" />
      <span className="mabout__statNum">
        {n}
        {suffix}
      </span>
      <span className="mabout__statLabel">{label}</span>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc }) {
  return (
    <div className="mabout__card" data-reveal>
      <span className="mabout__icon">
        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="mabout__cardText">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function MarbleAbout() {
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="mabout" data-reveal="fade">
      <div className="container">
        <div className="mabout__head">
          <p className="eyebrow" data-reveal>
            About the house
          </p>
          <h2 data-reveal>Natural stone, shaped into living spaces</h2>
          <p className="lead measure" data-reveal>
            For over a decade, Sage Thread has hand-selected marble and natural
            stone at the quarry and crafted it into interiors made to be lived in
            for generations — staircases, surfaces and sculptural detail,
            finished entirely by hand.
          </p>
        </div>

        <div className="mabout__showcase">
          <div className="mabout__col mabout__col--left">
            {SERVICES.slice(0, 3).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          <figure className="mabout__figure" data-reveal>
            <img
              src="/assets/img/marble-about.jpg"
              alt="A sculptural curved marble staircase lit from beneath in a travertine-walled interior — Sage Thread natural stone"
              loading="lazy"
              decoding="async"
            />
            <div className="mabout__badge" aria-hidden="true">
              <svg className="mabout__badgeRing" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="mabout-ring"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  />
                </defs>
                <text>
                  <textPath href="#mabout-ring">
                    SAGE THREAD · NATURAL STONE · EST. 2014 ·
                  </textPath>
                </text>
              </svg>
              <Sparkles className="mabout__badgeIcon" size={26} strokeWidth={1.4} aria-hidden="true" />
            </div>
          </figure>

          <div className="mabout__col mabout__col--right">
            {SERVICES.slice(3, 6).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        <div className="mabout__stats" ref={statsRef}>
          {STATS.map((s) => (
            <Stat key={s.label} {...s} run={statsInView} />
          ))}
        </div>

        <div className="mabout__cta" data-reveal>
          <Link href="/contact" className="btn btn--solid">
            Book a consultation{" "}
            <span className="arrow">
              <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
