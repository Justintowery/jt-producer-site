// src/app/work/page.tsx

type WorkVideo = {
  title: string;
  vimeoId: string;
  aspect: "horizontal" | "vertical";
  extraParams?: string;
};

export default function WorkPage() {
  const videos: WorkVideo[] = [
    {
      title: "Directors of Toughness — UK Interview",
      vimeoId: "1168279393",
      aspect: "horizontal",
      extraParams: "title=0&byline=0&portrait=0&dnt=1",
    },
    {
      title: "Popeyes — Wings (Better Person) :30",
      vimeoId: "1168278891",
      aspect: "horizontal",
      extraParams:
        "badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1",
    },
    {
      title: "ANCDA — Run CMC (Vertical)",
      vimeoId: "1168282526",
      aspect: "vertical",
      extraParams:
        "title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
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

  const aspectClass = (aspect: WorkVideo["aspect"]) =>
    aspect === "vertical" ? "aspect-[9/16]" : "aspect-video";

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
        <section>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className={`${aspectClass(featured.aspect)} w-full`}>
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
        </section>

        {/* More Work */}
        <section className="mt-14">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs tracking-[0.4em] text-white/55">MORE WORK</p>
            <div className="ml-5 h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {rest.map((v) => (
              <div key={v.vimeoId}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(0,0,0,0.55)]">
                  <div className={`${aspectClass(v.aspect)} w-full`}>
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

                <div className="mt-4">
                  <p className="text-sm text-white/85">{v.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}