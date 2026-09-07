"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function FounderPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#0a0a0a] flex flex-col"
    >
      {/* Container */}
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-12">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex items-center justify-center"
        >
<div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden border border-zinc-800">
              {/* Founder's portrait */}
              <Image
                src="/founder/founder.png"
                alt="Founder & Creative Director of ONTIVA"
                fill
                className="object-cover ring-8 ring-luxury-gold/20"
              />
              {/* Decorative element */}
              <div className="absolute inset-0 rounded-lg ring-2 ring-luxury-gold/30 animate-pulse"></div>
            </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h1 className="font-playfairDisplay text-5xl mb-6 text-luxury-gold">
            Founder & Visionary
          </h1>
          <p className="text-luxury-lighter/60 text-lg max-w-2xl mx-auto">
            The driving force behind ONTIVA's commitment to timeless elegance and emotional storytelling.
          </p>
        </motion.div>

        {/* Biography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="font-playfairDisplay text-3xl mb-6 text-luxury-gold">
            Biography
          </h2>
          <p className="text-luxury-lighter/60 text-lg leading-8 max-w-3xl">
            Born into a family of artisans, our founder cultivated a deep appreciation for craftsmanship from an early age. After years of studying traditional techniques and contemporary design, they embarked on a mission to create a brand that transcends mere accessories—each piece tells a story, evokes emotion, and becomes a cherished heirloom.
          </p>
          <p className="text-luxury-lighter/60 text-lg leading-8 mt-6 max-w-3xl">
            With a keen eye for detail and a passion for quality, they have curated ONTIVA's collections to reflect the perfect balance between heritage and modernity. Every material is sourced responsibly, and every design is meticulously crafted to ensure longevity and timeless appeal.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="font-playfairDisplay text-3xl mb-6 text-luxury-gold">
            Vision for ONTIVA
          </h2>
          <p className="text-luxury-lighter/60 text-lg leading-8 max-w-3xl">
            ONTIVA is more than a luxury brand—it's a movement towards mindful consumption and emotional connection. Our founder envisions a world where every accessory carries meaning, where luxury is defined not by price but by the stories we carry and the memories we create.
          </p>
          <p className="text-luxury-lighter/60 text-lg leading-8 mt-6 max-w-3xl">
            Through sustainable practices, ethical sourcing, and timeless design, ONTIVA aims to redefine luxury for the modern conscious consumer—where elegance meets purpose, and style meets substance.
          </p>
        </motion.div>

        {/* Commitment to Emotional Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="font-playfairDisplay text-3xl mb-6 text-luxury-gold">
            Commitment to Emotional Storytelling
          </h2>
          <p className="text-luxury-lighter/60 text-lg leading-8 max-w-3xl">
            At the heart of ONTIVA lies a profound belief: "Onti Ek khudartho Pothshisur Jonno Regular Ranna Kore Khabar niye Jeto 😭" — For the soulful journey, we cook regularly with tears of joy and dedication. This philosophy encapsulates our founder's commitment to infusing every piece with genuine emotion, transforming ordinary moments into extraordinary experiences.
          </p>
          <p className="text-luxury-lighter/60 text-lg leading-8 mt-6 max-w-3xl">
            Each collection is inspired by personal narratives, cultural heritage, and the universal human experience. When you wear ONTIVA, you're not just wearing an accessory—you're carrying a story, a sentiment, a piece of art that resonates with your own journey.
          </p>
        </motion.div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-luxury-lighter/60 text-lg">
            Discover the story behind every piece. Visit our collections to find your next heirloom.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-9 border border-luxury-gold px-8 py-4 text-xs tracking-[0.2em] text-luxury-gold transition-colors hover:bg-luxury-gold hover:text-black"
          >
            EXPLORE COLLECTIONS <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}