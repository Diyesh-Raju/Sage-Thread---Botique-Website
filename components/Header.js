"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Shared site header. The active link is derived from the current route.
// Clicking the link for the page you're already on smooth-scrolls to the top
// instead of doing nothing (cross-page clicks land at the top instantly —
// handled in SiteScripts on route change).
export default function Header() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const handleClick = (href) => (e) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="site-header" data-header>
      <div className="nav-wrap">
        <Link className="brand" href="/" onClick={handleClick("/")}>
          Sage Thread<span>boutique</span>
        </Link>
        <nav className="nav-links" data-nav>
          <Link
            href="/"
            className={isActive("/") ? "active" : undefined}
            onClick={handleClick("/")}
          >
            Home
          </Link>
          <Link
            href="/furniture"
            className={isActive("/furniture") ? "active" : undefined}
            onClick={handleClick("/furniture")}
          >
            Furniture
          </Link>
          <Link
            href="/fashion"
            className={isActive("/fashion") ? "active" : undefined}
            onClick={handleClick("/fashion")}
          >
            Fashion
          </Link>
          <Link
            href="/marble"
            className={isActive("/marble") ? "active" : undefined}
            onClick={handleClick("/marble")}
          >
            Marble
          </Link>
          <Link
            href="/contact"
            className={isActive("/contact") ? "nav-cta active" : "nav-cta"}
            onClick={handleClick("/contact")}
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
