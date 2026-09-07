import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  wishlist: number[]; // array of product IDs
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  // Check if a product is in the wishlist
  hasProduct: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (productId) => {
        set((state) => {
          // Avoid duplicates
          if (state.wishlist.includes(productId)) {
            return state;
          }
          return {
            wishlist: [...state.wishlist, productId],
          };
        });
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        }));
      },
      hasProduct: (productId) => {
        const state = get();
        return state.wishlist.includes(productId);
      },
    }),
    {
      name: "wishlist-storage",
      skipHydration: true,
    }
  )
);

