"use client";

import Image from "next/image";
import Link from "next/link";
import LuxuryDrawer from "./LuxuryDrawer";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useWishlistDrawerStore } from "@/store/useWishlistDrawerStore";
import { formatBDT } from "@/lib/currency";
import type { Product } from "@/data/products";

/** Pass the complete canonical catalog, including every curated item. */
export default function CommerceDrawers({ catalog, shippingThreshold }: { catalog: readonly Product[]; shippingThreshold: number }) {
  const { cart, cartOpen, removeItem, updateQuantity } = useCartStore();
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeSaved = useWishlistStore((state) => state.removeFromWishlist);
  const { wishlistOpen, closeWishlistDrawer } = useWishlistDrawerStore();
  const closeCart = () => useCartStore.setState({ cartOpen: false });
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const saved = wishlist.map((id) => ({ id, product: catalog.find((product) => product.id === id) }));

  return <>
    <LuxuryDrawer open={cartOpen && !wishlistOpen} onClose={closeCart} title="Your Bag">
      {cart.length === 0 ? <div className="space-y-5"><p className="text-zinc-400">Your next signature piece awaits.</p><Link href="/shop" onClick={closeCart} className="inline-flex min-h-11 items-center text-amber-300">Explore the collection</Link></div> : <>
        <ul className="divide-y divide-zinc-800">
          {cart.map((item) => <li key={item.id} className="flex gap-4 py-5">
            <Image unoptimized src={item.image} alt={item.name} width={80} height={100} className="h-24 w-20 shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg">{item.name}</h3>
              <p className="mt-2 text-sm text-amber-300">{formatBDT(item.price)}</p>
              <div className="mt-3 flex items-center gap-2">
                <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="size-11 border border-zinc-700">−</button>
                <span className="min-w-6 text-center" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="size-11 border border-zinc-700">+</button>
                <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from bag`} className="ml-auto min-h-11 text-xs text-zinc-400 hover:text-white">Remove</button>
              </div>
            </div>
          </li>)}
        </ul>
        <div className="sticky bottom-0 space-y-4 border-t border-zinc-800 bg-[#0a0a0a] py-5">
          <p className="flex justify-between font-serif text-xl"><span>Subtotal</span><span className="text-amber-300">{formatBDT(subtotal)}</span></p>
          <p role="status" className="text-xs text-zinc-400">{remaining > 0 ? `Add ${formatBDT(remaining)} for complimentary shipping.` : "Complimentary shipping unlocked."}</p>
          <Link href="/checkout" onClick={closeCart} className="flex min-h-12 items-center justify-center bg-amber-300 text-xs tracking-widest text-black">CONTINUE TO CHECKOUT</Link>
        </div>
      </>}
    </LuxuryDrawer>
    <LuxuryDrawer open={wishlistOpen} onClose={closeWishlistDrawer} title="Saved Pieces">
      {saved.length === 0 ? <p className="text-zinc-400">Save the pieces you love to revisit them here.</p> : <ul className="divide-y divide-zinc-800">
        {saved.map(({ id, product }) => <li key={id} className="flex gap-4 py-5">
          {product && <Image unoptimized src={product.image} alt={product.title} width={80} height={100} className="h-24 w-20 shrink-0 object-cover" />}
          <div className="flex-1">
            <h3 className="font-serif text-lg">{product?.title ?? "Previously saved piece"}</h3>
            {product ? <><p className="mt-2 text-sm text-amber-300">{formatBDT(product.price)}</p><Link href={`/product/${id}`} onClick={closeWishlistDrawer} className="inline-flex min-h-11 items-center text-sm text-amber-200">View details</Link></> : <p className="mt-2 text-sm text-zinc-400">This piece is currently unavailable.</p>}
            <button type="button" onClick={() => removeSaved(id)} className="block min-h-11 text-xs text-zinc-400 hover:text-white" aria-label={`Remove ${product?.title ?? "unavailable piece"} from wishlist`}>Remove</button>
          </div>
        </li>)}
      </ul>}
    </LuxuryDrawer>
  </>;
}
