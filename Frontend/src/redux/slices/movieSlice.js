import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrending,
  getPopularMovies,
  getPopularTVShows,
  getMovieDetails,
  getMovieVideos,
  getTVDetails,
  getTVVideos,
} from "../../services/tmdb";

export const fetchTrending = createAsyncThunk("movies/fetchTrending", async (_, thunkAPI) => {
  try {
    const res = await getTrending("all", "day");
    return res.data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch trending");
  }
});

export const fetchPopularMovies = createAsyncThunk("movies/fetchPopular", async (_, thunkAPI) => {
  try {
    const res = await getPopularMovies(1);
    return res.data.results;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch popular");
  }
});

// Paginated movies for Movies page
export const fetchMoviesPage = createAsyncThunk("movies/fetchMoviesPage", async (page, thunkAPI) => {
  try {
    const res = await getPopularMovies(page);
    return { results: res.data.results, totalPages: res.data.total_pages, page };
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to load movies");
  }
});

// Paginated TV shows for TV page
export const fetchTVPage = createAsyncThunk("movies/fetchTVPage", async (page, thunkAPI) => {
  try {
    const res = await getPopularTVShows(page);
    return { results: res.data.results, totalPages: res.data.total_pages, page };
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to load TV shows");
  }
});

export const fetchMovieDetails = createAsyncThunk("movies/fetchDetails", async (id, thunkAPI) => {
  try {
    const res = await getMovieDetails(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch movie details");
  }
});

export const fetchMovieVideos = createAsyncThunk("movies/fetchVideos", async (id, thunkAPI) => {
  try {
    const res = await getMovieVideos(id);
    const trailer = res.data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch trailer");
  }
});

export const fetchTVDetails = createAsyncThunk("movies/fetchTVDetails", async (id, thunkAPI) => {
  try {
    const res = await getTVDetails(id);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch TV show details");
  }
});

export const fetchTVVideos = createAsyncThunk("movies/fetchTVVideos", async (id, thunkAPI) => {
  try {
    const res = await getTVVideos(id);
    const trailer = res.data.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (err) {
    return thunkAPI.rejectWithValue("Failed to fetch TV trailer");
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    popular: [],

    // Movies page
    moviesList: [],
    moviesPage: 1,
    moviesTotalPages: 1,
    moviesLoading: false,

    // TV page
    tvList: [],
    tvPage: 1,
    tvTotalPages: 1,
    tvLoading: false,

    selectedMovie: null,
    trailerKey: null,
    loading: false,
    detailLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.trailerKey = null;
    },
    resetMoviesList: (state) => {
      state.moviesList = [];
      state.moviesPage = 1;
      state.moviesTotalPages = 1;
    },
    resetTVList: (state) => {
      state.tvList = [];
      state.tvPage = 1;
      state.tvTotalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Trending
      .addCase(fetchTrending.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTrending.fulfilled, (state, action) => { state.loading = false; state.trending = action.payload; })
      .addCase(fetchTrending.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Popular
      .addCase(fetchPopularMovies.pending, (state) => { state.loading = true; })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => { state.loading = false; state.popular = action.payload; })
      .addCase(fetchPopularMovies.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Movies page (paginated — append results)
      .addCase(fetchMoviesPage.pending, (state) => { state.moviesLoading = true; state.error = null; })
      .addCase(fetchMoviesPage.fulfilled, (state, action) => {
        state.moviesLoading = false;
        // Avoid duplicate entries on re-fetch
        const existingIds = new Set(state.moviesList.map((m) => m.id));
        const newItems = action.payload.results.filter((m) => !existingIds.has(m.id));
        state.moviesList = [...state.moviesList, ...newItems];
        state.moviesPage = action.payload.page;
        state.moviesTotalPages = action.payload.totalPages;
      })
      .addCase(fetchMoviesPage.rejected, (state, action) => { state.moviesLoading = false; state.error = action.payload; })

      // TV page (paginated — append results)
      .addCase(fetchTVPage.pending, (state) => { state.tvLoading = true; state.error = null; })
      .addCase(fetchTVPage.fulfilled, (state, action) => {
        state.tvLoading = false;
        const existingIds = new Set(state.tvList.map((m) => m.id));
        const newItems = action.payload.results.filter((m) => !existingIds.has(m.id));
        state.tvList = [...state.tvList, ...newItems];
        state.tvPage = action.payload.page;
        state.tvTotalPages = action.payload.totalPages;
      })
      .addCase(fetchTVPage.rejected, (state, action) => { state.tvLoading = false; state.error = action.payload; })

      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => { state.detailLoading = true; state.error = null; })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => { state.detailLoading = false; state.selectedMovie = action.payload; })
      .addCase(fetchMovieDetails.rejected, (state, action) => { state.detailLoading = false; state.error = action.payload; })

      // Trailer
      .addCase(fetchMovieVideos.fulfilled, (state, action) => { state.trailerKey = action.payload; })
      .addCase(fetchMovieVideos.rejected, (state) => { state.trailerKey = null; })

      // TV Details
      .addCase(fetchTVDetails.pending, (state) => { state.detailLoading = true; state.error = null; })
      .addCase(fetchTVDetails.fulfilled, (state, action) => { state.detailLoading = false; state.selectedMovie = action.payload; })
      .addCase(fetchTVDetails.rejected, (state, action) => { state.detailLoading = false; state.error = action.payload; })

      // TV Trailer
      .addCase(fetchTVVideos.fulfilled, (state, action) => { state.trailerKey = action.payload; })
      .addCase(fetchTVVideos.rejected, (state) => { state.trailerKey = null; })
  },
});

export const { clearSelectedMovie, resetMoviesList, resetTVList } = movieSlice.actions;
export default movieSlice.reducer;