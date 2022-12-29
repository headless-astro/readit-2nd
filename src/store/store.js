import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import loginReducer from "./slices/loginSlice";
import favoriteMoviesReducer from "./slices/favoriteMovieSlice";
import watchMoviesReducer from "./slices/forWatchList";

export default configureStore({
  reducer: {
    mert: dataReducer,
    login: loginReducer,
    favorite: favoriteMoviesReducer,
    forwatch: watchMoviesReducer,
    // redux store kısmı
  },
});
