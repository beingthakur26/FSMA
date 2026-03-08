import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminGetMovies, adminAddMovie, adminUpdateMovie, adminDeleteMovie,
  adminGetUsers, adminBanUser, adminDeleteUser, adminGetStats,
} from "../../services/adminService";

// ── Movies ────────────────────────────────────────────────────────────────────

export const fetchAdminMovies = createAsyncThunk("admin/fetchMovies", async (_, thunkAPI) => {
  try { return await adminGetMovies(); }
  catch { return thunkAPI.rejectWithValue("Failed to fetch movies"); }
});

export const addMovie = createAsyncThunk("admin/addMovie", async (data, thunkAPI) => {
  try { return await adminAddMovie(data); }
  catch { return thunkAPI.rejectWithValue("Failed to add movie"); }
});

export const updateMovie = createAsyncThunk("admin/updateMovie", async ({ id, data }, thunkAPI) => {
  try { return await adminUpdateMovie(id, data); }
  catch { return thunkAPI.rejectWithValue("Failed to update movie"); }
});

export const deleteMovie = createAsyncThunk("admin/deleteMovie", async (id, thunkAPI) => {
  try { await adminDeleteMovie(id); return id; }
  catch { return thunkAPI.rejectWithValue("Failed to delete movie"); }
});

// ── Users ─────────────────────────────────────────────────────────────────────

export const fetchAdminUsers = createAsyncThunk("admin/fetchUsers", async (_, thunkAPI) => {
  try { return await adminGetUsers(); }
  catch { return thunkAPI.rejectWithValue("Failed to fetch users"); }
});

export const banUser = createAsyncThunk("admin/banUser", async (userId, thunkAPI) => {
  try { return await adminBanUser(userId); }  // returns full updated user
  catch { return thunkAPI.rejectWithValue("Failed to ban/unban user"); }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId, thunkAPI) => {
  try { await adminDeleteUser(userId); return userId; }
  catch { return thunkAPI.rejectWithValue("Failed to delete user"); }
});

// ── Stats ─────────────────────────────────────────────────────────────────────

export const fetchAdminStats = createAsyncThunk("admin/fetchStats", async (_, thunkAPI) => {
  try { return await adminGetStats(); }
  catch { return thunkAPI.rejectWithValue("Failed to fetch stats"); }
});

// ── Slice ─────────────────────────────────────────────────────────────────────

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    movies: [],
    users: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // ── Movies ──────────────────────────────────────────────────────────────
      .addCase(fetchAdminMovies.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminMovies.fulfilled, (state, action) => { state.loading = false; state.movies = action.payload; })
      .addCase(fetchAdminMovies.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(addMovie.pending, (state) => { state.loading = true; })
      .addCase(addMovie.fulfilled, (state, action) => { state.loading = false; state.movies.unshift(action.payload); })
      .addCase(addMovie.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(updateMovie.pending, (state) => { state.loading = true; })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.movies.findIndex((m) => m._id === action.payload._id);
        if (idx !== -1) state.movies[idx] = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m._id !== action.payload);
      })

      // ── Users ───────────────────────────────────────────────────────────────
      .addCase(fetchAdminUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchAdminUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // FIX: backend now returns the full updated user, so we can replace by _id correctly
      .addCase(banUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })

      // ── Stats ────────────────────────────────────────────────────────────────
      .addCase(fetchAdminStats.pending, (state) => { state.loading = true; })
      .addCase(fetchAdminStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(fetchAdminStats.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;