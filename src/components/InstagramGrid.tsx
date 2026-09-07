export default function InstagramGrid() {
  const images = [
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&crop=entropy",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&crop=faces",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&gamma=2",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&blur=5",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&sharp=2",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&exposure=1",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&contrast=1.5",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=60&saturation=1.2"
  ];

  return (
    <section id="instagram" className="border-t border-zinc-800 bg-black py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <h2 className="mb-12 text-4xl font-serif text-center tracking-wide text-white">
          ONTIVA Moments
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              <img
                src={src}
                alt="Luxury accessory lifestyle"
                className="object-cover w-full h-full rounded-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}