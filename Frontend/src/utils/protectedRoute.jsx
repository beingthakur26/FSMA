import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function ProtectedRoute({ children }) {
  const { user, isInitialized } = useSelector((state) => state.auth);

  // checkAuth hasn't resolved yet — don't redirect, just wait
  if (!isInitialized) return <Loader />;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}