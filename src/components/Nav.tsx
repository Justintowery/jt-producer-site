import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      {/* subtle cinematic top bar */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.32em] text-zinc-300 transition hover:text-white"
        >
          Justin Towery
        </Link>

        <nav className="flex items-center gap-8 text-sm text-zinc-300">
          <Link href="/work" className="transition hover:text-white">
            Work
          </Link>
          <Link href="/credits" className="transition hover:text-white">
            Credits
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}