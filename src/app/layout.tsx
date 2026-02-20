import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Towery | Commercial Producer",
  description:
    "Commercial producer creating high-profile broadcast and brand campaigns. Los Angeles ⇄ Portland, OR. Producing worldwide.",
  metadataBase: new URL("https://justintowery.com"),
  openGraph: {
    title: "Justin Towery | Commercial Producer",
    description:
      "Commercial producer creating high-profile broadcast and brand campaigns. Los Angeles ⇄ Portland, OR. Producing worldwide.",
    url: "https://justintowery.com",
    siteName: "Justin Towery",
    images: [
      {
        url: "https://justintowery.com/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Justin Towery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin Towery | Commercial Producer",
    description:
      "Commercial producer creating high-profile broadcast and brand campaigns. Los Angeles ⇄ Portland, OR. Producing worldwide.",
    images: ["https://justintowery.com/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Justin Towery",
        url: "https://justintowery.com",
        sameAs: [
          "https://www.imdb.com/name/YOUR-ID/",
          "https://www.instagram.com/justintowery/",
          "https://www.linkedin.com/in/justintowery/",
          "https://www.threads.net/@justintowery",
          "https://www.facebook.com/therealJT"
        ],
        jobTitle: "Producer"
      })
    }}
  />
</head>
      <body>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3XNJ3Y4G2M"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3XNJ3Y4G2M');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}