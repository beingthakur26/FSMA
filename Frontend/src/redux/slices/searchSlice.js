import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMulti } from "../../services/tmdb";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query, thunkAPI) => {
    try {
      const res = await searchMulti(query);
      // Filter out results with no poster or profile image
      return res.data.results.filter(
        (item) => item.poster_path || item.profile_path
      );
    } catch (err) {
      return thunkAPI.rejectWithValue("Search failed. Please try again.");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;