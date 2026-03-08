import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
          🎬 <span className="text-blue-500">Cine</span>Verse
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400 font-medium">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/movies" className="hover:text-white transition">Movies</Link>
          <Link to="/tv" className="hover:text-white transition">TV Shows</Link>
          <Link to="/search" className="hover:text-white transition">Search</Link>
          <Link to="/history" className="hover:text-white transition">History</Link>
          <Link to="/watchlist" className="hover:text-white transition">🔖 Watchlist</Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">Admin</Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {user ? (
            <>
              <Link to="/favorites" className="text-gray-400 hover:text-white text-sm transition">
                ❤️ Favorites
              </Link>
              <span className="text-gray-500 text-sm hidden md:block">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}