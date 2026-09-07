"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
export default function StoreHydration() {
  useEffect(() => { void useCartStore.persist.rehydrate(); void useWishlistStore.persist.rehydrate(); }, []);
  return null;
}
