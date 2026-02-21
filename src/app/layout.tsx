import type { Metadata } from "next";
import "./globals.css";
import FloatingName from "../components/FloatingName";

export const metadata: Metadata = {
  title: "Justin Towery",
  description: "Line Producer / Hybrid Producer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {/* IMPORTANT:
            FloatingName is decorative and must NEVER capture clicks.
            Wrapping it in pointer-events-none guarantees it can't block buttons/links.
        */}
        <div className="pointer-events-none" aria-hidden="true">
          <FloatingName />
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}