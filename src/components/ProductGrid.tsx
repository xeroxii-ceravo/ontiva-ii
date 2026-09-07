import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products, type Product } from "@/data/products";
interface ProductGridProps { title?: string; subtitle?: string; items?: Product[]; id?: string; }
export default function ProductGrid({ title = "FEATURED COLLECTION", subtitle = "Exceptional pieces. Enduring style.", items = products, id = "collections" }: ProductGridProps) {
  return <section id={id} aria-label={title} className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
    <div className="mb-9 flex items-end justify-between gap-4"><div><p className="mb-3 text-[10px] tracking-[0.3em] text-luxury-gold">CURATED BY ONTIVA</p><h2 className="font-serif text-2xl tracking-[0.08em] sm:text-3xl">{title}</h2><p className="mt-3 text-sm text-zinc-400">{subtitle}</p></div><Link href="/shop" className="flex shrink-0 items-center gap-2 border-b border-luxury-gold/50 pb-2 text-[10px] tracking-widest text-luxury-gold">VIEW ALL <ArrowRight size={14} /></Link></div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((product) => <ProductCard key={product.id} {...product} />)}</div>
    {items.length === 0 && <p className="py-12 text-center text-zinc-400">No pieces found. Try another search.</p>}
  </section>;
}
