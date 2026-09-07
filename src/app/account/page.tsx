import Link from "next/link";
export default function AccountPage() {
  return <section className="mx-auto min-h-[50vh] max-w-2xl px-6 py-20"><p className="text-xs tracking-widest text-luxury-gold">YOUR ONTIVA</p><h1 className="mt-4 font-serif text-4xl">My account</h1><p className="mt-6 leading-7 text-zinc-400">Account sign-in is currently unavailable. You can still explore the collection and save your favourite pieces on this device.</p><Link href="/wishlist" className="mt-8 inline-block border border-luxury-gold px-6 py-3 text-sm text-luxury-gold">VIEW YOUR WISHLIST →</Link></section>;
}
