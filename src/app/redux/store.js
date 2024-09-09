"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import pokemonReducer from "./pokemonSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  reducer: {
    pokemon: pokemonReducer,
  },
});

export default store;
