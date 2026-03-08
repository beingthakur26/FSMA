import api from "./api";

export const getWatchlist = async () => {
  const res = await api.get("/api/watchlist");
  return res.data;
};

export const addToWatchlist = async (movieData) => {
  const res = await api.post("/api/watchlist", movieData);
  return res.data;
};

export const removeFromWatchlist = async (movieId) => {
  const res = await api.delete(`/api/watchlist/${movieId}`);
  return res.data;
};