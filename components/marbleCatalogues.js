/* Data for the "Catalogues" brochures section (CataloguesSection.js) and the
   page-by-page flipbook reader (/marble/catalogue/[slug]). Three marble
   catalogues, each with a cover and five inner spread pages built from the
   existing marble imagery (all chosen to read clearly on the page). */

export const CATALOGUES = [
  {
    slug: "natural-stone-lookbook",
    eyebrow: "Volume I",
    title: "Natural Stone Lookbook",
    quote: "Where stone meets the garden.",
    description:
      "A year of quarried marble and natural stone, photographed in the homes it now lives in — from backlit onyx walls to sculptural travertine stairs. Our most-loved surfaces, gathered into one book.",
    cover: "/assets/img/marble-cat-lookbook.jpg",
    pages: [
      { img: "/assets/img/marble-hero.jpg", eyebrow: "Inspiration", title: "Stone after dark", text: "Travertine walls glowing under warm light at dusk." },
      { img: "/assets/img/marble-arch.jpg", eyebrow: "Architecture", title: "Sculptural stairs", text: "Solid stone treads, cantilevered and lit softly from beneath." },
      { img: "/assets/img/marble-context2.jpg", eyebrow: "Interiors", title: "Living with marble", text: "Book-matched marble framing a quiet, light-filled washroom." },
      { img: "/assets/img/marble-about.jpg", eyebrow: "Craft", title: "Finished by hand", text: "Honed, polished or brushed to the exact touch you want." },
      { img: "/assets/img/marble-wall.jpg", eyebrow: "Detail", title: "Read the veining", text: "The movement that makes every slab one of a kind." },
    ],
  },
  {
    slug: "the-marble-collection",
    eyebrow: "Volume II",
    title: "The Marble Collection",
    quote: "Stone, lit from within.",
    description:
      "Our signature stones — Calacatta, Statuario, Nero and Verde — shown as full slabs and in finished interiors, so you can read the veining the way it will read in your home.",
    cover: "/assets/img/marble-cat-collection.jpg",
    pages: [
      { img: "/assets/img/marble-context2.jpg", eyebrow: "Calacatta", title: "Bold, warm veining", text: "Dramatic grey-gold movement on a soft white ground." },
      { img: "/assets/img/marble-wall.jpg", eyebrow: "Statuario", title: "Quiet and precise", text: "Fine, linear veins on the whitest of grounds." },
      { img: "/assets/img/marble-story.jpg", eyebrow: "Onyx", title: "Lit from within", text: "Translucent stone that glows when it is backlit." },
      { img: "/assets/img/marble-hero.jpg", eyebrow: "In situ", title: "Stone in place", text: "Travertine framing a softly-lit evening terrace." },
      { img: "/assets/img/marble-arch.jpg", eyebrow: "Form", title: "Sculptural stone", text: "Stairs carved from solid stone to feel weightless." },
    ],
  },
];

export const CATALOGUE_BY_SLUG = Object.fromEntries(
  CATALOGUES.map((c) => [c.slug, c])
);
