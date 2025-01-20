import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        });
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      removeSingleFromCart: (id) => {
        set((state) => {
          const updatedCart = state.cart.filter((item) => {
            if (item.id === id) {
              if (item.quantity > 1) {
                item.quantity -= 1;
                return true;
              }
              return false;
            }
            return true;
          });

          return { cart: updatedCart };
        });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart",
    }
  )
);

export default useCartStore;
