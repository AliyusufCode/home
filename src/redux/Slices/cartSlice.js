import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
        state.totalPrice = state.items.reduce(
          (sum, item) => item.price * item.count + sum,
          0
        );
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.totalPrice = state.items.reduce(
          (sum, item) => item.price * item.count + sum,
          0
        );
      }
    },
    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
        state.totalPrice = state.items.reduce(
          (sum, item) => item.price * item.count + sum,
          0
        );
      }
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce(
          (sum, item) => item.price * item.count + sum,
          0
        );
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    deleteCart(state) {
      state.items = [];
      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
  },
});

export const { addItems, minusItem, plusItem, removeItem, deleteCart } =
  cartSlice.actions;

export default cartSlice.reducer;
