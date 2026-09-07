import CategorySections from "@/components/CategorySections";
import FadeIn from "@/components/FadeIn";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import InstagramGrid from "@/components/InstagramGrid";
import { newArrivals } from "@/data/products";
export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid
        id="new-arrivals"
        title="NEW ARRIVALS"
        subtitle="Discover your next signature piece."
        items={newArrivals.slice(0, 4)}
        viewAllHref="/new-arrivals"
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
