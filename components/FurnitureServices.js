import { Lightbulb, Home, Hammer, Sofa } from "lucide-react";

/* "Our Services" — four cards, each with an icon tile straddling the top edge,
   a title, a divider and a description (per the provided sketch). */

const SERVICES = [
  {
    Icon: Lightbulb,
    title: "Consultations",
    desc: "Every great room begins with a conversation. Book a complimentary consultation — in our showroom, at home, or over video — and our design team will help you shape the space you have in mind.",
  },
  {
    Icon: Home,
    title: "Interior Design",
    desc: "Our in-house studio handles it all — space planning, material selection and styling — so your rooms tell a single, cohesive story from floor to finish.",
  },
  {
    Icon: Hammer,
    title: "Custom Crafted",
    desc: "Have something specific in mind? Our ateliers build made-to-order pieces in solid wood, stone and honest materials, finished by hand to your exact measurements.",
  },
  {
    Icon: Sofa,
    title: "Ready Made",
    desc: "Prefer to take it home today? Explore our curated range of ready-made furniture — designer pieces held in stock and ready to deliver to your door.",
  },
];

export default function FurnitureServices() {
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head sec-head--center" data-reveal>
          <h2 style={{ fontSize: "clamp(2.2rem,5vw,3.4rem)" }}>Our Services</h2>
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
