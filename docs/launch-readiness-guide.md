# ONTIVA pre-launch implementation guide

## Delivery and current readiness

This is an implementation guide with TypeScript reference components in `src/components/launch/`. They are included in the project's TypeScript build but are intentionally not mounted. Existing storefront behavior, curated records, the white navbar logo, and the stack are preserved. No packages were added.

The current storefront is **not transaction-ready**: `src/app/checkout/page.tsx` is explicitly a placeholder. UI polish and a passing build do not establish working payments, inventory validation, or fulfillment.

### Findings from the local source

- `Navbar.tsx` already derives counters from the persisted Zustand stores. Do not hard-code the visible 0/1 counters or create separate counter state.
- `WishlistDrawer.tsx` exists, but `layout.tsx` mounts only `CartDrawer`. Header wishlist clicks therefore cannot display the existing drawer.
- Existing cart and wishlist panels return null before exit animations can run, and lack native modal focus containment and Escape handling.
- The cart uses product ID alone as its line identity. Two sizes of the same product would merge. Quantity changes have no authoritative stock validation.
- `bags.ts` and `partyHills.ts` contain filename/title/price records, not stable product IDs, variants, inventory, or verified image-angle relationships. The six-record `products.ts` cannot resolve those curated records in wishlist or product routes.
- Shipping messaging conflicts: Navbar/cart use 150; Hero says $150; the proposed policy is Tk 10,000. Cart also renders the literal `{formatBDT(freeShippingMissing)}` inside its message.
- MobileMenu is a narrow panel with no modal semantics; its link anchors include `#collections` and `#about`, which must be checked against real page sections. Bags and Party Hills have usable `#bags` and `#party-hills` IDs.
- Bags currently displays `bagProducts.slice(0, 15)`. Preserve current curated ordering and all underlying records; do not silently truncate the canonical catalog to the visible slice.
- `products.ts` still has mismatched jewelry/watch descriptions for footwear and bags, and a `/products/shoes/IMG_0763.JPEG` reference that should be checked against the actual compound-extension filename. Correct these before adding quick-view copy.

## 1. Shared drawer foundation

Use `LuxuryDrawer.tsx` for every panel. It uses native `<dialog>.showModal()` for modal focus containment and background inertness, supports Escape, restores browser focus on close, locks document scrolling while open, integrates with Lenis using `data-lenis-prevent`, and animates its panel with Framer Motion. Reduced-motion users receive immediate transitions. Close buttons are at least 44px.

```tsx
<LuxuryDrawer open={open} onClose={close} title="Your Bag">
  {/* Existing item controls and totals */}
</LuxuryDrawer>
```

Always keep the component mounted and change `open`; do not wrap it in `open && ...`, which prevents its exit animation. Keep the selected product available until the quick-view exit completes if you want its contents to remain visible during that exit. Mount at the layout level outside transformed card containers.

Coordinate overlays: close quick view/mobile before opening cart or wishlist. Prefer explicit `open`/`close` actions to toggles; closing twice must not reopen a panel. `CommerceDrawers` gives wishlist priority if both existing store flags are true; when wiring header buttons, explicitly close the other store's panel first.

## 2. Quick view and catalog contract

`QuickView.tsx` includes a cover image, optional thumbnail gallery, required variant radios, sold-out states, quantity limits, asynchronous add-to-cart feedback, and an accessible status message. Each product change remounts its details to reset selection. It receives an `onAdd` callback so purchasing rules stay outside presentation.

```tsx
const [selected, setSelected] = useState<QuickViewProduct | null>(null);

<button type="button" onClick={() => setSelected(product)}
  aria-label={`Quick view ${product.title}`}
  className="relative block aspect-[3/4] w-full overflow-hidden">
  {/* Keep Image fill, object-cover object-center and the gold GlowWrapper. */}
</button>

<QuickView product={selected} onClose={() => setSelected(null)} onAdd={addSelection} />
```

Import `useState` from React and `QuickView, { type QuickViewProduct }` from the reference component in a client component. Keep heart/cart buttons as siblings of the image trigger, never nested inside its button or link. Preserve a separate product-details link for shareable URLs and navigation without JavaScript. Use one page-level quick view rather than one dialog per card.

`QuickViewProduct` requires:

- A permanent numeric product ID, retaining existing IDs 1-6.
- Exact image URLs and descriptive alt text. Show multi-angle thumbnails only when they are confirmed views of the same SKU. Different handbags or colour collages are not alternative angles.
- Variants with permanent SKU, label, numeric price and real stock. Use a real one-size SKU for bags only when accurate. Do not fabricate shoe sizes, stock, authenticity or material claims.

### Required cart migration before variant checkout

The current `addItem({ id, name, price, image }, quantity)` merges on `id`. Do not connect variants by passing only the parent product ID. Extend CartItem with `productId`, `sku`, `variantLabel`, and a stable line key; use that line key in add/remove/update and React keys. Preserve numeric IDs for product/wishlist navigation. Persist a versioned migration so existing `cart-storage` records are retained; ambiguous legacy lines should require selection rather than inventing a size.

The `onAdd` callback must validate stock and price against a server-owned catalog and return a rejected promise when unavailable. QuickView handles rejection. Client stock limits are presentation safeguards, not purchasing authority. Checkout must repeat validation and ignore client-submitted prices. Do not use randomly generated or array-index IDs.

For reference, the complete callback signature already type-checks in the supplied component:

```ts
onAdd: (
  product: QuickViewProduct,
  variant: PurchaseVariant,
  quantity: number,
) => Promise<void>;
```

## 3. Cart and wishlist integration

`CommerceDrawers.tsx` is compatible with the current simple-product stores. It provides remove/quantity controls, reactive totals, formatted shipping remaining, a disabled-by-absence checkout action for empty carts, and saved-piece removal/detail navigation. It keeps unknown saved IDs visible and removable instead of silently losing saved items.

Once the canonical catalog includes all curated pieces, replace the existing layout CartDrawer mount with:

```tsx
<CommerceDrawers catalog={catalog} shippingThreshold={10000} />
```

`catalog` must be the complete `readonly Product[]`, not `products.slice(...)`. Do not mount the old CartDrawer or WishlistDrawer alongside this replacement. Mount after StoreHydration, retaining the existing hydration flow. The numeric threshold above is the proposed policy and should be supplied from shared store policy after business confirmation.

Header handler pattern (inside Navbar):

```tsx
const openCart = () => {
  useWishlistDrawerStore.getState().closeWishlistDrawer();
  useCartStore.setState({ cartOpen: true });
};
const openWishlist = () => {
  useCartStore.setState({ cartOpen: false });
  useWishlistDrawerStore.getState().openWishlistDrawer();
};
```

Keep the existing `wishlist.length` and cart quantity-sum selectors for badges. Add `aria-haspopup="dialog"` and an accurate `aria-expanded` to each trigger. For saved products with variants, use quick view to choose a size before adding; the reference wishlist links to details rather than making a blind variant choice.

After the SKU migration, update CommerceDrawers to use line keys and display variant labels. Test two different sizes of the same product as separate lines. Aggregate quantity by SKU and validate limits when increasing quantities or re-adding an existing line.

## 4. Announcement and trust messaging

`Editorial.tsx` exports `AnnouncementBar` and `TrustStrip`. The announcement animates gold-text opacity once, avoiding a continuously moving marquee. All motion respects reduced-motion preferences. Links remain readable, wrap on small screens, and are keyboard accessible.

```tsx
<AnnouncementBar
  message="Complimentary Express Shipping on Orders Over Tk 10,000 — Dhaka & Nationwide"
  href="/shipping"
/>
```

Mount the announcement directly before Navbar inside SmoothScroll. Remove the old embedded navbar announcement to avoid duplication. The component is sticky; do not put it inside a short wrapper that limits its sticky area. Its variable wrapping height avoids text clipping. To overlay a transparent navbar on the hero, place the navbar in an explicitly positioned hero/header wrapper; use `bg-black/30 backdrop-blur-md` and preserve text contrast. Avoid negative-margin guesses against the current in-flow navbar.

Create and publish the linked shipping policy before enabling this message. Decide whether 'over' means strictly greater than Tk 10,000 or Tk 10,000 and above; the reference cart uses >=. Use matching wording and the same shared constant everywhere: navbar, cart, Hero service strip and checkout. Confirm that express shipping is actually available in every advertised region.

TrustStrip takes three real policy/support links:

```tsx
<TrustStrip items={[
  { title: "Authenticated Craftsmanship", detail: "Discover our sourcing standards.", href: "/craftsmanship" },
  { title: "Secure Encrypted Checkout", detail: "Learn how payment is protected.", href: "/payment-security" },
  { title: "Private Concierge Support", detail: "Speak with our client care team.", href: "/concierge" },
]} />
```

These URLs and claims are an integration example, not existing pages or verified services. Publish truthful supporting content and enable each claim only when the service exists. In particular, do not advertise secure checkout while checkout is a placeholder, and do not imply authentication of branded pieces without a substantiated sourcing process.

Place the strip below Hero, replacing its current four-feature strip to avoid duplicate/conflicting promises. Preserve the hero imagery and curated products. Thin zinc dividers, modest serif headings and hover/focus colour changes supply the micro-interaction without competing with products.

## 5. Full-screen mobile navigation

Replace the narrow MobileMenu with `FullscreenMobileMenu` from `Editorial.tsx`. Keep it mounted to preserve exit transitions. Use real category anchors:

```tsx
<FullscreenMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={[
  { label: "Shop All", href: "/shop" },
  { label: "Bags", href: "/#bags" },
  { label: "Party Hills", href: "/#party-hills" },
  { label: "Meet the Founder", href: "/founder" },
]} />
```

The native modal supplies full viewport coverage, Escape/focus handling and scrolling. Links enter with a 60ms stagger, removed under reduced motion. Close the menu on route changes and when crossing the desktop breakpoint; the dialog is in the browser top layer, so hiding only the hamburger will not dismiss an open menu. Coordinate it with quick view, wishlist and cart to prevent stacked dialogs.

Use these existing visual conventions for every catalog grid:

```tsx
<div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
```

Product images: `relative aspect-[3/4] overflow-hidden bg-[#121212]`; Image: `object-cover object-center transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none`; border: `border border-zinc-800`; title: `font-serif`; price: `text-amber-300` with `formatBDT(price)`. Match Image sizes to two mobile columns: `(max-width: 1023px) 50vw, 25vw`.

## Launch gate and verification

1. Finish real checkout/order creation, payment success/failure handling, and authoritative stock/price validation. The current placeholder blocks transactional launch.
2. Establish the full stable-ID catalog, variant/angle mappings, stock and accurate descriptions. Preserve every curated record and persisted cart/wishlist entry.
3. Integrate the shared drawer, canonical catalog, header handlers and variant-aware cart migration together; then enable quick view.
4. Confirm shipping and service promises; publish their linked pages; mount announcement/trust/mobile components.
5. Run `npm.cmd run build` and `npx.cmd eslint src/components/launch` on Windows (use `npm run build` elsewhere).
6. Exercise keyboard-only opening, Tab/Shift+Tab containment, Escape, focus return, backdrop close, and scroll restoration after animation. Repeat with reduced motion and on mobile Safari.
7. Verify add/remove/quantity changes, empty cart, saved unavailable items, refresh persistence, separate sizes, out-of-stock selections, failed adds, totals, and shipping boundaries 9,999/10,000/10,001. Test migration with real existing cart-storage data.
8. Confirm no overlapping dialogs, all CTAs resolve, category anchors work, full mobile menu closes after selection/desktop resize, and two/four-column grids work at 320/390/768/1440px.

Build validation of the reference components establishes TypeScript compatibility. It does not establish browser accessibility, payment safety, production inventory correctness or conversion uplift. Measure quick_view_open, variant_selected, add_to_cart_success, wishlist_add and checkout_start only after consent and analytics rules are defined; do not report assumed conversion gains.
