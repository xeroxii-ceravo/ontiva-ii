import { products } from "@/data/products";
import { parseOrderInput } from "@/lib/order-input";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const endpoint = process.env.ORDER_SERVICE_URL;
  const token = process.env.ORDER_SERVICE_TOKEN;
  if (!endpoint || !token) return Response.json({ error: "Online order confirmation is not connected yet. Your bag has been kept." }, { status: 503 });
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[a-f0-9-]{36}$/i.test(key)) return Response.json({ error: "Invalid order reference." }, { status: 400 });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Expected JSON." }, { status: 415 });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 32768) return Response.json({ error: "Order is too large." }, { status: 413 });
  let order;
  try { order = parseOrderInput(JSON.parse(raw)); }
  catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Invalid order details." }, { status: 400 }); }
  const items = order.items.map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }));
  if (items.some((item) => !item.product)) return Response.json({ error: "A product is unavailable. Please review your bag." }, { status: 409 });
  const lines = items.map(({ id, quantity, product }) => ({ id, quantity, title: product!.title, unitPrice: product!.price }));
  const subtotal = lines.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  try {
    if (new URL(endpoint).protocol !== "https:") throw new Error("Order service requires HTTPS.");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, "Idempotency-Key": key },
      body: JSON.stringify({ customer: order.customer, items: lines, subtotal, currency: "BDT" }),
      cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Order service rejected the request.");
    const result = await response.json();
    // The service must persist the order before acknowledging acceptance.
    if (result.status !== "accepted" || typeof result.orderId !== "string" || !result.orderId.trim() || result.orderId.length > 100) throw new Error("Invalid order acknowledgment.");
    return Response.json({ orderId: result.orderId, status: "accepted", subtotal }, { status: 201 });
  } catch {
    return Response.json({ error: "We could not confirm your order. Your bag is saved; retry with the same details." }, { status: 502 });
  }
}
