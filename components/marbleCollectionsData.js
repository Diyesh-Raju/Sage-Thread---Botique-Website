/* Shared data for the "Curated Collections" coverflow (MarbleCollections.js)
   and the per-collection detail pages (/marble/collection/[slug]).
   Each entry owns its slug so the carousel card links straight to its page. */

export const MARBLE_COLLECTIONS = [
  {
    slug: "kanjeevaram-silk",
    name: "Kanjeevaram Silk",
    tagline: "Temple-bordered radiance",
    img: "/assets/img/marble-calacatta.svg",
    eyebrow: "South Indian heritage",
    intro:
      "Woven on the looms of Kanchipuram, where pure mulberry silk meets real gold zari.",
    body: [
      "Kanjeevaram is the queen of South Indian silks — heavier, more lustrous and more durable than almost any woven cloth. The body, border and pallu are traditionally woven separately and then interlocked by hand, a join so strong the borders outlast the saree itself.",
      "Each piece in this edit is sourced directly from weaving families in Kanchipuram and finished at our Bangalore atelier, where we fall-and-edge the saree and tailor a blouse to your measurements.",
    ],
    traits: [
      { label: "Weave", value: "Pure mulberry silk · korvai border" },
      { label: "Zari", value: "Tested gold / silver zari" },
      { label: "Best for", value: "Weddings · temple occasions" },
    ],
  },
  {
    slug: "banarasi-weave",
    name: "Banarasi Weave",
    tagline: "Soft zari, timeless drape",
    img: "/assets/img/marble-carrara.svg",
    eyebrow: "Varanasi craftsmanship",
    intro:
      "Featherweight silk brocade patterned with Mughal-era floral jaal and meenakari.",
    body: [
      "Banarasi sarees are defined by their intricate brocade — fine gold and silver threads worked into floral and foliate motifs, often with a soft, supple drape that belies the density of the weaving. A single saree can take weeks on the loom.",
      "We curate handloom Banarasi pieces with genuine tested zari, then finish each with a hand-rolled edge and a tailored blouse so it is ready to wear the moment it reaches you.",
    ],
    traits: [
      { label: "Weave", value: "Katan silk · brocade jaal" },
      { label: "Motif", value: "Floral meenakari · jangla" },
      { label: "Best for", value: "Receptions · festive evenings" },
    ],
  },
  {
    slug: "chikankari",
    name: "Chikankari",
    tagline: "Hand-shadowed embroidery",
    img: "/assets/img/marble-statuario.svg",
    eyebrow: "Lucknowi artistry",
    intro:
      "Whisper-light shadow-work embroidery, hand-stitched on breathable cotton and georgette.",
    body: [
      "Chikankari is the centuries-old white-on-white embroidery of Lucknow, built from dozens of named stitches — from the delicate murri to the shadow-work bakhiya worked from the reverse of the cloth. The result is quietly luminous and impossibly light.",
      "This edit spans anarkalis, kurtas and saree sets, each embroidered by hand and tailored at our Bangalore atelier for an effortless, breathable fit.",
    ],
    traits: [
      { label: "Technique", value: "Hand shadow-work · 30+ stitches" },
      { label: "Fabric", value: "Cotton · mul · georgette" },
      { label: "Best for", value: "Daywear · summer occasions" },
    ],
  },
  {
    slug: "velvet-lehenga",
    name: "Velvet Lehenga",
    tagline: "Deep zardozi opulence",
    img: "/assets/img/marble-nero.svg",
    eyebrow: "Bridal couture",
    intro:
      "Plush silk velvet, hand-embroidered with raised zardozi and dabka metalwork.",
    body: [
      "Velvet carries embroidery like nothing else — the dense pile lets raised zardozi, dabka and sequin work catch the light from every angle. Our bridal lehengas are built on a structured can-can base for a sculpted, regal silhouette.",
      "Each lehenga is made to order: choose your colourway, the density of the hand-embroidery and the blouse silhouette, and our atelier fits it across two sittings.",
    ],
    traits: [
      { label: "Fabric", value: "Silk velvet · can-can base" },
      { label: "Embroidery", value: "Zardozi · dabka · sequin" },
      { label: "Best for", value: "Brides · sangeet · reception" },
    ],
  },
  {
    slug: "bandhani",
    name: "Bandhani",
    tagline: "Festive tie-dye bursts",
    img: "/assets/img/marble-emperador.svg",
    eyebrow: "Gujarat & Rajasthan",
    intro:
      "Thousands of hand-tied knots resist-dyed into bursts of joyous colour.",
    body: [
      "Bandhani — from the word to tie — is made by plucking and binding the cloth into thousands of tiny knots before dyeing, so each dot is formed entirely by hand. The finest grades pack the dots so densely the pattern reads as light.",
      "Our Bandhani edit gathers dupattas, saree sets and kurtas in traditional reds, ochres and indigos, finished and tailored for festive wear.",
    ],
    traits: [
      { label: "Technique", value: "Hand-tied resist dye" },
      { label: "Fabric", value: "Georgette · gajji silk · cotton" },
      { label: "Best for", value: "Festivals · haldi · garba" },
    ],
  },
  {
    slug: "indo-western",
    name: "Indo-Western",
    tagline: "Contemporary fusion edits",
    img: "/assets/img/marble-verde.svg",
    eyebrow: "Modern silhouettes",
    intro:
      "Traditional craft reimagined as draped gowns, cape sets and pant-saree silhouettes.",
    body: [
      "Indo-Western pieces take the textiles and embroidery of India and set them in contemporary cuts — pre-draped saree gowns, cape lehengas, dhoti sets and structured pant-sarees that move easily from ceremony to celebration.",
      "Every silhouette in this edit is made to measure at our Bangalore atelier, so the fusion fits as precisely as it flatters.",
    ],
    traits: [
      { label: "Silhouettes", value: "Saree-gown · cape · pant-saree" },
      { label: "Fabric", value: "Crepe · organza · silk blends" },
      { label: "Best for", value: "Cocktail · sangeet · destination" },
    ],
  },
];

export const COLLECTION_BY_SLUG = Object.fromEntries(
  MARBLE_COLLECTIONS.map((c) => [c.slug, c])
);
