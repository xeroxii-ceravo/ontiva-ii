export default function Hero() {
  return (
    <section className="relative bg-luxury-dark min-h-[80vh] flex items-center justify-center px-6 pt-20 pb-10">
      {/* Background Visual Placeholder */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10"></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="font-playfairDisplay text-5xl md:text-6xl mb-6 text-luxury-gold">
          Timeless Elegance<br />
          <span className="block text-luxury-lighter/80">Luxury Accessories Redefined</span>
        </h1>
        <p className="text-luxury-lighter/60 mb-8 max-w-lg mx-auto">
          Discover our curated collection of exquisite jewelry, watches, and leather goods crafted for those who appreciate the finer things in life.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/shop" className="flex items-center px-8 py-4 bg-luxury-gold text-luxury-dark font-medium hover:bg-luxury-gold/90 transition-colors duration-300">
            Explore Collection
            <span className="ml-2">&rarr;</span>
          </a>
          <a href="/shop" className="flex items-center px-8 py-4 border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 transition-colors duration-300">
            Shop Now
            <span className="ml-2">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
