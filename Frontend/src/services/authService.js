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