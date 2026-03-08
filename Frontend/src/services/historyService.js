import api from "./api";

export const getWatchHistory = async () => {
  const res = await api.get("/api/history");
  return res.data;
};

export const addToHistory = async (movieData) => {
  const res = await api.post("/api/history", movieData);
  return res.data;
};

export const clearHistory = async () => {
  const res = await api.delete("/api/history");
  return res.data;
};

export const removeFromHistory = async (movieId) => {
  const res = await api.delete(`/api/history/${movieId}`);
  return res.data;
};