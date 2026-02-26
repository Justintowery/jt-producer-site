// src/app/work/page.tsx

type WorkVideo = {
  title: string;
  vimeoId: string;
  aspect: "horizontal" | "vertical";
};

const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`;

function VideoCard({ v }: { v: WorkVideo }) {
  const isVertical = v.aspect === "vertical";
  const aspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          isVertical ? "w-full max-w-[420px]" : "w-full",
          "overflow-hidden rounded-2xl border border-white/10 bg-black",
          "shadow-[0_24px_90px_rgba(0,0,0,0.55)]",
        ].join(" ")}
      >
        <div className={`${aspectClass} w-full`}>
          <iframe
            src={vimeoSrc(v.vimeoId)}
            className="h-full w-full"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            title={v.title}
            loading="lazy"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-white/85 text-center">{v.title}</p>
    </div>
  );
}

export default function WorkPage() {
  // Featured + horizontals
  const featured: WorkVideo = {
    title: "Directors of Toughness — UK Interview",
    vimeoId: "1168279393",
    aspect: "horizontal",
  };

  const horizontals: WorkVideo[] = [
    {
      title: "Popeyes — Wings (Better Person) :30",
      vimeoId: "1168278891",
      aspect: "horizontal",
    },
    {
      title: "Visa — Chime",
      vimeoId: "1168311903",
      aspect: "horizontal",
    },
    {
      title: "Audi — Watermark",
      vimeoId: "1168283456",
      aspect: "horizontal",
    },
  ];

  // Vertical pair (forced to sit together)
  const verticalPair: WorkVideo[] = [
    {
      title: "Jersey Mike’s — Eli 1",
      vimeoId: "1168321478",
      aspect: "vertical",
    },
    {
      title: "ANCDA — Run CMC",
      vimeoId: "1168282526",
      aspect: "vertical",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-28">
        <header className="mb-10">
          <p className="text-xs tracking-[0.4em] text-white/60">VIEW WORK</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-white/90 md:text-4xl">
            Selected Work
          </h1>
        </header>

        {/* Featured */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="aspect-video w-full">
              <iframe
                src={vimeoSrc(featured.vimeoId)}
                className="h-full w-full"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                title={featured.title}
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-white/85">{featured.title}</p>
        </section>

        {/* Horizontals (full width rows) */}
        <section className="mt-14 space-y-14">
          {horizontals.map((v) => (
            <div key={v.vimeoId}>
              <VideoCard v={v} />
            </div>
          ))}
        </section>

        {/* Vertical pair (immediately after Audi) */}
        <section className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {verticalPair.map((v) => (
              <VideoCard key={v.vimeoId} v={v} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}