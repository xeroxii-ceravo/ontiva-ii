import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  cartOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  // Calculate total price of items in cart
  getTotal: () => number;
  // Calculate total number of items in cart (sum of quantities)
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartOpen: false,
      addItem: (item, quantity = 1) => {
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            // If item already in cart, increase quantity by the given quantity
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
                  : i
              ),
            };
          } else {
            // If not in cart, add with the given quantity
            return {
              cart: [...state.cart, { ...item, quantity }],
            };
          }
        });
      },
      removeItem: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) return;
        set((state) => {
          if (quantity < 1) {
            // Remove the item
            return {
              cart: state.cart.filter((item) => item.id !== id),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      toggleCart: () => {
        set((state) => ({ cartOpen: !state.cartOpen }));
      },
      getTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getItemCount: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      skipHydration: true,
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

