"use client";

import Link from "next/link";
import { X } from "lucide-react";

const links = [
  ["HOME", "/"],
  ["SHOP", "/shop"],
  ["COLLECTIONS", "/#collections"],
  ["ABOUT", "/#about"],
  ["CONTACT", "/#contact"],
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex lg:hidden">
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      {/* Menu Drawer */}
      <div
        className="relative flex-1 lg:hidden max-w-xs w-full bg-luxury-dark border-r border-zinc-800 px-6 pb-pt overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-playfairDisplay text-luxury-gold">Menu</h2>
          <button aria-label="Close menu" onClick={onClose} className="hover:text-luxury-gold transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Navigation Links */}
        <nav className="space-y-6">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="block text-xs tracking-widest font-medium text-zinc-300 hover:text-luxury-gold transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}