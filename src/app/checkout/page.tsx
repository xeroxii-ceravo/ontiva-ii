import CheckoutForm from "@/components/CheckoutForm";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const enabled = Boolean(process.env.ORDER_SERVICE_URL && process.env.ORDER_SERVICE_TOKEN);
  return <section className="mx-auto min-h-screen max-w-6xl px-6 py-12 sm:px-10">
    <h1 className="mb-10 font-serif text-3xl text-white">Checkout</h1>
    <CheckoutForm enabled={enabled} />
  </section>;
}
