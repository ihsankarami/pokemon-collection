import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (nextUrl = "/api/pokemon") => {
    const response = await fetch(nextUrl);
    const data = await response.json();

    // Fetch detailed data for each Pokémon
    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      })
    );

    return {
      pokemonList: pokemonData,
      nextPageUrl: data.next, // Store the URL for the next page
    };
  }
);

const initialState = {
  pokemonList: [],
  loading: false,
  error: null,
  filterType: [],
  filterAbility: [],
  searchTerm: "",
  sortOrder: "",
  nextPageUrl: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList: (state, action) => {
      state.pokemonList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilterType: (state, action) => {
      state.filterType = action.payload;
    },
    setFilterAbilty: (state, action) => {
      state.filterAbility = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = [
          ...state.pokemonList,
          ...action.payload.pokemonList,
        ]; // Append new data
        state.nextPageUrl = action.payload.nextPageUrl; // Update next page URL
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPokemonList,
  setLoading,
  setError,
  setFilterType,
  setFilterAbilty,
  setSearchTerm,
  setSortOrder,
} = pokemonSlice.actions;
export default pokemonSlice.reducer;
