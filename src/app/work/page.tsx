"use client";

// src/app/work/page.tsx
import { useEffect, useMemo, useRef, useState } from "react";

type WorkVideo = {
  title: string;
  vimeoId: string;
  aspect: "horizontal" | "vertical";
};

function vimeoEmbedSrc(id: string, opts?: { autoplay?: boolean }) {
  const autoplay = opts?.autoplay ? 1 : 0;

  // Vimeo player parameters (hide title/byline/portrait, respect DNT, avoid random autoplay behavior)
  // Note: full removal of Vimeo UI/branding generally isn't available on free embeds.
  return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0&badge=0&dnt=1&autopause=1&autoplay=${autoplay}&muted=1`;
}

function useVimeoThumb(vimeoId: string) {
  const [thumb, setThumb] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(
          `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`,
          { cache: "force-cache" }
        );
        if (!res.ok) return;
        const data = (await res.json()) as { thumbnail_url?: string };
        if (!cancelled) setThumb(data.thumbnail_url ?? null);
      } catch {
        // ignore
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [vimeoId]);

  return thumb;
}

function VideoCard({ v }: { v: WorkVideo }) {
  const isVertical = v.aspect === "vertical";
  const aspectClass = isVertical ? "aspect-[9/16]" : "aspect-video";

  // “Play on hover” for desktop; “tap to play” for mobile.
  const [active, setActive] = useState(false);

  // Avoid “hover play” on touch devices (they often emulate hover weirdly)
  const isTouchDeviceRef = useRef(false);
  useEffect(() => {
    isTouchDeviceRef.current =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const thumb = useVimeoThumb(v.vimeoId);

  const wrapperClass = useMemo(() => {
    // verticals need a max width or they get huge and won’t pair nicely
    return [
      "overflow-hidden rounded-2xl border border-white/10 bg-black",
      "shadow-[0_24px_90px_rgba(0,0,0,0.55)]",
      isVertical ? "w-full max-w-[360px] mx-auto" : "w-full",
    ].join(" ");
  }, [isVertical]);

  const onEnter = () => {
    if (isTouchDeviceRef.current) return;
    setActive(true);
  };

  const onLeave = () => {
    if (isTouchDeviceRef.current) return;
    setActive(false);
  };

  const onClick = () => {
    // Tap toggles on mobile
    if (!isTouchDeviceRef.current) return;
    setActive((s) => !s);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={wrapperClass}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <div className={`${aspectClass} w-full bg-black relative`}>
          {/* Thumbnail state (no Vimeo UI visible) */}
          {!active && (
            <div className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: thumb ? `url(${thumb})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(1.02)",
                }}
              />
              {/* Soft cinematic overlay + subtle play hint */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs tracking-[0.25em] text-white/85 backdrop-blur">
                  PLAY
                </div>
              </div>
            </div>
          )}

          {/* Active state (iframe injected only when playing) */}
          {active && (
            <iframe
              src={vimeoEmbedSrc(v.vimeoId, { autoplay: true })}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={v.title}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-white/85 text-center">{v.title}</p>
    </div>
  );
}

export default function WorkPage() {
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
          {/* Replaces the old "VIEW WORK" / "Selected Work" text */}
          <p className="text-xs tracking-[0.4em] text-white/60">A FEW PROJECTS</p>
        </header>

        {/* Featured */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
            <div className="aspect-video w-full">
              <iframe
                src={vimeoEmbedSrc(featured.vimeoId, { autoplay: false })}
                className="h-full w-full"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                title={featured.title}
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-4 text-sm text-white/85">{featured.title}</p>
        </section>

        {/* Horizontals */}
        <section className="mt-14 space-y-14">
          {horizontals.map((v) => (
            <div key={v.vimeoId}>
              <VideoCard v={v} />
            </div>
          ))}
        </section>

        {/* Vertical Pair (tightened spacing so there isn’t a big dead zone) */}
        <section className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {verticalPair.map((v) => (
              <VideoCard key={v.vimeoId} v={v} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}