import { configureStore } from "@reduxjs/toolkit";
import filter from "./Slices/filterSlice";
import cart from "./Slices/cartSlice";
import favorite from "./Slices/favoriteSlice";
import auth from "./Slices/userSlice";
export const store = configureStore({
  reducer: { filter, cart, favorite, auth },
});
