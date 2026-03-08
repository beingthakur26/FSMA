import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import movieReducer from "./slices/movieSlice";
import searchReducer from "./slices/searchSlice";
import favoritesReducer from "./slices/favoritesSlice";
import watchHistoryReducer from "./slices/watchHistoryScroll";
import adminReducer from "./slices/adminSlice";
import watchlistReducer from "./slices/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    history: watchHistoryReducer,
    admin: adminReducer,
    watchlist: watchlistReducer,
  },
});