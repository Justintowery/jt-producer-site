// src/app/work/page.tsx

type WorkVideo = {
  title: string;
  vimeoId: string;
  extraParams?: string;
};

export default function WorkPage() {
  const videos: WorkVideo[] = [
    {
      title: "Directors of Toughness — UK Interview",
      vimeoId: "1168279393",
      extraParams: "title=0&byline=0&portrait=0&dnt=1",
    },
    {
      title: "Popeyes — Wings (Better Person) :30",
      vimeoId: "1168278891",
      extraParams:
        "badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1",
    },
    {
      // You can rename this title anytime later — it won’t break the embed.
      title: "New Video",
      vimeoId: "1168282526",
      extraParams: "title=0&byline=0&portrait=0&dnt=1",
    },
  ];

  const featured = videos[0];
  const rest = videos.slice(1);

  const vimeoSrc = (v: WorkVideo) => {
    const params = v.extraParams?.trim();
    return params
      ? `https://player.vimeo.com/video/${v.vimeoId}?${params}`
      : `https://player.vimeo.com/video/${v.vimeoId}`;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28">
        <header className="mb-10">
          <p className="text-xs tracking-[0.4em] text-white/60">VIEW WORK</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white/90 md:text-4xl">
            Selected Work
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            A curated set of projects. Calm execution, start to finish.
          </p>
        </header>

        {/* Featured */}
        <section className="w-full">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="aspect-video w-full">
              <iframe
                src={vimeoSrc(featured)}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                allowFullScreen
                title={featured.title}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/85">{featured.title}</p>
              <p className="mt-1 text-xs tracking-[0.25em] text-white/50">
                FEATURED
              </p>
            </div>

            <a
              href={`https://vimeo.com/${featured.vimeoId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/10"
            >
              OPEN
            </a>
          </div>
        </section>

        {/* More work */}
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs tracking-[0.4em] text-white/55">MORE WORK</p>
            <div className="ml-5 h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-10">
            {rest.map((v) => (
              <div key={v.vimeoId}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
                  <div className="aspect-video w-full">
                    <iframe
                      src={vimeoSrc(v)}
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      allowFullScreen
                      title={v.title}
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/85">{v.title}</p>
                    <p className="mt-1 text-xs tracking-[0.25em] text-white/50">
                      VIMEO
                    </p>
                  </div>

                  <a
                    href={`https://vimeo.com/${v.vimeoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.3em] text-white/80 transition hover:border-white/25 hover:bg-white/10"
                  >
                    OPEN
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}