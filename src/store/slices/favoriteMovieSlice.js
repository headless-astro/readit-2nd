import { createSlice } from "@reduxjs/toolkit";
const favoritesFromLocalStorage = localStorage.getItem("favoriteMovies");
const favorites = JSON.parse(favoritesFromLocalStorage)
  ? JSON.parse(favoritesFromLocalStorage)
  : [];

const initialState = {
  favoriteMovies: favorites.length > 0 ? favorites : [],
};

export const favorite = createSlice({
  name: " favoriteMovies",
  initialState: initialState,
  reducers: {
    addFavoriteMovie: (state, { payload }) => {
      state.favoriteMovies = [...state.favoriteMovies, payload];
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies)
      );
    },
    deleteFavoriteMovies: (state, { payload }) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (item) => item.Id !== payload.Id
      );
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies)
      );
    },
  },
});

export const { addFavoriteMovie, deleteFavoriteMovies } = favorite.actions;

export default favorite.reducer;
