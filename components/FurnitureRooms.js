import Link from "next/link";

const OCCASIONS = [
  { title: "Living Room", img: "/assets/img/room-living.jpg", href: "/furniture/living-room" },
  { title: "Bedroom", img: "/assets/img/room-bedroom.jpg", href: "/furniture/living-room" },
  { title: "Dining Room", img: "/assets/img/room-dining.jpg", href: "/furniture/living-room" },
  { title: "Home Office", img: "/assets/img/room-office.jpg", href: "/furniture/living-room" },
];

export default function FurnitureRooms() {
  return (
    <section className="rooms-section">
      <div className="rooms-grid" data-reveal>
        {OCCASIONS.map((room) => {
          const inner = (
            <div className="room-card__inner">
              <img
                src={room.img}
                alt={`${room.title} — designer dresses at Sage Thread Boutique Bangalore`}
                title={`${room.title} — Sage Thread`}
                loading="lazy"
                decoding="async"
              />
              <span className="room-card__label">{room.title}</span>
            </div>
          );

          return room.href ? (
            <Link className="room-card room-card--link" key={room.title} href={room.href}>
              {inner}
            </Link>
          ) : (
            <div className="room-card" key={room.title}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
