import { createSlice } from "@reduxjs/toolkit";

import { auth } from "../components/firebase";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    data: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setData: (state, action) => {
      state.data = action.payload;
      // console.log(state.data);
    },
  },
});

export const { login, logout, setData } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectData = (state) => state.user.data;
export default userSlice.reducer;
