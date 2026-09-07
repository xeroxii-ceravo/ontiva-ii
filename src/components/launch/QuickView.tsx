"use client";

import { useState } from "react";
import Image from "next/image";
import LuxuryDrawer from "./LuxuryDrawer";
import { formatBDT } from "@/lib/currency";

export interface PurchaseVariant {
  sku: string;
  label: string;
  price: number;
  stock: number;
}

export interface QuickViewProduct {
  id: number;
  title: string;
  images: readonly { src: string; alt: string }[];
  variants: readonly PurchaseVariant[];
}

interface QuickViewProps {
  product: QuickViewProduct | null;
  onClose: () => void;
  onAdd: (product: QuickViewProduct, variant: PurchaseVariant, quantity: number) => Promise<void>;
}

export default function QuickView({ product, onClose, onAdd }: QuickViewProps) {
  return (
    <LuxuryDrawer open={product !== null} title={product?.title ?? "Quick view"} onClose={onClose}>
      {product && <ProductDetails key={product.id} product={product} onAdd={onAdd} />}
    </LuxuryDrawer>
  );
}

function ProductDetails({ product, onAdd }: { product: QuickViewProduct; onAdd: QuickViewProps["onAdd"] }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [sku, setSku] = useState(product.variants.length === 1 ? product.variants[0].sku : "");
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const variant = product.variants.find((item) => item.sku === sku);
  const image = product.images[imageIndex];

  return (
    <form onSubmit={async (event) => {
      event.preventDefault();
      if (!variant || quantity < 1 || quantity > variant.stock || busy) return;
      setBusy(true);
      setMessage("");
      try {
        await onAdd(product, variant, quantity);
        setMessage(`${quantity} added to your bag.`);
      } catch {
        setMessage("Unable to add this selection. Check availability and try again.");
      } finally { setBusy(false); }
    }} className="space-y-5">
      {image && <div className="relative aspect-[3/4] overflow-hidden bg-[#121212]"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 464px" className="object-cover object-center" /></div>}
      {product.images.length > 1 && <div className="flex gap-2 overflow-x-auto" aria-label="Product images">
        {product.images.map((item, index) => <button key={item.src} type="button" onClick={() => setImageIndex(index)} aria-label={`View ${item.alt}`} aria-pressed={index === imageIndex} className={`relative size-16 shrink-0 overflow-hidden border ${index === imageIndex ? "border-amber-300" : "border-zinc-800"}`}><Image src={item.src} alt="" fill sizes="64px" className="object-cover" /></button>)}
      </div>}
      <fieldset className="space-y-3">
        <legend className="mb-2 font-serif text-lg">Select size / style</legend>
        {product.variants.map((item) => <label key={item.sku} className="flex min-h-11 items-center gap-3 border border-zinc-800 p-3 text-sm">
          <input type="radio" name="variant" value={item.sku} checked={sku === item.sku} disabled={item.stock < 1 || busy} onChange={() => { setSku(item.sku); setQuantity(1); setMessage(""); }} className="accent-amber-300" required />
          {item.label}{item.stock < 1 ? " — Sold out" : ""}
          <span className="ml-auto text-amber-300">{formatBDT(item.price)}</span>
        </label>)}
      </fieldset>
      <label className="flex items-center justify-between gap-3 text-sm">Quantity
        <input type="number" min={1} max={variant?.stock ?? 1} step={1} required value={quantity} disabled={!variant || variant.stock < 1 || busy} onChange={(event) => setQuantity(event.target.valueAsNumber || 1)} className="min-h-11 w-20 border border-zinc-700 bg-zinc-900 px-3" />
      </label>
      <button type="submit" disabled={!variant || variant.stock < quantity || busy} className="min-h-12 w-full bg-amber-300 px-5 py-3 text-xs tracking-widest text-black transition-colors hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40">{busy ? "ADDING…" : "ADD TO BAG"}</button>
      <p role="status" className="min-h-5 text-sm text-zinc-300">{message}</p>
    </form>
  );
}
