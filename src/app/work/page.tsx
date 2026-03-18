// src/app/work/page.tsx

type WorkVideo = {
  title: string;
  vimeoId: string;
  aspect: "horizontal" | "vertical";
  client: string;
  director: string;
};

const videos: {
  featured: WorkVideo;
  horizontals: WorkVideo[];
  verticals: WorkVideo[];
  closing: WorkVideo;
} = {
  featured: {
    title: "Ford",
    vimeoId: "1174887979",
    aspect: "horizontal",
    client: "Ford",
    director: "Behemoth",
  },

  horizontals: [
    {
      title: "Popeyes",
      vimeoId: "000000000",
      aspect: "horizontal",
      client: "Popeyes",
      director: "Brandt Lewis",
    },
    {
      title: "Visa",
      vimeoId: "000000000",
      aspect: "horizontal",
      client: "Visa",
      director: "Cole Webley",
    },
    {
      title: "Audi",
      vimeoId: "000000000",
      aspect: "horizontal",
      client: "Audi",
      director: "Maz Makhani",
    },
  ],

  verticals: [
    {
      title: "Jersey Mike’s",
      vimeoId: "000000000",
      aspect: "vertical",
      client: "Jersey Mike’s",
      director: "Patrick Yonally",
    },
    {
      title: "Sony Anaconda",
      vimeoId: "000000000",
      aspect: "vertical",
      client: "Sony Anaconda",
      director: "Marcus Perry",
    },
  ],

  closing: {
    title: "Columbia Sportswear",
    vimeoId: "1168279393",
    aspect: "horizontal",
    client: "Columbia Sportswear",
    director: "Josh Ruben + Vincent Peone",
  },
};

const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`;

function VideoCard({ v }: { v: WorkVideo }) {
  const isVertical = v.aspect === "vertical";
  const aspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className="flex flex-col items-start">
      {/* VIDEO */}
      <div
        className={[
          isVertical ? "w-full max-w-[420px]" : "w-full",
          aspectClass,
          "overflow-hidden rounded-2xl border border-white/10 bg-black",
          "shadow-[0_24px_90px_rgba(0,0,0,0.5)]",
        ].join(" ")}
      >
        <iframe
          src={vimeoSrc(v.vimeoId)}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* METADATA (TIGHTER) */}
      <div className="mt-3 space-y-1">
        <p className="text-sm text-white/90 tracking-wide">
          {v.client}
        </p>
        <p className="text-xs text-white/50 tracking-[0.2em] uppercase">
          Directed by {v.director}
        </p>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <main className="bg-black text-white px-6 md:px-10 py-24">

      {/* FEATURED (MORE DOMINANT) */}
      <section className="max-w-[1200px] mx-auto mb-28">
        <VideoCard v={videos.featured} />
      </section>

      {/* HORIZONTAL STACK */}
      <section className="max-w-[1000px] mx-auto space-y-24 mb-32">
        {videos.horizontals.map((v, i) => (
          <VideoCard key={i} v={v} />
        ))}
      </section>

      {/* VERTICAL GRID */}
      <section className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 mb-32">
        {videos.verticals.map((v, i) => (
          <VideoCard key={i} v={v} />
        ))}
      </section>

      {/* CLOSING */}
      <section className="max-w-[1000px] mx-auto">
        <VideoCard v={videos.closing} />
      </section>

    </main>
  );
}