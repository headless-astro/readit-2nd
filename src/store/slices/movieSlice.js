import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MovieApi from "../../api/MovieAPI";
import errors from "../../api/errors";

const initialState = {
  movie: false,
};

export const fetchMovies = createAsyncThunk("movie/fetchMovie", async () => {
  try {
    const response = await MovieApi.getAllMovie();
    console.log(response);
    let value = false;
    if (!errors.isError(response)) {
      value = response.data.data;
      console.log("Movie", response.data);
    }

    return value;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
  }

  return null;
});

export const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled]: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    },
  },
});

export default movie.reducer;
