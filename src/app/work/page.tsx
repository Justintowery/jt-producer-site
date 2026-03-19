"use client";

// src/app/work/page.tsx

import { motion, useReducedMotion } from "framer-motion";

type WorkVideo = {
  title: string;
  client: string;
  director: string;
  vimeoId: string;
  aspect: "horizontal" | "vertical";
};

const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&dnt=1`;

function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function VideoMeta({ v }: { v: WorkVideo }) {
  return (
    <div className="mt-3 w-full space-y-1 text-left">
      <p className="text-sm tracking-wide text-white/90">{v.client}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-white/50">
        Directed by {v.director}
      </p>
    </div>
  );
}

function VideoCard({ v }: { v: WorkVideo }) {
  const isVertical = v.aspect === "vertical";
  const aspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <div className="flex flex-col items-start">
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

      <VideoMeta v={v} />
    </div>
  );
}

export default function WorkPage() {
  const featured: WorkVideo = {
    title: "Ford Project",
    client: "Ford",
    director: "Behemoth",
    vimeoId: "1174887979",
    aspect: "horizontal",
  };

  const horizontals: WorkVideo[] = [
    {
      title: "Popeyes",
      client: "Popeyes",
      director: "Brandt Lewis",
      vimeoId: "1168278891",
      aspect: "horizontal",
    },
    {
      title: "Visa",
      client: "Visa",
      director: "Cole Webley",
      vimeoId: "1168311903",
      aspect: "horizontal",
    },
    {
      title: "Audi",
      client: "Audi",
      director: "Maz Makhani",
      vimeoId: "1168283456",
      aspect: "horizontal",
    },
  ];

  const verticalPair: WorkVideo[] = [
    {
      title: "Jersey Mike’s",
      client: "Jersey Mike’s",
      director: "Patrick Yonally",
      vimeoId: "1168321478",
      aspect: "vertical",
    },
    {
      title: "Sony Anaconda",
      client: "Sony Anaconda",
      director: "Marcus Perry",
      vimeoId: "1168282526",
      aspect: "vertical",
    },
  ];

  const closingVideo: WorkVideo = {
    title: "Columbia Sportswear",
    client: "Columbia Sportswear",
    director: "Josh Ruben + Vincent Peone",
    vimeoId: "1168279393",
    aspect: "horizontal",
  };

  return (
    <main className="bg-black px-6 py-24 text-white md:px-10">
      {/* FEATURED */}
      <section className="mx-auto mb-28 max-w-[1200px]">
        <FadeInSection>
          <VideoCard v={featured} />
        </FadeInSection>
      </section>

      {/* HORIZONTAL STACK */}
      <section className="mx-auto mb-32 max-w-[1000px] space-y-24">
        {horizontals.map((v, index) => (
          <FadeInSection key={v.vimeoId} delay={index * 0.04}>
            <VideoCard v={v} />
          </FadeInSection>
        ))}
      </section>

      {/* VERTICAL GRID */}
      <section className="mx-auto mb-32 grid max-w-[1000px] gap-16 md:grid-cols-2">
        {verticalPair.map((v, index) => (
          <FadeInSection key={v.vimeoId} delay={index * 0.05}>
            <VideoCard v={v} />
          </FadeInSection>
        ))}
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-[1000px]">
        <FadeInSection>
          <VideoCard v={closingVideo} />
        </FadeInSection>
      </section>
    </main>
  );
}