"use client";
import { useState } from "react";
import { Heart, Plus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import type { Product } from "@/data/products";
export default function ProductCard({ id, name, description, price, image }: Product) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const saved = useWishlistStore((s) => s.wishlist.includes(id));
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  return <article className="group flex h-full flex-col overflow-hidden border border-zinc-800 bg-[#121212] transition-colors hover:border-luxury-gold/40">
    <div className="relative aspect-[4/5] overflow-hidden bg-[#191919]">
      <Link href={`/product/${id}`} aria-label={`View ${name}`} className="block h-full"><Image unoptimized src={image} alt={name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></Link>
      <button type="button" aria-label={`${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} wishlist`} aria-pressed={saved} onClick={() => saved ? removeFromWishlist(id) : addToWishlist(id)} className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/65 text-luxury-gold hover:bg-black"><Heart size={20} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} /></button>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <Link href={`/product/${id}`} className="font-serif text-lg leading-6 hover:text-luxury-gold">{name}</Link>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">{description}</p>
      <div className="mt-auto flex items-center justify-between pt-5"><span className="text-sm tracking-wide text-luxury-gold">${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><button type="button" aria-label={`Add ${name} to cart`} onClick={() => { addItem({ id, name, price, image }); setAdded(true); }} className="flex size-12 items-center justify-center border border-zinc-700 text-luxury-gold transition-colors hover:border-luxury-gold hover:bg-luxury-gold hover:text-black">{added ? <Check size={20} /> : <Plus size={20} />}</button></div>
      <span className="sr-only" role="status">{added ? `${name} added to cart` : ""}</span>
    </div>
  </article>;
}
