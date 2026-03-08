import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../../services/watchlistService";

export const fetchWatchlist = createAsyncThunk("watchlist/fetchAll", async (_, thunkAPI) => {
  try { return await getWatchlist(); }
  catch { return thunkAPI.rejectWithValue("Failed to fetch watchlist"); }
});

export const addToWatchlistAction = createAsyncThunk("watchlist/add", async (data, thunkAPI) => {
  try { return await addToWatchlist(data); }  // backend returns full updated array
  catch (err) {
    const msg = err?.response?.data?.message || "Failed to add to watchlist";
    return thunkAPI.rejectWithValue(msg);
  }
});

export const removeFromWatchlistAction = createAsyncThunk("watchlist/remove", async (movieId, thunkAPI) => {
  try { return await removeFromWatchlist(movieId); }  // backend returns full updated array
  catch { return thunkAPI.rejectWithValue("Failed to remove from watchlist"); }
});

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending,  (state) => { state.loading = true; state.error = null; })
      .addCase(fetchWatchlist.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchWatchlist.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // FIX: backend returns full updated array — replace items entirely, don't push
      .addCase(addToWatchlistAction.pending,    (state) => { state.loading = true; })
      .addCase(addToWatchlistAction.fulfilled,  (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(addToWatchlistAction.rejected,   (state, action) => { state.loading = false; state.error = action.payload; })

      // FIX: backend returns full updated array after removal too
      .addCase(removeFromWatchlistAction.pending,    (state) => { state.loading = true; })
      .addCase(removeFromWatchlistAction.fulfilled,  (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(removeFromWatchlistAction.rejected,   (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default watchlistSlice.reducer;