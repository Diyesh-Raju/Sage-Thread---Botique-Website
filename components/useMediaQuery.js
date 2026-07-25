"use client";

import { useEffect, useState } from "react";

/* Subscribe to a media query.

   `initial` is what the hook reports before the browser has been asked —
   which is also what the server renders, so pass the value that matches the
   server's markup (false for "assume desktop"), or null when the caller needs
   to hold off doing anything until the real answer is in.

   The listener is registered defensively: Safari only gave MediaQueryList an
   EventTarget in 14, so on older iOS `mq.addEventListener` is undefined and
   calling it throws — inside an effect that takes the whole component down,
   which on this site means a hero or a carousel silently failing to render.
   The deprecated addListener is still there, so fall back to it. */
export default function useMediaQuery(query, initial = false) {
  const [matches, setMatches] = useState(initial);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();

    if (mq.addEventListener) mq.addEventListener("change", sync);
    else mq.addListener(sync);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", sync);
      else mq.removeListener(sync);
    };
  }, [query]);

  return matches;
}
