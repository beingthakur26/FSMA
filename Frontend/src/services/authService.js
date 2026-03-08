import api from "./api";

// Register new user
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/signup", userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  await api.post("/api/auth/logout");
};

export const getUserProfile = async () => {
  const res = await api.get("/api/auth/profile");
  return res.data;
};

export const updateUserProfile = async (data) => {
  const res = await api.put("/api/auth/profile", data);
  return res.data;
};