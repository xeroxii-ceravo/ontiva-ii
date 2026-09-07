import Link from "next/link";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="border-b border-luxury-lighter/20 bg-luxury-dark/50 backdrop-blur-sm">
      {/* Announcement Bar */}
      <div className="bg-luxury-gold/10 px-6 py-2 text-xs text-luxury-gold/80">
        FREE SHIPPING ON ORDERS OVER $150
      </div>

      {/* Main Navbar */}
      <nav className="px-6 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <span className="text-2xl font-playfairDisplay text-luxury-gold">ONTIVA</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/" className="hover:text-luxury-gold transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-luxury-gold transition-colors">
            Shop
          </Link>
          <Link href="/collections" className="hover:text-luxury-gold transition-colors">
            Collections
          </Link>
          <Link href="/about" className="hover:text-luxury-gold transition-colors">
            About
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-luxury-gold transition-colors p-1 rounded"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" className="hover:text-luxury-gold transition-colors p-1 rounded">
            <Heart className="h-5 w-5" />
          </Link>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative hover:text-luxury-gold transition-colors p-1 rounded"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* Cart Badge */}
            <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center bg-luxury-gold text-xs font-medium text-luxury-dark">
              3
            </div>
          </button>
        </div>
      </nav>

      {/* Search Mobile/Dropdown */}
      {isSearchOpen && (
        <div className="md:hidden px-6 py-4 border-t border-luxury-lighter/20">
          <input
            type="text"
            placeholder="Search luxury accessories..."
            className="w-full bg-luxury-lighter/20 border border-luxury-lighter/30 rounded px-4 py-2 text-white placeholder-luxury-lighter/50 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          />
        </div>
      )}
    </div>
  );
}

