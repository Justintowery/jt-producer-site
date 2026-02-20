import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Justin Towery | Commercial Producer",
  description:
    "Justin Towery is a commercial producer based in Los Angeles and Portland, producing worldwide campaigns for brands, athletes, and celebrities.",
  keywords: [
    "Justin Towery",
    "Commercial Producer",
    "Producer Los Angeles",
    "Producer Portland",
    "Advertising Producer",
    "Film Producer"
  ],
  authors: [{ name: "Justin Towery" }],
  openGraph: {
    title: "Justin Towery | Commercial Producer",
    description:
      "Commercial producer creating high-profile broadcast and brand campaigns.",
    url: "https://justintowery.com",
    siteName: "Justin Towery",
    images: [
      {
        url: "https://justintowery.com/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Justin Towery"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  metadataBase: new URL("https://justintowery.com")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}