import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Justin Towery — Freelance Commercial Producer",
  description: "Calm is contagious. Big campaigns. Easy energy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-zinc-950 text-white antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
