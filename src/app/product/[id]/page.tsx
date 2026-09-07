"use client";

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Heart, ShoppingCart } from "lucide-react";
import { use, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const productId = Number(id);
  const product = products.find((p) => p.id === productId);

  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, hasProduct } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  const isInWishlist = hasProduct(productId);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-luxury-dark">
      <div className="px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-80 lg:h-96">
            <Image unoptimized fill sizes="(max-width: 1024px) 100vw, 50vw"
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-playfairDisplay text-4xl mb-4 text-luxury-gold">{product.name}</h1>
            <p className="text-luxury-lighter/60 mb-6 line-clamp-4">{product.description}</p>
            <div className="mb-6">
              <span className="font-playfairDisplay text-3xl text-luxury-gold">${product.price.toFixed(2)}</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center bg-luxury-lighter/20 border border-luxury-lighter/30 hover:bg-luxury-gold/10 transition-colors"
              >
                -
              </button>
              <span className="mx-4 w-16 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center bg-luxury-lighter/20 border border-luxury-lighter/30 hover:bg-luxury-gold/10 transition-colors"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
              <button
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }, quantity)}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-luxury-gold text-luxury-dark font-medium hover:bg-luxury-gold/90 transition-colors"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
              <button
                onClick={() => {
                  if (isInWishlist) {
                    removeFromWishlist(productId);
                  } else {
                    addToWishlist(productId);
                  }
                }}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? "text-luxury-gold" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

