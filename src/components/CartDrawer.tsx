"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, X, CheckCircle, Truck } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, cartOpen, toggleCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  if (!cartOpen) {
    return null; // Do not render if cart is closed
  }

  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = getTotal();
  const freeShippingMissing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
      {/* Cart Drawer */}
      <div className="w-full max-w-xs p-6 bg-luxury-dark text-white border-t border-luxury-lighter/20 transform translate-x-0 transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-playfairDisplay">Shopping Cart</h2>
          <button onClick={toggleCart} className="hover:text-luxury-gold transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="text-luxury-lighter/60 text-center py-8">
            Your cart is empty.
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col mb-6 last:mb-0">
                {/* Item Details */}
                <div className="flex items-start mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-playfairDisplay text-lg mb-1 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-luxury-lighter/60 mb-2 line-clamp-3">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-luxury-lighter/20 border border-luxury-lighter/30 hover:bg-luxury-gold/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-luxury-lighter/20 border border-luxury-lighter/30 hover:bg-luxury-gold/10 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="self-end text-luxury-lighter/50 hover:text-luxury-gold transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-luxury-lighter/20"></div>

        {/* Subtotal */}
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-xl font-playfairDisplay">Subtotal</span>
          <span className="text-xl font-playfairDisplay text-luxury-gold">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="mb-6">
            <p className="text-luxury-lighter/60 mb-2">
              Free shipping on orders over $${FREE_SHIPPING_THRESHOLD.toFixed(2)}
            </p>
            <div className="w-full bg-luxury-lighter/20 rounded-full h-2.5">
              <div
                className="bg-luxury-gold h-2.5 rounded-full"
                style={{ width: `${(subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-luxury-lighter/50 mt-1">
              {freeShippingMissing > 0
                ? `Add $${freeShippingMissing.toFixed(2)} more to get free shipping`
                : "Free shipping unlocked!"}
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <Link
          href="/checkout"
          className="w-full flex items-center justify-center px-6 py-3 bg-luxury-gold text-luxury-dark font-medium hover:bg-luxury-gold/90 transition-colors disabled:opacity-50"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout ({getItemCount()} items)
        </Link>
      </div>
    </div>
  );
}

