import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { newArrivals } from "@/data/products";

export const metadata: Metadata = { title: "New Arrivals | ONTIVA" };

export default function NewArrivalsPage() {
  return <>
    <h1 className="mx-auto max-w-7xl px-6 pt-12 font-serif text-3xl text-white sm:px-10 lg:px-12">New Arrivals</h1>
    <ProductGrid id="new-arrivals-list" title="THE LATEST EDIT" subtitle="Discover every new arrival in the collection." items={newArrivals} />
  </>;
}
