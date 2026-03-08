import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register, logout } from "../redux/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const handleLogin = async (credentials) => {
    const result = await dispatch(login(credentials));
    if (login.fulfilled.match(result)) navigate("/");
  };

  const handleRegister = async (userData) => {
    const result = await dispatch(register(userData));
    if (register.fulfilled.match(result)) navigate("/");
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}