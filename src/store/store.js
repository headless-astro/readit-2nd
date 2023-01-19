import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import userReducer from "./slices/userSlice";

import moviesReducer from "./slices/movieSlice";
import movieReducer from "./slices/singleMovieSlice";
import listsReducer from "./slices/listSlice";
import listReducer from "./slices/singleListSlice";
import favoritesReducer from "./slices/favoritesSlice";
import watchlistReducer from "./slices/watchlistSlice";

export default configureStore({
  reducer: {
    mert: dataReducer,
    movies: moviesReducer,
    user: userReducer,
    lists: listsReducer,
    list: listReducer,
    movie: movieReducer,
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
    // redux store kısmı
  },
});
