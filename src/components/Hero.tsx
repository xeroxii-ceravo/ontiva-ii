"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { ArrowRight, ArrowLeft, Pause, Play, Truck, Gem, RotateCcw, ShieldCheck } from "lucide-react";

const slides = [
  { filename: "ChatGPT Image Sep 7, 2026, 01_06_29 PM.png", label: "Timeless Opulence", alt: "Woman in sunglasses holding an ivory handbag from the window of a silver classic car" },
  { filename: "ChatGPT Image Sep 7, 2026, 01_09_30 PM.png", label: "Golden Reverie", alt: "Woman surrounded by flowing golden fabric in warm sunlight" },
  { filename: "ChatGPT Image Sep 7, 2026, 01_10_54 PM.png", label: "Understated Elegance", alt: "Chocolate brown handbag and pointed heels styled with ivory trousers" },
] as const;

const features = [
  { icon: Truck, title: "Free Shipping", detail: "On orders over $150" },
  { icon: Gem, title: "Premium Quality", detail: "Every detail considered" },
  { icon: RotateCcw, title: "Easy Returns", detail: "Shop with confidence" },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    detail: "Peace of mind, always",
  },
];
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const rotating = !paused && reduceMotion === false;
  const nextSlide = (active + 1) % slides.length;
  const nextSlideLoaded = loadedSlides.includes(nextSlide);

  useEffect(() => {
    if (!rotating || !nextSlideLoaded) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden) {
        timer = setTimeout(() => setActive(nextSlide), 6500);
      }
    };

    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [rotating, nextSlide, nextSlideLoaded]);

  const selectSlide = (index: number) => {
    setPaused(true);
    setActive((index + slides.length) % slides.length);
  };

  return (
    <>
      <section
        aria-labelledby="hero-title"
        aria-roledescription="carousel"
        onFocusCapture={(event) => {
          if (!(event.target instanceof Element) || !event.target.closest("[data-rotation-control]")) {
            setPaused(true);
          }
        }}
        className="relative isolate h-[100dvh] w-full overflow-hidden border-b border-zinc-800 bg-[#0a0a0a]"
      >
        {slides.map((slide, index) => (
          <motion.div
            key={slide.filename}
            aria-hidden={index !== active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
            initial={false}
            animate={{ opacity: index === active ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src={`/hero-section/${encodeURIComponent(slide.filename)}`}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? undefined : "eager"}
              sizes="100vw"
              onLoad={() => setLoadedSlides((loaded) => loaded.includes(index) ? loaded : [...loaded, index])}
              className="object-cover object-center"
            />
          </motion.div>
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-6 pt-6 sm:px-10 sm:pb-10 lg:px-12">
          <div className="max-w-2xl pb-6 sm:pb-10">
            <p className="mb-4 text-[10px] tracking-[0.3em] text-luxury-gold sm:text-xs">ONTIVA / THE ART OF REFINED LIVING</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                href="/shop" 
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-medium text-xs md:text-sm tracking-widest uppercase transition duration-300 flex items-center gap-2"
              >
                Shop The Edit
                <span className="text-lg">→</span>
              </Link>
              
              <Link 
                href="/new-arrivals" 
                className="px-6 py-3 border border-zinc-700 hover:border-amber-400 text-white font-medium text-xs md:text-sm tracking-widest uppercase transition duration-300 bg-black/40 backdrop-blur-sm"
              >
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/20 pt-3 sm:pt-5">
            <p aria-live={rotating ? "off" : "polite"} aria-atomic="true" className="text-[10px] uppercase tracking-[0.18em] text-zinc-200">
              <span className="mr-3 text-luxury-gold">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              {slides[active].label}
            </p>
            <div className="flex items-center gap-1 sm:gap-3" role="group" aria-label="Hero slide controls">
              <button
                type="button"
                data-rotation-control
                disabled={reduceMotion === true}
                onClick={() => setPaused((value) => !value)}
                aria-label={reduceMotion ? "Autoplay disabled by reduced-motion preference" : rotating ? "Pause hero slideshow" : "Play hero slideshow"}
                className="flex size-11 items-center justify-center text-luxury-gold transition-colors hover:text-white disabled:cursor-default disabled:opacity-40"
              >
                {rotating ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
              </button>
              <button type="button" onClick={() => selectSlide(active - 1)} aria-label="Previous hero slide" className="flex size-11 items-center justify-center text-white transition-colors hover:text-luxury-gold">
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              {slides.map((slide, index) => (
                <button key={slide.filename} type="button" onClick={() => selectSlide(index)} aria-label={`Show ${slide.label}`} aria-pressed={index === active} className="flex min-h-11 min-w-8 items-center justify-center px-1 sm:min-w-11">
                  <span aria-hidden="true" className={`h-px w-full transition-colors duration-300 ${index === active ? "bg-luxury-gold" : "bg-white/40"}`} />
                </button>
              ))}
              <button type="button" onClick={() => selectSlide(active + 1)} aria-label="Next hero slide" className="flex size-11 items-center justify-center text-white transition-colors hover:text-luxury-gold">
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-zinc-800 bg-[#0e0e0e]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-9 lg:grid-cols-4 lg:gap-0">
          {features.map(({ icon: Icon, title, detail }, index) => (
            <FadeIn
              delay={index * 0.08}
              key={title}
              className="flex items-center justify-center gap-4 lg:border-r lg:border-zinc-800 lg:last:border-0"
            >
              <Icon
                className="shrink-0 text-luxury-gold"
                size={25}
                strokeWidth={1.2}
              />
              <div>
                <p className="font-serif text-sm sm:text-base">{title}</p>
                <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs">
                  {detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </>
  );
}
