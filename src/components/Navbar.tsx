"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, UserRound, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useWishlistDrawerStore } from "@/store/useWishlistDrawerStore";
import MobileMenu from "./MobileMenu";
const links = [["HOME", "/"], ["SHOP", "/shop"], ["COLLECTIONS", "/#collections"], ["ABOUT", "/#about"], ["CONTACT", "/#contact"]];
export default function Navbar() {
  const pathname = usePathname();
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) => s.cart.reduce((sum, item) => sum + item.quantity, 0));
  const toggleWishlistDrawer = useWishlistDrawerStore((s) => s.toggleWishlistDrawer);
  const wishlistCount = useWishlistStore((s) => s.wishlist.length);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="relative z-30 border-b border-zinc-800 bg-[#0a0a0a]">
    <div className="border-b border-luxury-gold/15 bg-[#15130e] px-4 py-2.5 text-center text-[9px] tracking-[0.22em] text-[#d8c58d]">FREE SHIPPING ON ORDERS OVER $150</div>
    <nav aria-label="Main navigation" className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-6 px-6 sm:px-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12">
      <Link href="/" className="font-serif text-3xl tracking-[0.24em]">ONTIVA</Link>
      <div className="hidden items-center gap-7 lg:flex">{links.map(([label, href]) => <Link key={label} href={href} aria-current={pathname === href ? "page" : undefined} className={`text-[10px] tracking-[0.15em] transition-colors hover:text-luxury-gold ${pathname === href ? "text-luxury-gold" : "text-zinc-300"}`}>{label}</Link>)}</div>
<div className="flex items-center justify-end gap-1 sm:gap-3">
  <button aria-label="Search products" aria-expanded={searchOpen} aria-controls="product-search" onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 hover:text-luxury-gold">{searchOpen ? <X size={19} /> : <Search size={19} strokeWidth={1.5} />}</button>
  <Link href="/account" aria-label="Your account" className="p-2.5 hover:text-luxury-gold"><UserRound size={19} strokeWidth={1.5} /></Link>
  <button aria-label={`Open wishlist, ${wishlistCount} items`} onClick={toggleWishlistDrawer} className="relative p-2.5 hover:text-luxury-gold"><Heart size={19} strokeWidth={1.5} /><span className="absolute -right-1 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-luxury-gold px-1 text-[9px] leading-4 text-black" aria-live="polite">{wishlistCount}</span></button>
  <button aria-label={`Open cart, ${count} items`} onClick={toggleCart} className="relative p-2.5 hover:text-luxury-gold"><ShoppingBag size={19} strokeWidth={1.5} /><span className="absolute -right-1 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-luxury-gold px-1 text-[9px] leading-4 text-black" aria-live="polite">{count}</span></button>
  <button aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className="p-2 lg:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
</div>
    </nav>
    {menuOpen && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    {searchOpen && <form id="product-search" action="/shop" onSubmit={() => setSearchOpen(false)} className="mx-auto flex max-w-7xl gap-3 border-t border-zinc-800 px-6 py-5"><label htmlFor="search" className="sr-only">Search products</label><input autoFocus id="search" name="q" type="search" placeholder="Search jewelry, watches, accessories…" className="min-w-0 flex-1 border border-zinc-700 bg-[#121212] px-4 py-3 text-sm placeholder:text-zinc-500" /><button className="border border-luxury-gold px-5 text-xs tracking-widest text-luxury-gold">SEARCH</button></form>}
  </header>;
}
