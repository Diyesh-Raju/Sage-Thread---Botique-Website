"use client";

import { useEffect, useRef, useState } from "react";

// Product card modelled on the Roche Bobois collection grid:
// a light-grey square image stage with a wishlist heart, then category,
// name, finish swatches and a meta line. The 3 product images slide
// horizontally while the pointer is hovering the card.
export default function ProductCard({ product }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [liked, setLiked] = useState(false);
  const timer = useRef(null);

  const images = product.images || [];
  const count = images.length;

  // Auto-advance through the images while hovering.
  useEffect(() => {
    if (!hovering || count < 2) return undefined;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 1100);
    return () => clearInterval(timer.current);
  }, [hovering, count]);

  const enter = () => setHovering(true);
  const leave = () => {
    setHovering(false);
    setIndex(0);
  };
  const go = (dir) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + dir + count) % count);
  };

  return (
    <article
      className="pcard"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div className="pcard__stage">
        <div
          className="pcard__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div className="pcard__slide" key={src}>
              <img
                src={src}
                alt={`${product.name} — view ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {product.badge && <span className="pcard__badge">{product.badge}</span>}

        <button
          type="button"
          className={`pcard__heart${liked ? " is-liked" : ""}`}
          aria-label="Add to wishlist"
          aria-pressed={liked}
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-10-9.2C.6 9 1.4 5.6 4.3 4.5 6.4 3.7 8.6 4.5 12 7.7c3.4-3.2 5.6-4 7.7-3.2C22.6 5.6 23.4 9 22 11.8 19.5 16.4 12 21 12 21z"
              fill={liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              className="pcard__arrow pcard__arrow--prev"
              aria-label="Previous image"
              onClick={go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="pcard__arrow pcard__arrow--next"
              aria-label="Next image"
              onClick={go(1)}
            >
              ›
            </button>
            <div className="pcard__dots" aria-hidden="true">
              {images.map((src, i) => (
                <span
                  key={src}
                  className={i === index ? "is-active" : undefined}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="pcard__body">
        {product.category && <p className="pcard__cat">{product.category}</p>}
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__meta">
          {product.swatches?.length > 0 && (
            <div className="pcard__swatches">
              {product.swatches.map((c, i) => (
                <span key={i} style={{ background: c }} />
              ))}
              {product.moreSwatches ? (
                <em className="pcard__more">+{product.moreSwatches}</em>
              ) : null}
            </div>
          )}
          {product.info && <p className="pcard__info">{product.info}</p>}
        </div>
      </div>
    </article>
  );
}
