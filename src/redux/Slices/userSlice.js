import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  email: "",
  password: "",
  id: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth(state, action) {
      state.auth = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { isAuth, setEmail, setPassword, setId } = userSlice.actions;

export default userSlice.reducer;
