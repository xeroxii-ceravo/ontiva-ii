export interface OrderInput {
  customer: { name: string; phone: string; address: string; note: string };
  items: { id: number; quantity: number }[];
}

export function parseOrderInput(value: unknown): OrderInput {
  if (!value || typeof value !== "object") throw new Error("Invalid order.");
  const data = value as Record<string, unknown>;
  if (!data.customer || typeof data.customer !== "object") throw new Error("Enter delivery details.");
  const customer = data.customer as Record<string, unknown>;
  const field = (key: string, min: number, max: number) => {
    const text = typeof customer[key] === "string" ? customer[key].trim() : "";
    if (text.length < min || text.length > max) throw new Error(`Enter a valid ${key}.`);
    return text;
  };
  const name = field("name", 2, 100);
  const phone = field("phone", 8, 25);
  if (!/^\+?[\d\s()-]{8,25}$/.test(phone)) throw new Error("Enter a valid phone number.");
  const address = field("address", 10, 500);
  const note = field("note", 0, 500);
  if (!Array.isArray(data.items) || data.items.length < 1 || data.items.length > 100) throw new Error("Your bag must contain between 1 and 100 pieces.");
  const ids = new Set<number>();
  const items = data.items.map((value: unknown) => {
    if (!value || typeof value !== "object") throw new Error("Invalid bag item.");
    const item = value as Record<string, unknown>;
    if (typeof item.id !== "number" || !Number.isSafeInteger(item.id) || item.id < 1 || ids.has(item.id)) throw new Error("Invalid or duplicate product.");
    if (typeof item.quantity !== "number" || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) throw new Error("Quantity must be between 1 and 99.");
    ids.add(item.id);
    return { id: item.id, quantity: item.quantity };
  });
  return { customer: { name, phone, address, note }, items };
}
