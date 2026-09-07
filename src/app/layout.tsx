import type { Metadata, Viewport } from "next";
import { Overpass, Overpass_Mono, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Overpass is drawn from FHWA Highway Gothic — the lettering on US road signs.
   It carries the subject in the type itself rather than in decoration. */
const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  display: "swap",
});

const overpassMono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Asphalt Repair, Sealcoating & Striping in Wartrace, TN`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "asphalt repair Wartrace TN",
    "sealcoating Shelbyville TN",
    "parking lot striping Bedford County TN",
    "pothole repair Bell Buckle TN",
    "line striping Middle Tennessee",
    "asphalt contractor Bedford County",
    "commercial parking lot maintenance Shelbyville",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Asphalt Repair & Sealcoating in Wartrace, TN`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Asphalt Repair & Sealcoating in Wartrace, TN`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "business",
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#17181a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${overpass.variable} ${overpassMono.variable} ${plexSans.variable} h-full antialiased`}
    >
      <body className="u-paved flex min-h-full flex-col">
        {/* Scroll reveals are an enhancement; without scripting the content
            must still be on the page. */}
        <noscript>
          <style>{`.u-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
