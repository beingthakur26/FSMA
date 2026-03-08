import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWatchHistory,
  addToHistory,
  clearHistory,
  removeFromHistory,
} from "../../services/historyService";

export const fetchWatchHistory = createAsyncThunk(
  "history/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getWatchHistory();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch watch history");
    }
  }
);

export const saveToHistory = createAsyncThunk(
  "history/save",
  async (movieData, thunkAPI) => {
    try {
      const data = await addToHistory(movieData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to save to history");
    }
  }
);

export const deleteSingleHistory = createAsyncThunk(
  "history/deleteOne",
  async (movieId, thunkAPI) => {
    try {
      await removeFromHistory(movieId);
      return movieId;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to remove item");
    }
  }
);

export const clearAllHistory = createAsyncThunk(
  "history/clearAll",
  async (_, thunkAPI) => {
    try {
      await clearHistory();
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to clear history");
    }
  }
);

const watchHistorySlice = createSlice({
  name: "history",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchWatchHistory.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWatchHistory.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchWatchHistory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // Save
      .addCase(saveToHistory.fulfilled, (state, action) => {
        // Avoid duplicates in local state
        const exists = state.items.find((i) => i.movieId === action.payload.movieId);
        if (!exists) state.items.unshift(action.payload);
      })
      // Delete one
      .addCase(deleteSingleHistory.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.movieId !== action.payload);
      })
      // Clear all
      .addCase(clearAllHistory.fulfilled, (state) => { state.items = []; });
  },
});

export default watchHistorySlice.reducer;