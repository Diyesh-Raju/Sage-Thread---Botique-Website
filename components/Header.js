import Link from "next/link";

// Shared site header. `active` marks the current page's nav link, mirroring the
// `.active` class the original static pages set by hand.
export default function Header({ active }) {
  const cls = (name) => (active === name ? "active" : undefined);
  return (
    <header className="site-header" data-header>
      <div className="nav-wrap">
        <Link className="brand" href="/">
          Sage Thread<span>boutique</span>
        </Link>
        <nav className="nav-links" data-nav>
          <Link href="/" className={cls("home")}>
            Home
          </Link>
          <Link href="/furniture" className={cls("furniture")}>
            Furniture
          </Link>
          <Link href="/fashion" className={cls("fashion")}>
            Fashion
          </Link>
          <Link href="/marble" className={cls("marble")}>
            Marble
          </Link>
          <Link
            href="/contact"
            className={active === "contact" ? "nav-cta active" : "nav-cta"}
          >
            Contact
          </Link>
        </nav>
        <button
          className="nav-toggle"
          data-nav-toggle
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
