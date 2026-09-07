import { readdir } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GlowWrapper from "@/components/GlowWrapper";
import PartyHillsSection from "@/components/PartyHillsSection";
import BagsSection from "@/components/BagsSection";

const categories = [
  { folder: "bags", title: "Bags", subtitle: "The finishing touch to your everyday." },
  { folder: "parts", title: "Parts", subtitle: "Discover the details in our collection." },
  { folder: "party hills", title: "Party Hills", subtitle: "Make an entrance. Leave an impression." },
  { folder: "regular footwear", title: "Regular Footwear", subtitle: "Find your everyday signature." },
  { folder: "shoes", title: "Shoes", subtitle: "A considered step in every direction." },
] as const;

// Public assets are scanned at build time; rebuild when images are added.
export default async function CategorySections() {
  const collections = await Promise.all(categories.map(async (category) => {
    if (category.folder === "party hills" || category.folder === "bags") return { ...category, images: [] };
    const entries = await readdir(path.join(process.cwd(), "public", "products", category.folder), { withFileTypes: true });
    const images = entries
      .filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|webp)$/i.test(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
      .map((filename) => `/products/${encodeURIComponent(category.folder)}/${encodeURIComponent(filename)}`);
    return { ...category, images };
  }));

  return (
    <div className="bg-[#0a0a0a]">
      {collections.map(({ folder, title, subtitle, images }, categoryIndex) => {
        if (folder === "bags") return <BagsSection key={folder} />;
        if (folder === "party hills") return <PartyHillsSection key={folder} />;
        const id = folder.replaceAll(" ", "-");
        return (
          <section key={folder} id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-t border-zinc-800">
            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
              <FadeIn className="mb-9 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-3 text-[10px] tracking-[0.3em] text-luxury-gold">THE ONTIVA EDIT / {String(categoryIndex + 1).padStart(2, "0")}</p>
                  <h2 id={`${id}-heading`} className="font-serif text-2xl uppercase tracking-[0.12em] text-luxury-gold sm:text-3xl">{title}</h2>
                  <p className="mt-3 text-sm text-zinc-400">{subtitle}</p>
                </div>
                <span className="shrink-0 text-[10px] tracking-widest text-zinc-500">{String(images.length).padStart(2, "0")} IMAGES</span>
              </FadeIn>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {images.map((src, index) => (
                  <FadeIn key={src} delay={(index % 4) * 0.09} className="h-full">
                    <GlowWrapper className="group h-full border border-zinc-800 bg-[#121212] transition-colors hover:border-luxury-gold/40">
                      <figure>
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#121212]">
                          <Image src={src} alt={`${title} collection photo ${index + 1}`} fill
                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 25vw, 280px"
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none" />
                        </div>
                        <figcaption className="flex items-center justify-between gap-3 border-t border-zinc-800 p-5">
                          <span className="font-serif text-sm uppercase tracking-[0.08em]">{title}</span>
                          <span className="text-[10px] tracking-widest text-luxury-gold">{String(index + 1).padStart(2, "0")}</span>
                        </figcaption>
                      </figure>
                    </GlowWrapper>
                  </FadeIn>
                ))}
              </div>
              {images.length === 0 && <p className="py-12 text-center text-zinc-400">New pieces coming soon.</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
