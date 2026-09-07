import Link from "next/link";
import { ArrowRight, Truck, Gem, RotateCcw, ShieldCheck } from "lucide-react";
const features = [
  { icon: Truck, title: "Free Shipping", detail: "On orders over $150" },
  { icon: Gem, title: "Premium Quality", detail: "Every detail considered" },
  { icon: RotateCcw, title: "Easy Returns", detail: "Shop with confidence" },
  { icon: ShieldCheck, title: "Secure Payment", detail: "Peace of mind, always" },
];
export default function Hero() {
  return <>
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[580px] items-center overflow-hidden border-b border-zinc-800 bg-black lg:min-h-[660px]">
      <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-[70%_center]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black via-black/80 to-black/15" />
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12">
        <p className="mb-7 text-[10px] tracking-[0.4em] text-luxury-gold sm:text-xs">THE ART OF EVERYDAY LUXURY</p>
        <h1 id="hero-title" className="max-w-2xl font-serif text-4xl leading-[1.15] tracking-wide text-white sm:text-6xl lg:text-7xl">WHERE ELEGANCE<br />MEETS <span className="italic text-[#ddc898]">TIMELESS</span></h1>
        <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-400">Designed for modern women who appreciate luxury in every detail.</p>
        <Link href="/shop" className="mt-9 inline-flex items-center gap-9 border border-luxury-gold px-8 py-4 text-xs tracking-[0.2em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-black">SHOP NOW <ArrowRight size={17} /></Link>
      </div>
    </section>
    <div className="border-b border-zinc-800 bg-[#0e0e0e]"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-9 lg:grid-cols-4 lg:gap-0">
      {features.map(({ icon: Icon, title, detail }) => <div key={title} className="flex items-center justify-center gap-4 lg:border-r lg:border-zinc-800 lg:last:border-0"><Icon className="shrink-0 text-luxury-gold" size={25} strokeWidth={1.2} /><div><p className="font-serif text-sm sm:text-base">{title}</p><p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">{detail}</p></div></div>)}
    </div></div>
  </>;
}
