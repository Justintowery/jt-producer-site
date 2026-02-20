export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-black to-black" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)] bg-white/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-24 pt-32">
        {/* HERO */}
        <section className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Calm is contagious.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-white/75">
            Complex productions. Calm execution.
          </p>
        </section>

        {/* ABOUT */}
        <section className="mt-24 max-w-3xl space-y-8">
          <h2 className="text-sm font-semibold tracking-wider text-white/60 uppercase">
            About
          </h2>

          <div className="space-y-6 text-xl leading-relaxed text-white">
            <p>
              I’ve spent two decades producing commercial work at scale —
              leading teams, managing complexity, and protecting creative at
              the highest level.
            </p>

            <p>
              I’ve worked in high-pressure environments long enough to know
              that preparation wins — and calm leadership sets the tone for
              everyone else.
            </p>

            <p className="text-white/80">
              Built in Los Angeles. Working nationally.
            </p>

            <p className="text-white/80">
              Calm isn’t a personality trait. It’s a strategy.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-24">
          <a
            href="mailto:your@email.com"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            Contact
          </a>
        </section>
      </div>
    </div>
  );
}