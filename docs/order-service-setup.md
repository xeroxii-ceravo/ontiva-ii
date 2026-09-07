# Order confirmation connection

The storefront now has `/new-arrivals`, shared catalog/cart actions and a checkout form. Real order acceptance remains disabled until an order service is configured.

Set these **server-only** environment variables in Vercel and locally, then redeploy:

- `ORDER_SERVICE_URL`: HTTPS endpoint of your durable order API.
- `ORDER_SERVICE_TOKEN`: bearer credential for that API. Never use a NEXT_PUBLIC variable.

`POST /api/orders` validates same-origin requests, customer details, unique product IDs and integer quantities 1-99. It ignores client product prices and computes line prices/subtotal from the canonical server catalog. Unknown products fail. It forwards:

```json
{
  "customer": { "name": "...", "phone": "...", "address": "...", "note": "..." },
  "items": [{ "id": 1, "quantity": 1, "title": "...", "unitPrice": 4200 }],
  "subtotal": 4200,
  "currency": "BDT"
}
```

Your service must authenticate the bearer token, apply abuse/rate limits, validate inventory, durably save the order, and deduplicate by `Idempotency-Key` before returning:

```json
{ "status": "accepted", "orderId": "YOUR-PERSISTED-ORDER-REFERENCE" }
```

On a repeat key with identical contents return the original receipt. Reject reuse with changed contents. Never return accepted before durable storage succeeds. Restrict access to customer data and define retention. Do not log personal details or authorization headers. A static/mock webhook response is not a production order service.

The checkout currently submits an order request, not a paid transaction. Delivery charges and payment arrangements are explicitly marked for store confirmation. Set the actual delivery/payment policy and integrate it before claiming an immediately paid or fulfillment-confirmed order. No payment information is collected by this form.

When no service is configured, `/api/orders` returns 503 and checkout clearly states confirmation is unavailable. Failed submissions keep the customer's cart. Successful submissions remove only the submitted quantities. Retries in the same mounted checkout reuse the idempotency key for unchanged data. The service must also handle duplicates across refreshed/new checkout sessions according to its own order policy.

Verification performed: production build, changed-file ESLint, `node scripts/verify-commerce.cjs`, and production HTTP checks for homepage/listing/detail routes and safe API failures. No real customer order was sent; no live payment or durable backend acceptance was tested.
