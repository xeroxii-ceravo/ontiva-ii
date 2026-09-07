import { create } from "zustand";

interface WishlistDrawerState {
  wishlistOpen: boolean;
  openWishlistDrawer: () => void;
  closeWishlistDrawer: () => void;
  toggleWishlistDrawer: () => void;
}

export const useWishlistDrawerStore = create<WishlistDrawerState>((set) => ({
  wishlistOpen: false,
  openWishlistDrawer: () => set({ wishlistOpen: true }),
  closeWishlistDrawer: () => set({ wishlistOpen: false }),
  toggleWishlistDrawer: () => set((state) => ({ wishlistOpen: !state.wishlistOpen })),
}));