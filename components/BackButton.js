"use client";

/* A small "Back" button that stands in for the breadcrumb on detail pages.
   It returns to the previous page when there's history to go back to, and
   otherwise falls back to the section's listing — so a directly-opened or
   shared link still lands somewhere sensible. */

import { useRouter } from "next/navigation";
import "./BackButton.css";

export default function BackButton({ fallback = "/", label = "Back" }) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button type="button" className="backbtn" onClick={goBack}>
      <span className="backbtn__arrow" aria-hidden="true">←</span>
      {label}
    </button>
  );
}
