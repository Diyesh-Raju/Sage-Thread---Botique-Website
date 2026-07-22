"use client";

/* Scroll-drawn stroke (Skiper19), ported to JS + plain CSS.
   A single line draws itself behind the statement as the section is scrolled
   through. The original lets the whole thing scroll past; here the frame pins
   instead and the artwork pans behind it, so the growing tip of the line stays
   in view for the length of the passage rather than running off the bottom.
   The template's demo footer — the conference block translated 200vh down —
   is not part of the effect and is left out. */

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./ScrollStroke.css";

/* the line begins a touch drawn, so the section never arrives empty */
const START = 0.06;

/* How far the artwork has panned, against how much of the line is drawn.
   The line's length is spread very unevenly over its shape: measured with
   getPointAtLength, over half of it is spent inside the knot, which occupies
   only the top sixth of the drawing — the tip holds at y≈380 for the first
   45%, then runs out to y≈2670 across the rest. A straight pan is therefore
   wrong in both halves: it drags the knot off the top while it is still being
   drawn, then lags behind the long sweeps. These stops follow the measured
   curve, so the growing tip stays in frame the whole way down.
   Once past the knot the drawing is only long sweeps, so the pan eases off
   there and lets the tip ride low in the frame: chasing it exactly would empty
   the frame down to a single travelling curve.
   The stops are a fraction of the artwork's own height and assume it stands
   about twice the frame — retune them alongside --art-h. */
const PAN_AT = [0, 0.45, 0.75, 1];
const PAN_TO = ["10%", "8%", "-25%", "-56%"];

const D =
  "M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89";

export default function ScrollStroke() {
  const frame = useRef(null);
  const [still, setStill] = useState(false);

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start start", "end end"],
  });

  /* the line draws as the frame is held, and the artwork pans behind it at the
     rate the drawing tip actually travels */
  const pathLength = useTransform(scrollYProgress, [0, 1], [START, 1]);
  const y = useTransform(scrollYProgress, PAN_AT, PAN_TO);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* The still state has to name its values rather than drop the style prop.
     `still` can only be read after mount, so the first render is always the
     moving one, and by the time it flips framer has written the stroke dashes
     and the pan transform onto the elements. Handing back `undefined` stops it
     updating them but clears nothing, which froze the line at START. */

  return (
    <section className="sstroke" ref={frame} aria-label="Sage Thread — on lasting pieces">
      <div className="sstroke__pin">
        <motion.svg
          className="sstroke__art"
          viewBox="-60 0 1400 2700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={still ? { y: 0 } : { y }}
        >
          <motion.path
            d={D}
            stroke="var(--accent)"
            strokeWidth="13"
            strokeLinecap="round"
            style={still ? { pathLength: 1 } : { pathLength }}
          />
        </motion.svg>

        <h2 className="sstroke__line">
          Beauty fades, but a perfect piece lasts forever
        </h2>
      </div>
    </section>
  );
}
