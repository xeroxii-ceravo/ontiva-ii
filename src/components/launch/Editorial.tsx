"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import LuxuryDrawer from "./LuxuryDrawer";

export function AnnouncementBar({ message, href }: { message: string; href: string }) {
  const reduced = useReducedMotion();
  return (
    <aside aria-label="Store announcement" className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0a0a0a] px-4 py-2 text-center">
      <motion.div initial={false} animate={{ opacity: reduced ? 1 : [0.75, 1] }} transition={{ duration: 1.2 }}>
        <Link href={href} className="block text-[10px] leading-5 tracking-[0.12em] text-amber-200 hover:text-white">{message}</Link>
      </motion.div>
    </aside>
  );
}

export function TrustStrip({ items }: { items: readonly { title: string; detail: string; href: string }[] }) {
  return <div className="border-y border-zinc-800 bg-[#0a0a0a]"><div className="mx-auto grid max-w-7xl divide-y divide-zinc-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
    {items.map((item) => <Link key={item.title} href={item.href} className="group px-6 py-7 transition-colors hover:bg-zinc-900 focus-visible:bg-zinc-900">
      <p className="font-serif text-base text-zinc-100 transition-colors group-hover:text-amber-200">{item.title}</p>
      <p className="mt-2 text-xs leading-5 text-zinc-400">{item.detail}</p>
    </Link>)}
  </div></div>;
}

export function FullscreenMobileMenu({ open, onClose, links }: { open: boolean; onClose: () => void; links: readonly { label: string; href: string }[] }) {
  const reduced = useReducedMotion();
  return <LuxuryDrawer open={open} onClose={onClose} title="Explore ONTIVA" fullScreen>
    <nav aria-label="Mobile categories" className="mx-auto max-w-3xl">
      {links.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : index * 0.06 }}>
        <Link href={link.href} onClick={onClose} className="block border-b border-zinc-800 py-5 font-serif text-3xl text-zinc-100 transition-colors hover:text-amber-200">{link.label}</Link>
      </motion.div>)}
    </nav>
  </LuxuryDrawer>;
}
