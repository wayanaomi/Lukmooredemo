"use client";

import cartReducer from "@/store/slices/cart-slice";
import compareReducer from "@/store/slices/compare-slice";
import uiReducer from "@/store/slices/ui-slice";
import wishlistReducer from "@/store/slices/wishlist-slice";
import { configureStore } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "lukmoore.cart";
const WISHLIST_STORAGE_KEY = "lukmoore.wishlist";

function loadState<T>(key: string): T | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : undefined;
  } catch {
    return undefined;
  }
}

export function makeStore() {
  const preloadedCart = loadState<{ items: unknown[] }>(CART_STORAGE_KEY);
  const preloadedWishlist = loadState<{ productIds: unknown[] }>(
    WISHLIST_STORAGE_KEY
  );

  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      compare: compareReducer,
      ui: uiReducer,
    },
    preloadedState: {
      ...(preloadedCart ? { cart: { ...preloadedCart, isOpen: false, couponCode: null } } : {}),
      ...(preloadedWishlist ? { wishlist: preloadedWishlist } : {}),
    } as never,
  });

  if (typeof window !== "undefined") {
    store.subscribe(() => {
      const state = store.getState();
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ items: state.cart.items })
      );
      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify({ productIds: state.wishlist.productIds })
      );
    });
  }

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
