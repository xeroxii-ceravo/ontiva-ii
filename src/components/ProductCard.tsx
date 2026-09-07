"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Plus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatBDT } from "@/lib/currency";
import GlowWrapper from "@/components/GlowWrapper";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { id, title, price, image } = product;
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const saved = useWishlistStore((s) => s.wishlist.includes(id));
  const addToWishlist = useWishlistStore((s) => s.addToWishlist);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);

  return (
    <GlowWrapper className="h-full">
      <motion.article
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="group flex h-full flex-col overflow-hidden border border-zinc-800 bg-[#121212] transition-colors hover:border-luxury-gold/40"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#121212]">
          <Link
            href={`/product/${id}`}
            aria-label={`View ${title}`}
            className="block h-full"
          >
            <Image
              unoptimized
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1023px) 50vw, 25vw"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
            />
          </Link>
          <motion.button
            whileHover={{ opacity: 0.8 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            type="button"
            aria-label={`${saved ? "Remove" : "Save"} ${title} ${saved ? "from" : "to"} wishlist`}
            aria-pressed={saved}
            onClick={() => (saved ? removeFromWishlist(id) : addToWishlist(id))}
            className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/65 text-luxury-gold hover:bg-black"
          >
            <Heart size={20} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
          </motion.button>
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-6">
          <div className="mb-6">
            <Link
              href={`/product/${id}`}
              className="font-serif text-sm text-zinc-100 hover:text-luxury-gold"
            >
              {title}
            </Link>
            <span className="block mt-1 text-amber-400 font-medium text-xs">
              {formatBDT(price)}
            </span>
          </div>
          <div className="mt-auto flex justify-end">
            <motion.button
              whileHover={{ opacity: 0.8 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              type="button"
              aria-label={`Add ${title} to cart`}
              onClick={() => {
                addItem({ id, name: title, price, image });
                useCartStore.setState({ cartOpen: true });
                setAdded(true);
              }}
              className="flex min-h-12 w-full items-center justify-center gap-2 border border-zinc-700 px-2 text-xs text-luxury-gold transition-colors hover:border-luxury-gold hover:bg-luxury-gold hover:text-black"
            >
              {added ? <Check size={20} /> : <Plus size={20} />}
              Add to Cart
            </motion.button>
          </div>
          <span className="sr-only" role="status">
            {added ? `${title} added to cart` : ""}
          </span>
        </div>
      </motion.article>
    </GlowWrapper>
  );
}
