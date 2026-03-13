import { create } from "zustand";
import type { IEcommerceStore, ICartProduct } from "../types/product";
import { devtools, persist } from "zustand/middleware";

const useEcommerceStore = create<IEcommerceStore>()(
  persist(
    devtools(
      (set) => ({
        cartProducts: [],

        setCartProducts: (cartProducts) => {
          set({ cartProducts });
        },

        addCartProduct: (product) =>
          set((state) => {
            const existingProduct = state.cartProducts.find((curr) => curr.id === product.id);

            let updatedCart: ICartProduct[];

            if (existingProduct) {
              updatedCart = state.cartProducts.map((curr) =>
                curr.id === product.id ? { ...curr, quantity: curr.quantity + 1 } : curr,
              );
            } else {
              updatedCart = [...state.cartProducts, { ...product, quantity: 1 }];
            }

            return { cartProducts: updatedCart };
          }),

        increaseCartProduct: (id) =>
          set((state) => {
            const updatedCart = state.cartProducts.map((curr) =>
              curr.id === id ? { ...curr, quantity: curr.quantity + 1 } : curr,
            );

            return { cartProducts: updatedCart };
          }),

        decreaseCartProduct: (id) =>
          set((state) => {
            const target = state.cartProducts.find((curr) => curr.id === id);

            if (!target) return state;

            let updatedCart;

            if (target.quantity === 1) {
              updatedCart = state.cartProducts.filter((curr) => curr.id !== id);
            } else {
              updatedCart = state.cartProducts.map((curr) =>
                curr.id === id ? { ...curr, quantity: curr.quantity - 1 } : curr,
              );
            }

            return { cartProducts: updatedCart };
          }),

        updateCartProduct: (product: ICartProduct) =>
          set((state) => {
            const updatedCart = state.cartProducts.map((curr) =>
              curr.id === product.id ? product : curr,
            );

            return { cartProducts: updatedCart };
          }),

        deleteCartProduct: (id) =>
          set((state) => {
            const updatedCart = state.cartProducts.filter((curr) => curr.id !== id);

            return { cartProducts: updatedCart };
          }),
      }),
      {
        name: "ecommerce-store",
        enabled: true,
      },
    ),
    {
      name: "ecommerce-store",
      partialize: (state) => ({ cartProducts: state.cartProducts }),
    },
  ),
);

export default useEcommerceStore;
