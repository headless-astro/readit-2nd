import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import favoritesAPI from "../../api/favoritesAPI";
import errors from "../../api/errors";

const initialState = {
  favorites: false,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    try {
      const response = await favoritesAPI.getFavorites();
      console.log(response);
      let value = false;
      if (!errors.isError(response)) {
        value = response.data.data;
        console.log("Favorites", response.data);
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

export const favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      console.log(state.favorites);
    },
  },
});

export default favorites.reducer;
