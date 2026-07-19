"use client";

/* Four-column parallax gallery (Skiper30), ported to JS + plain CSS.
   Each column drifts up at its own rate as the band crosses the viewport.
   Lenis from the original is intentionally omitted — a global smooth-scroll
   would hijack the hero, the reel and every IntersectionObserver reveal on
   the page. */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./FashionParallax.css";

const images = [
  { src: "/assets/img/fashion-1.jpg", alt: "Woman in a maroon wool coat with shopping bags — designer women's wear at Sage Thread Bangalore" },
  { src: "/assets/img/gender-men.jpg", alt: "Man in a black shirt and sunglasses — men's fashion at Sage Thread Boutique" },
  { src: "/assets/img/fashion-5.jpg", alt: "Woman in a blush coat and printed scarf — boutique outerwear at Sage Thread" },

  { src: "/assets/img/collection-mens.jpg", alt: "Man in a grey knit sweater on a city street — men's fashion at Sage Thread" },
  { src: "/assets/img/fashion-3.jpg", alt: "Model in a black jacket and red top with statement sunglasses — Sage Thread Boutique" },
  { src: "/assets/img/home-intro-fashion.jpg", alt: "Two women in tailored coats — curated women's fashion at Sage Thread Bangalore" },

  { src: "/assets/img/fashion-6.jpg", alt: "Woman in a powder-blue trench coat in Milan — designer outerwear at Sage Thread" },
  { src: "/assets/img/the-look-main.jpg", alt: "Man in a navy linen shirt and white trousers — styled look at Sage Thread" },
  { src: "/assets/img/collection-traditional.jpg", alt: "Gold tissue lehenga with rose dupatta — traditional Indian wear at Sage Thread" },

  { src: "/assets/img/gender-women.jpg", alt: "Woman in a cream trench coat and black dress — women's fashion at Sage Thread" },
  { src: "/assets/img/fashion-hero.jpg", alt: "Model in a blush ruffled off-shoulder dress — occasion wear at Sage Thread Bangalore" },
  { src: "/assets/img/collection-modern.jpg", alt: "Woman in a cream summer dress — contemporary women's fashion at Sage Thread" },
];

function Column({ items, y, className }) {
  return (
    <motion.div className={`fparallax__col ${className}`} style={{ y }}>
      {items.map((img) => (
        <div className="fparallax__cell" key={img.src}>
          <img src={img.src} alt={img.alt} loading="lazy" />
        </div>
      ))}
    </motion.div>
  );
}

export default function FashionParallax() {
  const gallery = useRef(null);
  const [height, setHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  /* travel is measured against the band's own height, not the viewport's —
     tying it to innerHeight makes the columns overshoot on phones, where the
     band is short but the viewport is tall */
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 1.15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.9]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.7]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.7]);

  useEffect(() => {
    const resize = () => setHeight(gallery.current?.offsetHeight ?? 0);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className="fparallax" aria-label="Sage Thread model gallery">
      <div className="fparallax__band" ref={gallery}>
        <Column items={images.slice(0, 3)} y={y1} className="fparallax__col--1" />
        <Column items={images.slice(3, 6)} y={y2} className="fparallax__col--2" />
        <Column items={images.slice(6, 9)} y={y3} className="fparallax__col--3" />
        <Column items={images.slice(9, 12)} y={y4} className="fparallax__col--4" />
      </div>
    </section>
  );
}
