// src/app/work/page.tsx

export default function WorkPage() {
  // Vimeo player params:
  // - title/byline/portrait: hide Vimeo UI chrome
  // - dnt=1: "do not track" flag
  const vimeoSrc =
    "https://player.vimeo.com/video/1168279393?title=0&byline=0&portrait=0&dnt=1";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
        <header className="mb-10">
          <p className="text-xs tracking-[0.4em] text-white/60">WORK</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white/90 md:text-4xl">
            Selected Work
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            A small selection. Calm execution, start to finish.
          </p>
        </header>

        <section className="w-full">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="aspect-video w-full">
              <iframe
                src={vimeoSrc}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Directors of Toughness — UK Interview"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/85">
                Directors of Toughness — UK Interview
              </p>
              <p className="mt-1 text-xs tracking-[0.25em] text-white/50">
                VIMEO · EMBED TEST
              </p>
            </div>

            <a
              href="https://vimeo.com/1168279393"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/10"
            >
              OPEN
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}