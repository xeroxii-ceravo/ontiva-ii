import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "The craftsmanship is impeccable. Every piece feels like a work of art.",
      rating: 5,
      name: "Elena Richardson",
      location: "New York, NY"
    },
    {
      id: 2,
      quote: "I've never felt more luxurious. The attention to detail is breathtaking.",
      rating: 5,
      name: "Sophie Laurent",
      location: "Paris, FR"
    },
    {
      id: 3,
      quote: "ONTIVA has redefined my everyday elegance. I receive compliments constantly.",
      rating: 5,
      name: "Aisha Malik",
      location: "London, UK"
    },
    {
      id: 4,
      quote: "The quality is unmatched. These are heirloom pieces I'll cherish forever.",
      rating: 5,
      name: "Charlotte Dubois",
      location: "Geneva, CH"
    }
  ];

  return (
    <section id="testimonials" className="border-t border-zinc-800 bg-black py-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <h2 className="mb-12 text-4xl font-serif text-center tracking-wide text-white">
          What Our Clients Say
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col items-start gap-6 p-8 border border-zinc-900 rounded-lg hover:border-zinc-800 transition-colors">
              <p className="max-w-sm text-sm leading-7 text-zinc-400 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    strokeWidth={1.2}
                    className={star <= t.rating ? "text-luxury-gold" : "text-zinc-600"}
                  />
                ))}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-serif text-sm text-white">{t.name}</p>
                <p className="text-[10px] text-zinc-400">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}