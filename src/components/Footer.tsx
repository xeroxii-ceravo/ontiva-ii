import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-800 bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:px-12">
        {/* About */}
        <div id="about">
          <Link href="/" className="font-serif text-3xl tracking-[0.25em]">
            ONTIVA
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-zinc-400">
            An appreciation for the exceptional. Discover thoughtfully curated accessories that bring timeless elegance to your everyday.
          </p>
          <p className="mt-5 text-[10px] tracking-[0.25em] text-luxury-gold">
            LUXURY IN EVERY DETAIL.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h2 className="mb-6 text-xs tracking-[0.2em]">EXPLORE</h2>
<div className="grid gap-4 text-sm text-zinc-400">
             <Link href="/shop" className="hover:text-luxury-gold">
               Shop all pieces
             </Link>
             <Link href="/#new-arrivals" className="hover:text-luxury-gold">
               New arrivals
             </Link>
             <Link href="/#collections" className="hover:text-luxury-gold">
               Featured collection
             </Link>
             <Link href="/wishlist" className="hover:text-luxury-gold">
               Your wishlist
             </Link>
             <Link href="/founder" className="hover:text-luxury-gold">
               Founder's Story
             </Link>
           </div>
        </div>

        {/* At Your Service */}
        <div>
          <h2 className="mb-6 text-xs tracking-[0.2em]">AT YOUR SERVICE</h2>
          <p className="text-sm leading-7 text-zinc-400">
            For product enquiries and personal assistance, connect with our team.
          </p>
          <a href="mailto:hello@ontiva.com" className="mt-5 inline-flex items-center gap-3 text-sm text-luxury-gold">
            hello@ontiva.com <ArrowUpRight size={15} />
          </a>
          <Link href="/account" className="mt-5 block text-sm text-zinc-400 hover:text-luxury-gold">
            My account
          </Link>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="mb-6 text-xs tracking-[0.2em]">JOIN THE ONTIVA CIRCLE</h2>
          <p className="mb-4 text-sm leading-7 text-zinc-400">
            Get VIP early access to new collections and exclusive offers.
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 text-sm border border-zinc-700 bg-zinc-900 rounded-lg focus:outline-none focus:border-luxury-gold"
            />
            <button
              type="submit"
              className="border border-luxury-gold px-8 py-4 text-xs tracking-[0.2em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-black"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-zinc-800 px-6 py-6 text-[10px] tracking-wide text-zinc-500 sm:px-10 lg:px-12">
        <p>© {new Date().getFullYear()} ONTIVA. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <LockKeyhole size={12} /> Crafted with care. Worn with confidence.
        </p>
      </div>
    </footer>
  );
}