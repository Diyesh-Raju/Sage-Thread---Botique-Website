import { Lightbulb, Home, Hammer, Sofa } from "lucide-react";

const SERVICES = [
  {
    Icon: Lightbulb,
    title: "Fashion Consultation",
    desc: "Every perfect look begins with a conversation. Book a complimentary fashion consultation at our Bangalore boutique — in store or by appointment — and our stylists will help shape your wardrobe vision.",
  },
  {
    Icon: Home,
    title: "Personal Styling",
    desc: "Our in-house team handles complete look curation — from silhouette selection to accessory pairing — so you arrive at every occasion confident and beautifully dressed.",
  },
  {
    Icon: Hammer,
    title: "Custom Stitching",
    desc: "Have a specific designer dress in mind? Our master tailors create tailor-made outfits in premium fabrics, finished by hand to your exact measurements and style.",
  },
  {
    Icon: Sofa,
    title: "Ready-to-Wear",
    desc: "Prefer to take it home today? Explore our curated ready-to-wear designer dresses — boutique pieces held in stock at our Indiranagar store, ready for fitting.",
  },
];

export default function FurnitureServices() {
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head sec-head--center" data-reveal>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)" }}>Boutique Services</h2>
        </div>
        <div className="services-grid" data-reveal>
          {SERVICES.map(({ Icon, title, desc }) => (
            <article className="service-card" key={title}>
              <span className="service-card__icon" aria-hidden="true">
                <Icon size={26} strokeWidth={1.75} />
              </span>
              <h3 className="service-card__title">{title}</h3>
              <span className="service-card__divider" />
              <p className="service-card__desc">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
