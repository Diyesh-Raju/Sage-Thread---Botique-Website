/* Shared data for the "Curated Collections" coverflow (MarbleCollections.js)
   and the per-collection detail pages (/marble/collection/[slug]).
   Eight natural-stone slabs — each card shows the marble name + a short
   description, and links to its own detail page. */

export const MARBLE_COLLECTIONS = [
  {
    slug: "makrana",
    name: "Makrana Marble",
    tagline: "Timeless ivory marble",
    img: "/assets/img/marble-makrana.jpg",
    eyebrow: "Rajasthan · India",
    intro:
      "The luminous ivory marble of the Taj Mahal, quarried in Makrana for over five centuries.",
    body: [
      "Makrana is among the oldest and purest marbles in the world — a dense, calcite-rich white that has clad monuments for centuries, most famously the Taj Mahal. It takes a high polish and barely weathers, which is why it endures.",
      "Soft ivory with a gentle grey-gold drift, Makrana suits floors, cladding and sculpture where a warm, timeless white is wanted.",
    ],
    traits: [
      { label: "Origin", value: "Makrana, Rajasthan" },
      { label: "Tone", value: "Warm ivory white" },
      { label: "Best for", value: "Floors · cladding · sculpture" },
    ],
  },
  {
    slug: "thassos",
    name: "Thassos Marble",
    tagline: "Warm crystalline white",
    img: "/assets/img/marble-thassos.jpg",
    eyebrow: "Aegean · Greece",
    intro:
      "A crystalline white marble from the Greek island of Thassos, prized for its brightness.",
    body: [
      "Thassos is one of the whitest marbles quarried — a snow-bright stone with a faint crystalline sparkle. This cut carries a warm golden drift that softens its brilliance.",
      "Reflective and clean, it lifts bathrooms, feature walls and backlit panels where light is the point.",
    ],
    traits: [
      { label: "Origin", value: "Thassos, Greece" },
      { label: "Tone", value: "Bright white · gold drift" },
      { label: "Best for", value: "Bathrooms · backlit panels" },
    ],
  },
  {
    slug: "carrara",
    name: "Carrara Marble",
    tagline: "Soft grey veining",
    img: "/assets/img/marble-carrara-slab.jpg",
    eyebrow: "Tuscany · Italy",
    intro:
      "The classic white-grey marble of Carrara — the stone of Michelangelo's studio.",
    body: [
      "Quarried in the Apuan Alps for over two thousand years, Carrara is the marble the world pictures: a soft white ground crossed by feathery grey veining.",
      "Versatile and understated, it belongs on worktops, floors and vanities where quiet elegance is wanted.",
    ],
    traits: [
      { label: "Origin", value: "Carrara, Italy" },
      { label: "Tone", value: "White · soft grey veins" },
      { label: "Best for", value: "Worktops · floors · vanities" },
    ],
  },
  {
    slug: "rainforest-green-gold-bespoke",
    name: "Rainforest Green Gold Bespoke",
    tagline: "Bespoke emerald & gold",
    img: "/assets/img/marble-rainforest-bespoke.jpg",
    eyebrow: "Bespoke edition",
    intro:
      "A bespoke cut of Rainforest Green with dramatic gold banding, selected slab by slab.",
    body: [
      "Rainforest marble is loved for its landscape-like movement. This bespoke edition pushes the green deeper and threads it with gold, so each panel reads like a painting.",
      "Reserved for statement walls and tables where the stone is meant to be the centrepiece.",
    ],
    traits: [
      { label: "Origin", value: "Rajasthan, India" },
      { label: "Tone", value: "Emerald green · gold" },
      { label: "Best for", value: "Feature walls · tables" },
    ],
  },
  {
    slug: "rainforest-green-gold",
    name: "Rainforest Green Gold",
    tagline: "Deep green & gold",
    img: "/assets/img/marble-rainforest.jpg",
    eyebrow: "Statement stone",
    intro:
      "Deep forest-green marble laced with fine gold veining and pale, fern-like movement.",
    body: [
      "Rainforest Green takes its name from its dense, foliage-like veining. The gold threads catch the light and give the dark green a jewel-like depth.",
      "A bold choice for cladding, islands and bar fronts that should feel rich and alive.",
    ],
    traits: [
      { label: "Origin", value: "Rajasthan, India" },
      { label: "Tone", value: "Deep green · gold veins" },
      { label: "Best for", value: "Cladding · islands · bars" },
    ],
  },
  {
    slug: "royal-vendome",
    name: "Royal Vendome",
    tagline: "Regal warm brown",
    img: "/assets/img/marble-royal-vendome.jpg",
    eyebrow: "Warm neutral",
    intro:
      "A regal warm-brown marble with smoky movement and bright crystalline veining.",
    body: [
      "Royal Vendome balances depth and warmth — a coffee-and-taupe ground broken by pale, glittering veins. It reads luxurious without ever feeling heavy.",
      "Ideal for fireplaces, floors and feature furniture where warmth and character matter.",
    ],
    traits: [
      { label: "Origin", value: "Imported" },
      { label: "Tone", value: "Warm brown · pale veins" },
      { label: "Best for", value: "Fireplaces · floors · furniture" },
    ],
  },
  {
    slug: "portoro",
    name: "Portoro (Golden Portoro)",
    tagline: "Black & gold drama",
    img: "/assets/img/marble-portoro.jpg",
    eyebrow: "Liguria · Italy",
    intro:
      "Golden Portoro — the most prized black-and-gold marble, deep jet shot through with gold.",
    body: [
      "Portoro is the aristocrat of black marbles: a near-black ground crossed by brilliant golden veins. Rare and dramatic, it has dressed grand interiors for centuries.",
      "Best used sparingly — a tabletop, a vanity, a panel — where it can command the room.",
    ],
    traits: [
      { label: "Origin", value: "Portovenere, Italy" },
      { label: "Tone", value: "Jet black · gold veins" },
      { label: "Best for", value: "Tabletops · vanities · panels" },
    ],
  },
  {
    slug: "nero-marquina",
    name: "Nero Marquina Limestone",
    tagline: "Bold black & white",
    img: "/assets/img/marble-nero-marquina.jpg",
    eyebrow: "Basque Country · Spain",
    intro:
      "A bold black limestone-marble from Spain, crossed by crisp white veining.",
    body: [
      "Nero Marquina is a deep, even black cut by sharp white veins — high-contrast, graphic and timeless. It polishes to a glassy, reflective finish.",
      "A confident choice for floors, bathrooms and statement walls that want drama and edge.",
    ],
    traits: [
      { label: "Origin", value: "Markina, Spain" },
      { label: "Tone", value: "Black · white veins" },
      { label: "Best for", value: "Floors · bathrooms · walls" },
    ],
  },
];

export const COLLECTION_BY_SLUG = Object.fromEntries(
  MARBLE_COLLECTIONS.map((c) => [c.slug, c])
);
