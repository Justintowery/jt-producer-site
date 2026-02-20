"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { work, type WorkItem } from "@/data/work";

function getYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v")!;
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex >= 0 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];
  } catch {}
  return null;
}

function getVimeoId(url: string) {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("vimeo.com")) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    if (last && /^\d+$/.test(last)) return last;
    const videoIndex = parts.indexOf("video");
    if (videoIndex >= 0 && parts[videoIndex + 1] && /^\d+$/.test(parts[videoIndex + 1])) {
      return parts[videoIndex + 1];
    }
  } catch {}
  return null;
}

function getEmbed(url: string) {
  const yt = getYouTubeId(url);
  if (yt) {
    return {
      type: "youtube" as const,
      src: `https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`,
    };
  }
  const vimeo = getVimeoId(url);
  if (vimeo) {
    return {
      type: "vimeo" as const,
      src: `https://player.vimeo.com/video/${vimeo}`,
    };
  }
  return null;
}

export default function WorkPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<WorkItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return work;
    return work.filter((w) => w.brand.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="min-h-dvh bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Work
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected work
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Public links where available. The rest on request.
          </p>

          <div className="mt-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand…"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-[15px] text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/7"
            />
          </div>
        </motion.div>

        {/* GRID */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => {
            const playable = !!item.videoUrl && !!getEmbed(item.videoUrl);
            const locked = !playable;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => {
                  if (playable) setActive(item);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: Math.min(i * 0.03, 0.2) }}
                className={[
                  "group text-left rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] transition",
                  playable ? "hover:bg-white/[0.06] hover:border-white/20" : "opacity-90",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-white">
                    {item.brand}
                  </h2>

                  <div className="shrink-0">
                    {playable ? (
                      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                        Play
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/0 px-3 py-1 text-xs text-zinc-400">
                        {item.status ?? "Available on request"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-white/10" />

                <p className="mt-4 text-sm text-zinc-400">
                  {locked ? "Link available on request." : "Click to watch."}
                </p>

                {/* subtle hover underline */}
                <div className="mt-4 h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-16" />
              </motion.button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-sm text-zinc-400">
            No results. Try a different search.
          </div>
        )}
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && active.videoUrl && (
          <Modal item={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Modal({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const embed = item.videoUrl ? getEmbed(item.videoUrl) : null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_25px_120px_rgba(0,0,0,0.75)]"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">{item.brand}</h3>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/15 bg-white/0 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/25 hover:bg-white/5"
          >
            Close
          </button>
        </div>

        {/* video */}
        <div className="aspect-video w-full bg-black">
          {embed ? (
            <iframe
              src={embed.src}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.brand}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-400">
              Video link isn’t ready yet.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}