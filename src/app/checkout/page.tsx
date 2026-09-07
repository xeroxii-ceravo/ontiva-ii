import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-luxury-dark flex items-center justify-center">
      <div className="text-center text-luxury-lighter/60">
        <h1 className="text-3xl font-playfairDisplay mb-6">Checkout</h1>
        <p className="mb-4">
          This is a placeholder for the checkout page.
          In a real application, you would integrate a payment gateway here.
        </p>
        <Link href="/" className="hover:text-luxury-gold transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

