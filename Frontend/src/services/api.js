import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true // send cookies automatically
});

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

// Global response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {

    // Redirect if unauthorized
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;