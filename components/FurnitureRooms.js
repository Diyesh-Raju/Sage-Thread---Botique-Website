const OCCASIONS = [
  { title: "Bedroom", img: "/assets/img/room-bedroom.jpg" },
  { title: "Living Room", img: "/assets/img/room-living.jpg" },
  { title: "Dining Room", img: "/assets/img/room-dining.jpg" },
  { title: "Home Office", img: "/assets/img/room-office.jpg" },
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
