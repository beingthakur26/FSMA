/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../../services/authService";
// ↑ FIX: getUserProfile and updateUserProfile were never imported — caused "Update failed" silently

const getErrorMessage = (err, defaultMessage) => {
  return err?.response?.data?.message || err?.message || defaultMessage;
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, "Login failed"));
    }
  }
);

export const register = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, "Registration failed"));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return true;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err, "Logout failed"));
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    try {
      return await getUserProfile();
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      return await updateUserProfile(userData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || "Update failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isInitialized: false,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // CHECK AUTH
      .addCase(checkAuth.pending,    (state) => { state.loading = true; })
      .addCase(checkAuth.fulfilled,  (state, action) => { state.loading = false; state.user = action.payload; state.isInitialized = true; })
      .addCase(checkAuth.rejected,   (state) => { state.loading = false; state.user = null; state.isInitialized = true; })

      // LOGIN
      .addCase(login.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // REGISTER
      .addCase(register.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => { state.user = null; state.error = null; })
      .addCase(logout.rejected,  (state, action) => { state.error = action.payload; })

      // FETCH PROFILE
      .addCase(fetchProfile.fulfilled, (state, action) => { state.user = action.payload; })

      // UPDATE PROFILE
      .addCase(updateProfile.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(updateProfile.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;