import "./base.css";
import SiteScripts from "@/components/SiteScripts";
import JsonLd from "@/components/JsonLd";
import { globalSchemas } from "@/lib/schema";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1611",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={globalSchemas()} />
      </head>
      <body>
        {children}
        <SiteScripts />
      </body>
    </html>
  );
}
