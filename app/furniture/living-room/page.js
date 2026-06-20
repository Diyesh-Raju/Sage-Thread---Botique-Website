import "../../furniture.css";
import Link from "next/link";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/business";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Living Room Collection",
  description:
    "Explore the Living Room collection at Sage Thread — sculptural sofas and statement seating, made to order in premium finishes.",
  path: "/furniture/living-room",
});

export const viewport = { themeColor: "#241b14" };

const PRODUCTS = [
  {
    name: "The Velvet Wave",
    category: "Curved 3-seat sofa",
    images: [
      "/assets/img/products/velvet-wave-1.jpg",
      "/assets/img/products/velvet-wave-2.jpg",
      "/assets/img/products/velvet-wave-3.jpg",
    ],
    swatches: ["#c9b79c", "#9c8568", "#6f5b44", "#2f2a24"],
    moreSwatches: 6,
    info: "Available in 7 finishes · 3 dimensions",
  },
  {
    name: "The Marshmallow",
    category: "Large 3-seat sofa",
    badge: "Customize",
    images: [
      "/assets/img/products/marshmallow-1.jpg",
      "/assets/img/products/marshmallow-2.jpg",
      "/assets/img/products/marshmallow-3.jpg",
    ],
    swatches: ["#d8cdbb", "#b59f86", "#8a7156", "#c46a36"],
    moreSwatches: 5,
    info: "Available in 8 finishes · 4 dimensions",
  },
];

const EMPTY_SLOTS = 3;

export default function LivingRoomPage() {
  return (
    <div className="page--furniture">
      <JsonLd
        data={[
          webPageSchema({
            path: "/furniture/living-room",
            name: "Living Room Collection | Sage Thread",
            description: metadata.description,
          }),
          breadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Furniture", url: `${SITE_URL}/furniture` },
            { name: "Living Room", url: `${SITE_URL}/furniture/living-room` },
          ]),
        ]}
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Marcellus&family=Mulish:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <Header />

      <main className="collection">
        <div className="container">
          <nav className="collection__crumbs" aria-label="Breadcrumb">
            <Link href="/furniture">Furniture</Link>
            <span aria-hidden="true">/</span>
            <span>Living Room</span>
          </nav>

          <header className="collection__head" data-reveal>
            <p className="eyebrow">Sage Thread · Furniture</p>
            <h1>Living Room</h1>
            <p className="lead measure">
              Sculptural sofas and statement seating, each made to order in
              premium finishes and dimensions to suit your space.
            </p>
            <span className="collection__count">
              {PRODUCTS.length} Products
            </span>
          </header>

          <div className="pgrid" data-reveal>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}

            {Array.from({ length: EMPTY_SLOTS }).map((_, i) => (
              <article className="pcard pcard--empty" key={`empty-${i}`}>
                <div className="pcard__stage pcard__stage--empty">
                  <span className="pcard__soon">Coming soon</span>
                </div>
                <div className="pcard__body">
                  <h3 className="pcard__name pcard__name--muted">&nbsp;</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
