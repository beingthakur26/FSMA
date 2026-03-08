import api from "./api";

export const getFavorites = async () => {
  const res = await api.get("/api/favorites");
  return res.data;
};

export const addFavorite = async (movieData) => {
  const res = await api.post("/api/favorites", movieData);
  return res.data;
};

export const removeFavorite = async (movieId) => {
  const res = await api.delete(`/api/favorites/${movieId}`);
  return res.data;
};