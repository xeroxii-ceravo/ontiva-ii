"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const wishlist = useWishlistStore((state) => state.wishlist);

  // Get the product objects for the wishlist IDs
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-luxury-dark">
      <div className="px-6 py-12">
        <h1 className="text-3xl font-playfairDisplay text-center mb-10 text-luxury-gold">
          My Wishlist
        </h1>

        {wishlistProducts.length === 0 ? (
          <p className="text-luxury-lighter/60 text-center py-12">
            Your wishlist is empty. Click the heart icon on any product to add it to your wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
<ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
