/* Split feature in the Tiffany "Introducing the New…" mould: the film held
   flush to the left edge, the announcement centred in the space beside it.
   It stands where the jewellery reel used to, and plays the same film.

   The film is left at its own 16:9 rather than cropped into a taller panel:
   its subject is exploded right across the frame, and a caption rides in on
   the right-hand side part way through, so anything that trims the sides
   loses both. */

import "./EmeraldFeature.css";

export default function EmeraldFeature() {
  return (
    <section className="emfeat" aria-labelledby="emfeat-title">
      <div className="emfeat__media" data-reveal="scale">
        <video
          className="emfeat__video"
          src="/assets/video/jewelry-reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Film of the Emerald Reverie necklace — Sage Thread Boutique Bangalore"
          title="Emerald Reverie necklace — Sage Thread Boutique Bangalore"
        />
      </div>

      <div className="emfeat__copy">
        <h2 className="emfeat__title" id="emfeat-title" data-reveal>
          Introducing the New
          <br />
          Emerald Reverie Necklace
        </h2>
        <p className="emfeat__desc" data-reveal style={{ "--d": ".1s" }}>
          Suspended within a constellation of brilliant-cut diamonds, the emerald is
          framed by cascading strands of platinum that dance elegantly across the
          neckline, anchored by a radiant 30-carat Colombian emerald. Each detail
          whispers of timeless luxury and uncompromising craftsmanship.
        </p>
        <a className="emfeat__cta" href="/contact" data-reveal style={{ "--d": ".2s" }}>
          Shop the Collection
        </a>
      </div>
    </section>
  );
}
