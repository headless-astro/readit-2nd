import { createSlice } from "@reduxjs/toolkit";
const watchListFromLocalStorage = localStorage.getItem("watchList");
const watchParse = JSON.parse(watchListFromLocalStorage)
  ? JSON.parse(watchListFromLocalStorage)
  : [];

const initialState = {
  watchMovies: watchParse.length > 0 ? watchParse : [],
};

export const watch = createSlice({
  name: " watchMovies",
  initialState: initialState,
  reducers: {
    addWatchMovie: (state, { payload }) => {
      state.watchMovies = [...state.watchMovies, payload];
      localStorage.setItem("watchList", JSON.stringify(state.watchMovies));
    },
    deleteWatchMovie: (state, { payload }) => {
      state.watchMovies = state.watchMovies.filter(
        (item) => item.Id !== payload.Id
      );
      localStorage.setItem("watchList", JSON.stringify(state.watchMovies));
    },
  },
});

export const { addWatchMovie, deleteWatchMovie } = watch.actions;

export default watch.reducer;
