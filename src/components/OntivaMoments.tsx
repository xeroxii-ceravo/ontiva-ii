"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import LuxuryDrawer from "@/components/launch/LuxuryDrawer";
import { momentImagePath, ontivaMoments } from "@/data/ontivaMoments";

export default function OntivaMoments() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const selected = ontivaMoments[active];
  const navigate = (direction: number) => setActive((index) => (index + direction + ontivaMoments.length) % ontivaMoments.length);

  return (
    <section id="instagram" aria-labelledby="moments-heading" className="border-t border-zinc-800 bg-[#0a0a0a] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <header className="mb-10 text-center">
          <p className="mb-3 text-[10px] tracking-[0.3em] text-luxury-gold">THE EVERYDAY, EXTRAORDINARY</p>
          <h2 id="moments-heading" className="font-serif text-3xl tracking-wide text-white sm:text-4xl">ONTIVA Moments</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400">An editorial journal of considered details and personal style. Select a moment to explore.</p>
        </header>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ontivaMoments.map((moment, index) => (
            <button
              key={moment.filename}
              type="button"
              aria-label={`Enlarge ${moment.title}`}
              aria-haspopup="dialog"
              onClick={() => { setActive(index); setOpen(true); }}
              className="group relative aspect-[3/4] w-full overflow-hidden border border-zinc-800 bg-[#121212] text-left transition-colors hover:border-luxury-gold/50"
            >
              <Image src={momentImagePath(moment.filename)} alt={moment.alt} fill sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1280px) 25vw, 280px" className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                <span className="font-serif text-sm leading-5 text-white sm:text-base">{moment.title}</span>
                <Expand size={16} aria-hidden="true" className="mb-1 shrink-0 text-amber-200" />
              </span>
            </button>
          ))}
        </div>
      </div>
      <LuxuryDrawer open={open} onClose={() => setOpen(false)} title="ONTIVA Moments" fullScreen>
        <div className="mx-auto max-w-6xl" onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
        }}>
          <motion.figure key={selected.filename} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.25 }}>
            <div className="relative h-[max(180px,calc(100dvh-240px))] w-full">
              <Image src={momentImagePath(selected.filename)} alt={selected.alt} fill sizes="(max-width: 1200px) 100vw, 1152px" className="h-full w-full object-contain object-center" />
            </div>
            <figcaption className="mt-4 text-center font-serif text-lg text-zinc-100">{selected.title}</figcaption>
          </motion.figure>
          <div className="mt-3 flex items-center justify-center gap-6">
            <button type="button" aria-label="Previous moment" onClick={() => navigate(-1)} className="flex size-11 items-center justify-center border border-zinc-700 text-amber-200 transition-colors hover:border-amber-200"><ArrowLeft size={18} /></button>
            <p aria-live="polite" aria-atomic="true" className="text-xs tracking-widest text-zinc-400"><span className="sr-only">{selected.title}, </span>{active + 1} / {ontivaMoments.length}</p>
            <button type="button" aria-label="Next moment" onClick={() => navigate(1)} className="flex size-11 items-center justify-center border border-zinc-700 text-amber-200 transition-colors hover:border-amber-200"><ArrowRight size={18} /></button>
          </div>
        </div>
      </LuxuryDrawer>
    </section>
  );
}
