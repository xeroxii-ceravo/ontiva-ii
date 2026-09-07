"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useWishlistDrawerStore } from "@/store/useWishlistDrawerStore";
import { X } from "lucide-react";
import Image from "next/image";
import { products } from "@/data/products";

export default function WishlistDrawer() {
  const wishlistOpen = useWishlistDrawerStore((state) => state.wishlistOpen);
  const toggleWishlistDrawer = useWishlistDrawerStore((state) => state.toggleWishlistDrawer);
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  if (!wishlistOpen) return null;
  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        aria-label="Close wishlist"
        onClick={toggleWishlistDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      {/* Wishlist Drawer */}
      <div role="dialog" aria-label="Wishlist" className="relative h-full w-full lg:max-w-md overflow-y-auto border-l border-zinc-800 bg-luxury-dark p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-playfairDisplay">Wishlist</h2>
          <button aria-label="Close wishlist" onClick={toggleWishlistDrawer} className="hover:text-luxury-gold transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Wishlist Items */}
        {wishlistProducts.length === 0 ? (
          <p className="text-luxury-lighter/60 text-center py-8">
            Your wishlist is empty.
          </p>
        ) : (
          <>
            {wishlistProducts.map((product) => (
              <div key={product.id} className="flex flex-col mb-6 last:mb-0">
                {/* Item Details */}
                <div className="flex items-start mb-4">
                  <Image unoptimized width={96} height={96}
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-playfairDisplay text-lg mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-luxury-lighter/60 mb-2 line-clamp-3">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="self-end text-luxury-lighter/50 hover:text-luxury-gold transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
