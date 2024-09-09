"use client";

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    password: "",
    isAuthenticated: false,
  },
  reducers: {
    setIsAuthenticated: () => {
      state.isAuthenticated = action.payload;
    },
    setUserName: () => {
      state.username = action.payload;
    },
    setPassword: () => {
      state.password = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUserName, setPassword } =
  authSlice.actions;
export default authSlice.reducer;
