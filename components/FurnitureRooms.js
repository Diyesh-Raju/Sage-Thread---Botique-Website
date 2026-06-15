const OCCASIONS = [
  { title: "Wedding & Bridal", img: "/assets/img/room-bedroom.jpg" },
  { title: "Festive Celebrations", img: "/assets/img/room-living.jpg" },
  { title: "Evening Occasions", img: "/assets/img/room-dining.jpg" },
  { title: "Work & Contemporary", img: "/assets/img/room-office.jpg" },
];

export default function FurnitureRooms() {
  return (
    <section className="rooms-section">
      <div className="rooms-grid" data-reveal>
        {OCCASIONS.map((room) => (
          <div className="room-card" key={room.title}>
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
          </div>
        ))}
      </div>
    </section>
  );
}
