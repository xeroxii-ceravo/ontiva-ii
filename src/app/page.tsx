import CategorySections from "@/components/CategorySections";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import InstagramGrid from "@/components/InstagramGrid";
import { products } from "@/data/products";
export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid
        id="new-arrivals"
        title="NEW ARRIVALS"
        subtitle="Discover your next signature piece."
        items={products.filter(product => product.price === 4200).slice(0, 15)}
      />
      <CategorySections />
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <FadeIn>
        <InstagramGrid />
      </FadeIn>
    </>
  );
}
