import { create } from "zustand";
import type { IEcommerceStore, IProduct, ICartProduct } from "../types/product";
import { devtools, persist } from "zustand/middleware";

/* local starage fallback */
// const CART_STORAGE_KEY = "ecommerce-cart";

// function loadCartFromStorage(): ICartProduct[] {
//   try {
//     const storedCart = localStorage.getItem(CART_STORAGE_KEY);
//     return storedCart ? JSON.parse(storedCart) : [];
//   } catch {
//     return [];
//   }
// }

// function saveCartToStorage(cart: ICartProduct[]) {
//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
//   } catch {
//     throw new Error("Failed to save cart");
//   }
// }
/* local starage fallback */

/* zustand */
const useEcommerceStore = create<IEcommerceStore>()(
  persist(
    devtools((set) => ({
      // cartProducts: loadCartFromStorage(),
      cartProducts: [],

      setCartProducts: (cartProducts) => {
        // saveCartToStorage(cartProducts);
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

          // saveCartToStorage(updatedCart);

          return { cartProducts: updatedCart };
        }),

      increaseCartProduct: (id) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((curr) =>
            curr.id === id ? { ...curr, quantity: curr.quantity + 1 } : curr,
          );

          // saveCartToStorage(updatedCart);

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

          // saveCartToStorage(updatedCart);

          return { cartProducts: updatedCart };
        }),

      updateCartProduct: (product: ICartProduct) =>
        set((state) => {
          const updatedCart = state.cartProducts.map((curr) =>
            curr.id === product.id ? product : curr,
          );

          // saveCartToStorage(updatedCart);

          return { cartProducts: updatedCart };
        }),

      deleteCartProduct: (id) =>
        set((state) => {
          const updatedCart = state.cartProducts.filter((curr) => curr.id !== id);

          // saveCartToStorage(updatedCart);

          return { cartProducts: updatedCart };
        }),
    })),
    {
      name: "ecommerce-cart",

      partialize: (state) => ({ cartProducts: state.cartProducts }),
    },
  ),
);
/* zustand */

export default useEcommerceStore;
