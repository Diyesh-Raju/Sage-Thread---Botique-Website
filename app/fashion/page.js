import "../fashion.css";
import Header from "@/components/Header";
import CollectionsCarousel from "@/components/CollectionsCarousel";
import TheLook from "@/components/TheLook";
import FashionParallax from "@/components/FashionParallax";
import StyleCarousel from "@/components/StyleCarousel";
import ScrollStroke from "@/components/ScrollStroke";
import LuminaSlider from "@/components/LuminaSlider";
import EmeraldFeature from "@/components/EmeraldFeature";
import JewelDirectory from "@/components/JewelDirectory";
import SignatureCarousel from "@/components/SignatureCarousel";
import EditorialStack from "@/components/EditorialStack";
import TrustGlass from "@/components/TrustGlass";
import Faq from "@/components/Faq";
import { faqItems } from "@/components/faqData";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { PAGE_SEO } from "@/lib/metadata";

export const metadata = PAGE_SEO.fashion;

export const viewport = { themeColor: "#160f15" };

const collectionItems = [
  { name: "Jewelry", img: "/assets/img/collection-jewelry.jpg", alt: "Emerald and diamond statement ring — fine jewellery at Sage Thread Boutique Bangalore" },
  { name: "Modern Aesthetic", img: "/assets/img/collection-modern.jpg", pos: "top", alt: "Modern minimalist summer dress — contemporary women's fashion at Sage Thread Bengaluru" },
  { name: "High Jewelry", img: "/assets/img/collection-high-jewelry.jpg", alt: "Ornate gold and polki high jewellery necklace at Sage Thread Boutique Bangalore" },
  { name: "Traditional Fashion", img: "/assets/img/collection-traditional.jpg", pos: "top", alt: "Gold tissue lehenga with rose dupatta — traditional Indian wear at Sage Thread Bangalore" },
  { name: "Timeless Pieces", img: "/assets/img/collection-timeless.jpg", pos: "top", alt: "Printed halter top with wide-leg trousers — timeless boutique clothing at Sage Thread" },
  { name: "Men's Fashion", img: "/assets/img/collection-mens.jpg", alt: "Ribbed knit polo and tailored trousers — men's fashion at Sage Thread Boutique Bangalore" },
];

// "The Look" — the finished outfit and every piece that builds it
const lookOutfit = {
  img: "/assets/img/the-look-main.jpg",
  alt: "Navy linen shirt with white trousers and suede loafers — men's look styled at Sage Thread Boutique Bangalore",
};
const lookPieces = [
  { name: "Navy Shirt", material: "Cotton", img: "/assets/img/look-piece-shirt.jpg", alt: "Navy blue slim-fit shirt — Sage Thread Boutique" },
  { name: "White Linen Trousers", material: "Linen", img: "/assets/img/look-piece-trousers.jpg", alt: "White drawstring linen trousers — Sage Thread Boutique" },
  { name: "Suede Loafers", material: "Suede", img: "/assets/img/look-piece-loafers.jpg", alt: "Beige suede penny loafers — Sage Thread Boutique" },
];

export default function FashionPage() {
  const year = new Date().getFullYear();
  return (
    <div className="page--fashion">
      <JsonLd
        data={[
          webPageSchema({
            path: "/fashion",
            name: "Curated Fashion & Atelier Wardrobes | Sage Thread",
            description: PAGE_SEO.fashion.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Fashion", url: `${SITE_URL}/fashion` },
          ]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Bungee&family=Cormorant+Garamond:wght@400;500;600&family=Italiana&family=Montserrat:wght@300;400;500&family=Pinyon+Script&family=Quicksand:wght@500;600&family=Yatra+One&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" as="image" href="/assets/img/fashion-hero-beach.jpg" />

      <Header />

      <main>
        <section className="hero hero--fashion">
          <div className="hero__media">
            <img
              src="/assets/img/fashion-hero-beach.jpg"
              alt="Designer women's fashion at Sage Thread Boutique Bangalore"
              title="Designer Wear — Sage Thread Bangalore"
            />
            {/* progressive right-side blur — two stacked, masked copies ramp
                the blur from mid-frame to a soft dream at the right edge */}
            <div className="hero__blur" aria-hidden="true">
              <img src="/assets/img/fashion-hero-beach.jpg" alt="" />
            </div>
            <div className="hero__blur hero__blur--2" aria-hidden="true">
              <img src="/assets/img/fashion-hero-beach.jpg" alt="" />
            </div>
          </div>
          <div className="hero__inner hero__inner--right container">
            <h1 className="hero__title fashion-hero__title" data-stagger style={{ "--sd": ".22s" }}>
              <span className="fashion-hero__script">Fashion,</span>
              <span className="fashion-hero__line">The Canvas of Your Soul</span>
            </h1>
            <div className="fashion-hero__cta" data-stagger style={{ "--sd": ".42s" }}>
              <a href="#collections" className="btn btn--solid">
                Explore Our Collection <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="scroll-cue">Scroll</div>
        </section>

        <section className="section collections-section" id="collections" data-reveal>
          <div className="container">
            <CollectionsCarousel items={collectionItems} />
          </div>
        </section>

        {/* full-bleed reel — fills the viewport and loops silently forever */}
        <section className="fashion-reel" aria-label="Sage Thread collection film">
          <video
            className="fashion-reel__video"
            src="/assets/video/collections-reel.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </section>

        <TheLook look={lookOutfit} pieces={lookPieces} />

        {/* Shop by gender — two oval portraits with script labels */}
        <section className="genders" aria-label="Shop by men or women">
          <div className="container genders__grid">
            <a className="gender gender--men" href="/contact" data-reveal>
              <div className="gender__frame">
                <img
                  src="/assets/img/gender-men.jpg"
                  alt="Man in a black shirt and sunglasses — men's fashion at Sage Thread Boutique Bangalore"
                  title="Men — Sage Thread"
                  loading="lazy"
                />
              </div>
              <span className="gender__label">Men</span>
            </a>
            <a className="gender" href="/contact" data-reveal style={{ "--d": ".12s" }}>
              <div className="gender__frame">
                <img
                  src="/assets/img/gender-women.jpg"
                  alt="Woman in a cream trench coat and black dress — women's fashion at Sage Thread Boutique Bangalore"
                  title="Women — Sage Thread"
                  loading="lazy"
                />
              </div>
              <span className="gender__label">Women</span>
            </a>
          </div>
        </section>

        <FashionParallax />

        <StyleCarousel />

        <ScrollStroke />

        <LuminaSlider />

        <EmeraldFeature />

        <JewelDirectory />

        <SignatureCarousel />

        <EditorialStack />

        <TrustGlass />

        <section className="section faq-section">
          <div className="container">
            <p className="eyebrow faq-eyebrow" data-reveal>
              Frequently Asked Questions
            </p>
            <div data-reveal>
              <Faq items={faqItems} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-cta" data-reveal>
            <p className="eyebrow">Personal styling</p>
            <h2>Book a Fashion Consultation</h2>
            <p className="lead mt-1" style={{ color: "rgba(255,255,255,.7)" }}>
              One-to-one styling with our Bangalore atelier — in store or by
              appointment.
            </p>
            <div className="mt-2">
              <a href="/contact" className="btn btn--solid">
                Schedule a Boutique Visit <span className="arrow">→</span>
              </a>
            </div>
          </div>
          <div className="footer-grid" data-reveal>
            <div className="footer-brand">
              <a className="brand" href="/">
                Sage Thread<span>boutique</span>
              </a>
              <p>
                A luxury women&apos;s fashion boutique in Bangalore — designer
                wear, boutique clothing, and custom styling since 2014.
              </p>
            </div>
            <div>
              <h4>Collections</h4>
              <a href="/fashion">Women&apos;s Fashion</a>
              <br />
              <a href="/furniture">Designer Dresses</a>
              <br />
              <a href="/marble">Ethnic Wear</a>
              <br />
              <a href="/">Home</a>
            </div>
            <div>
              <h4>Fashion</h4>
              <a href="#collections">Collections</a>
              <br />
              <a href="#collections">Ready-to-Wear</a>
              <br />
              <a href="/contact">Custom Styling</a>
              <br />
              <a href="/contact">Fashion Consultation</a>
            </div>
            <div>
              <h4>Visit</h4>
              <a href="/contact">Book Appointment</a>
              <br />
              <a href="/contact">Sizing &amp; Fitting</a>
              <br />
              <a href="/contact">Alterations</a>
              <br />
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom" data-reveal>
            <span>© {year} Sage Thread Boutique · Bengaluru</span>
            <span>Crafted with care · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
