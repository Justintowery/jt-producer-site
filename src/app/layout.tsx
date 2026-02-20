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
        <FloatingName />
        <main>{children}</main>
      </body>
    </html>
  );
}