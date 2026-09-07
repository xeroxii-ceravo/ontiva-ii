import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function Shop() {
  return (
    <>
      <h1 className="px-6 py-10 text-3xl font-playfairDisplay text-luxury-gold">Shop Collection</h1>
      <ProductGrid />
    </>
  );
}

