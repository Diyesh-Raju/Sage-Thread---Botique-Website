import "./base.css";
import SiteScripts from "@/components/SiteScripts";

export const metadata = {
  metadataBase: new URL("https://sage-thread-boutique.vercel.app"),
  title: "Sage Thread — Boutique of Curated Living",
  description:
    "Sage Thread is a boutique house of curated furniture, fashion and marble — objects chosen for a beautifully considered life.",
  icons: { icon: "/assets/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
