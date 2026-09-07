"use client";

import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, description, price, image }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Link href={`/product/${id}`} className="group block hover:shadow-lg transition-shadow duration-300">
      <article className="bg-luxury-lighter/5 border border-luxury-lighter/20 rounded-lg overflow-hidden flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Heart className="text-luxury-gold hover:text-luxury-lighter/80 transition-colors h-6 w-6" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="font-playfairDisplay text-lg mb-2 line-clamp-2">{name}</h3>
          <p className="text-luxury-lighter/60 flex-1 mb-4 line-clamp-3">{description}</p>
          <div className="mt-auto pt-4 border-t border-luxury-lighter/20">
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-playfairDisplay text-xl text-luxury-gold">${price.toFixed(2)}</span>
              <button
                onClick={() => setIsAdded(!isAdded)}
                className={`p-2 rounded hover:bg-luxury-gold/10 transition-colors ${
                  isAdded ? "bg-luxury-gold/20" : ""
                }`}
              >
                {isAdded ? (
                  <Plus className="text-luxury-gold" />
                ) : (
                  <span className="text-sm font-medium">Add</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

