import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: { name: "сортировка по:", property: "rating1" },
  search: "",
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

export const { setSort, setSearch, setCategoryId } = filterSlice.actions;

export default filterSlice.reducer;
