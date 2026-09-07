"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { formatBDT } from "@/lib/currency";

export default function CheckoutForm({ enabled }: { enabled: boolean }) {
  const cart = useCartStore((state) => state.cart);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const pending = useRef(false);
  const attempt = useRef({ payload: "", key: "" });
  const lines = cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }));
  const invalid = lines.some((line) => !line.product || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99);
  const subtotal = lines.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || !enabled || invalid || cart.length === 0) return;
    pending.current = true;
    setBusy(true);
    setError("");
    const fields = new FormData(event.currentTarget);
    const payload = JSON.stringify({ customer: { name: fields.get("name"), phone: fields.get("phone"), address: fields.get("address"), note: fields.get("note") }, items: cart.map(({ id, quantity }) => ({ id, quantity })) });
    if (attempt.current.payload !== payload) attempt.current = { payload, key: crypto.randomUUID() };
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.key }, body: payload });
      const result = await response.json();
      if (!response.ok || result.status !== "accepted" || !result.orderId) throw new Error(result.error ?? "Unable to confirm your order.");
      setOrderId(result.orderId);
      // Preserve anything added in another tab while this order was submitting.
      useCartStore.setState((state) => ({ cart: state.cart.flatMap((item) => {
        const ordered = cart.find((line) => line.id === item.id)?.quantity ?? 0;
        return item.quantity > ordered ? [{ ...item, quantity: item.quantity - ordered }] : [];
      }) }));
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Please try again."); }
    finally { pending.current = false; setBusy(false); }
  }

  if (orderId) return <div className="space-y-5 border border-zinc-800 p-8" role="status"><h2 className="font-serif text-2xl text-amber-300">Order received</h2><p>Reference: {orderId}</p><p className="text-sm text-zinc-400">Your order request has been accepted. Delivery and payment arrangements will be confirmed by the store. No online payment has been taken.</p><Link href="/shop" className="inline-block py-3 text-amber-300">Continue shopping</Link></div>;
  if (cart.length === 0) return <div className="space-y-5"><p>Your bag is empty.</p><Link href="/new-arrivals" className="text-amber-300">Explore new arrivals</Link></div>;

  const inputClass = "mt-2 min-h-12 w-full border border-zinc-700 bg-[#121212] px-4 py-3 text-white";
  return <div className="grid gap-8 lg:grid-cols-2">
    <form onSubmit={submit} className="space-y-5">
      <h2 className="font-serif text-2xl">Delivery details</h2>
      <fieldset disabled={busy} className="space-y-5">
        <label className="block text-sm">Full name<input name="name" autoComplete="name" required minLength={2} maxLength={100} className={inputClass} /></label>
        <label className="block text-sm">Phone number<input name="phone" type="tel" autoComplete="tel" required minLength={8} maxLength={25} className={inputClass} /></label>
        <label className="block text-sm">Delivery address<textarea name="address" autoComplete="street-address" required minLength={10} maxLength={500} rows={3} className={inputClass} /></label>
        <label className="block text-sm">Size, colour or delivery note (optional)<textarea name="note" maxLength={500} rows={2} className={inputClass} /></label>
      </fieldset>
      {!enabled && <p role="status" className="border border-amber-300/30 p-4 text-sm text-amber-200">Online order confirmation is not available yet. Your bag is saved; please return once the store enables checkout.</p>}
      {invalid && <p role="alert" className="text-amber-200">A bag item is unavailable or has an invalid quantity. Please update your bag.</p>}
      {error && <p role="alert" className="text-red-300">{error}</p>}
      <button disabled={!enabled || busy || invalid} className="min-h-12 w-full bg-amber-300 px-6 py-3 text-sm tracking-widest text-black disabled:cursor-not-allowed disabled:opacity-40">{busy ? "SUBMITTING…" : "CONFIRM ORDER REQUEST"}</button>
    </form>
    <aside className="h-fit space-y-5 border border-zinc-800 p-6">
      <h2 className="font-serif text-2xl">Order summary</h2>
      <ul className="divide-y divide-zinc-800">{lines.map((line) => <li key={line.id} className="flex justify-between gap-4 py-4 text-sm"><Link href={`/product/${line.id}`} className="hover:text-amber-300">{line.product?.title ?? line.name} × {line.quantity}</Link><span className="shrink-0 text-amber-300">{formatBDT((line.product?.price ?? 0) * line.quantity)}</span></li>)}</ul>
      <p className="flex justify-between font-serif text-xl"><span>Product subtotal</span><span>{formatBDT(subtotal)}</span></p>
      <p className="text-xs leading-5 text-zinc-400">Delivery charges and payment arrangements are confirmed by the store before fulfillment. This form does not collect online payment.</p>
    </aside>
  </div>;
}
