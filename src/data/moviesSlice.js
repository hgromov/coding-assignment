import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMoviesFromApi } from "../api";

export const fetchMovies = createAsyncThunk(
  "fetch-movies",
  async ({ searchQuery = "", page = 1 }) => {
    return await fetchMoviesFromApi(searchQuery, page);
  }
);


const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: {
      results: [],
      page: 0,
      total_pages: 0,
    },
    fetchStatus: "",
  },
  reducers: {
    clearMovies: (state) => {
      state.movies = { results: [], page: 0, total_pages: 0 };
      state.fetchStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { page, results, total_pages } = action.payload;
        if (page !== state.movies.page) {
          const existingIds = new Set(
            state.movies.results.map((movie) => movie.id)
          );
          const uniqueResults = results.filter(
            (movie) => !existingIds.has(movie.id)
          );
          state.movies.results = [...state.movies.results, ...uniqueResults];
          state.movies.page = page;
          state.movies.total_pages = total_pages;
        }
        state.fetchStatus = "success";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
export default moviesSlice;
