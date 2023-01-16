import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import userReducer from "./slices/userSlice";
import favoriteMoviesReducer from "./slices/favoriteMovieSlice";
import watchMoviesReducer from "./slices/forWatchList";
import movieReducer from "./slices/movieSlice";
import listReducer from "./slices/listSlice";

export default configureStore({
  reducer: {
    mert: dataReducer,
    movie: movieReducer,
    user: userReducer,
    favorite: favoriteMoviesReducer,
    forwatch: watchMoviesReducer,
    lists: listReducer,
    // redux store kısmı
  },
});
