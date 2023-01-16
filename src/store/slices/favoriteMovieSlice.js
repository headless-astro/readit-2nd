import { createSlice } from "@reduxjs/toolkit";
const favoritesFromLocalStorage = localStorage.getItem("favoriteMovies");
const favorites = JSON.parse(favoritesFromLocalStorage)
  ? JSON.parse(favoritesFromLocalStorage)
  : [];

const initialState = {
  favoriteMovies: null,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await UserAPI.userInfo();

      let value = false;
      if (!errors.isError(response)) {
        value = response.data.data;
        console.log("fetchUser", response.data);
      }

      return value;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }

    return null;
  }
);

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
