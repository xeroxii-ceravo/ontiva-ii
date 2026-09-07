import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { bags } from "@/data/products";

export default function BagsSection() {
  return (
    <section id="bags" aria-labelledby="bags-heading" className="scroll-mt-24 border-t border-zinc-800 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <FadeIn className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[10px] tracking-[0.3em] text-luxury-gold">THE ONTIVA EDIT / 01</p>
            <h2 id="bags-heading" className="font-serif text-2xl uppercase tracking-[0.12em] text-luxury-gold sm:text-3xl">Bags</h2>
            <p className="mt-3 text-sm text-zinc-400">The finishing touch to your everyday.</p>
          </div>
          <span className="shrink-0 text-[10px] tracking-widest text-zinc-500">THE SIGNATURE EDIT</span>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {bags.slice(0, 15).map((product, index) => (
            <FadeIn key={product.id} delay={(index % 4) * 0.09} className="h-full">
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
