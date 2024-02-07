import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteds: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorited(state, action) {
      const findItem = state.favoriteds.findIndex(
        (obj) => obj.id === action.payload.id
      );
      if (findItem !== -1) {
        state.favoriteds.splice(findItem, 1);
      } else {
        state.favoriteds.push({ ...action.payload, favortedCount: 1 });
      }
    },
    deleteFavoriteds(state) {
      state.favoriteds = [];
    },
  },
});

export const { addFavorited, deleteFavoriteds } = favoriteSlice.actions;

export default favoriteSlice.reducer;
