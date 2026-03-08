import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import WatchHistory from "./pages/WatchHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageMovies from "./admin/ManageMovies";
import ManageUsers from "./admin/ManageUsers";
import ProtectedRoute from "./utils/protectedRoute";
import AdminRoute from "./utils/AdminRoute";
import TVDetail from "./pages/TVDetail";

import { useEffect } from "react";           // ← add
import { useDispatch } from "react-redux";   // ← add
import { checkAuth } from "./redux/slices/authSlice";  // ← add
import Watchlist from "./pages/Watchlist";
import Footer from "./components/common/Footer";
import People from "./pages/People";
import Profile from "./pages/Profile";

function WithNavbar({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();   // ← add

  useEffect(() => {                 // ← add
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User routes */}
      <Route path="/" element={<WithNavbar><ProtectedRoute><Home /></ProtectedRoute></WithNavbar>} />
      <Route path="/movies" element={<WithNavbar><ProtectedRoute><Movies /></ProtectedRoute></WithNavbar>} />
      <Route path="/tv" element={<WithNavbar><ProtectedRoute><TVShows /></ProtectedRoute></WithNavbar>} />
      <Route path="/tv/:id" element={<WithNavbar><ProtectedRoute><TVDetail /></ProtectedRoute></WithNavbar>} />
      <Route path="/movie/:id" element={<WithNavbar><ProtectedRoute><MovieDetail /></ProtectedRoute></WithNavbar>} />
      <Route path="/search" element={<WithNavbar><ProtectedRoute><SearchResults /></ProtectedRoute></WithNavbar>} />
      <Route path="/favorites" element={<WithNavbar><ProtectedRoute><Favorites /></ProtectedRoute></WithNavbar>} />
      <Route path="/history" element={<WithNavbar><ProtectedRoute><WatchHistory /></ProtectedRoute></WithNavbar>} />
      <Route path="/watchlist" element={<WithNavbar><ProtectedRoute><Watchlist /></ProtectedRoute></WithNavbar>} />
      <Route path="/people" element={<WithNavbar><ProtectedRoute><People /></ProtectedRoute></WithNavbar>} />
      <Route path="/profile" element={<WithNavbar><ProtectedRoute><Profile /></ProtectedRoute></WithNavbar>} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout><Dashboard /></AdminLayout></AdminRoute>} />
      <Route path="/admin/movies" element={<AdminRoute><AdminLayout><ManageMovies /></AdminLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminLayout><ManageUsers /></AdminLayout></AdminRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}