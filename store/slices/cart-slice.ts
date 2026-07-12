import type { CartItem } from "@/types/marketplace";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  couponCode: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ productId: string; variantId?: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.variantId === action.payload.variantId
          )
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId?: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    applyCoupon: (state, action: PayloadAction<string>) => {
      state.couponCode = action.payload;
    },
    removeCoupon: (state) => {
      state.couponCode = null;
    },
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
