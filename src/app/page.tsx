import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
export default function Home() {
  return <><Hero /><ProductGrid id="new-arrivals" title="NEW ARRIVALS" subtitle="Discover your next signature piece." items={products.slice(0, 4)} /><div className="border-t border-zinc-800"><ProductGrid items={products.slice(2, 6)} /></div></>;
}
