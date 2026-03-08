import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFavorites, addFavorite, removeFavorite } from "../../services/favoriteService";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getFavorites();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch favorites");
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/add",
  async (movieData, thunkAPI) => {
    try {
      const data = await addFavorite(movieData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add favorite");
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/remove",
  async (movieId, thunkAPI) => {
    try {
      await removeFavorite(movieId);
      return movieId;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to remove favorite");
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchFavorites.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchFavorites.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchFavorites.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Add
      .addCase(addToFavorites.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(addToFavorites.rejected, (state, action) => { state.error = action.payload; })
      // Remove
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.movieId !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => { state.error = action.payload; });
  },
});

export default favoritesSlice.reducer;