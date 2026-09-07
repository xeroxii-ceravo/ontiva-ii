import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
export default async function Shop({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim();
  const items = products.filter((p) => (p.name + " " + p.description).toLowerCase().includes(query.toLowerCase()));
  return <><h1 className="mx-auto max-w-7xl px-6 pt-12 font-serif text-4xl sm:px-10 lg:px-12">The Collection</h1><ProductGrid title={query ? "SEARCH RESULTS" : "ALL PIECES"} subtitle={query ? `Results for “${query}”` : "Find the piece that feels like you."} items={items} /></>;
}
