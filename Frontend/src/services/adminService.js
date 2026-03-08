import api from "./api";

// ── Movies ────────────────────────────────────────────────────────────────────

export const adminGetMovies = async () => {
  const res = await api.get("/api/admin/movies");
  return res.data;
};

export const adminAddMovie = async (movieData) => {
  const res = await api.post("/api/admin/movies", movieData);
  return res.data;
};

export const adminUpdateMovie = async (id, movieData) => {
  const res = await api.put(`/api/admin/movies/${id}`, movieData);
  return res.data;
};

export const adminDeleteMovie = async (id) => {
  const res = await api.delete(`/api/admin/movies/${id}`);
  return res.data;
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const adminGetUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

// FIX: was PUT — backend route is PATCH
export const adminBanUser = async (userId) => {
  const res = await api.patch(`/api/admin/users/${userId}/ban`);
  return res.data;   // now returns the full updated user object
};

export const adminDeleteUser = async (userId) => {
  const res = await api.delete(`/api/admin/users/${userId}`);
  return res.data;
};

// ── Stats ─────────────────────────────────────────────────────────────────────

export const adminGetStats = async () => {
  const res = await api.get("/api/admin/stats");
  return res.data;
};