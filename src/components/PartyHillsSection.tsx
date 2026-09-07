import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GlowWrapper from "@/components/GlowWrapper";
import { partyHillsImagePath, partyHillsProducts } from "@/data/partyHills";
import { formatBDT } from "@/lib/currency";

export default function PartyHillsSection() {
  return (
    <section id="party-hills" aria-labelledby="party-hills-heading" className="scroll-mt-24 border-t border-zinc-800 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <FadeIn className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[10px] tracking-[0.3em] text-luxury-gold">THE ONTIVA EDIT / 03</p>
            <h2 id="party-hills-heading" className="font-serif text-2xl uppercase tracking-[0.12em] text-luxury-gold sm:text-3xl">Party Hills</h2>
            <p className="mt-3 text-sm text-zinc-400">Make an entrance. Leave an impression.</p>
          </div>
          <span className="shrink-0 text-[10px] tracking-widest text-zinc-500">THE OCCASION EDIT</span>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partyHillsProducts.map((product, index) => (
            <FadeIn key={product.filename} delay={(index % 4) * 0.09} className="h-full">
              <GlowWrapper className="group h-full border border-zinc-800 bg-[#121212] transition-colors hover:border-luxury-gold/40">
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#191919]">
                    <Image
                      src={partyHillsImagePath(product.filename)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 25vw, 280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-zinc-800 p-5">
                    <h3 className="font-serif text-lg leading-6 text-zinc-100">{product.title}</h3>
                    <p className="mt-auto pt-4 text-sm tracking-wide text-amber-400">{formatBDT(product.price)}</p>
                  </div>
                </article>
              </GlowWrapper>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
