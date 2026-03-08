import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, clearSearch } from "../../redux/slices/searchSlice";
import useAuth from "../../hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/tv", label: "TV Shows" },
  { to: "/people", label: "People" },
  { to: "/search", label: "Search" },
];

const userLinks = [
  { to: "/favorites", label: "❤️ Favorites" },
  { to: "/watchlist", label: "🔖 Watchlist" },
  { to: "/history", label: "🕐 History" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAdmin, handleLogout } = useAuth();
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/search");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const handleSearchClear = () => {
    dispatch(clearSearch());
    setSearchOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-bold text-white tracking-tight shrink-0"
          >
            🎬 <span className="text-blue-500">Cine</span>Verse
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5 text-sm text-gray-400 font-medium">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "text-white" : "hover:text-white transition"
                }
              >
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">
                Admin
              </Link>
            )}
          </div>

          {/* Desktop search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center bg-gray-800 rounded-xl px-3 py-2 gap-2 w-56 focus-within:ring-2 focus-within:ring-blue-500 transition"
          >
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="bg-transparent text-white text-sm outline-none placeholder-gray-500 w-full"
            />
            {query && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="text-gray-400 hover:text-white text-xs transition"
              >
                ✕
              </button>
            )}
          </form>

          {/* Right side actions */}
          <div className="flex items-center gap-2">

            {/* Desktop user actions */}
            {user ? (
              <div className="hidden md:flex items-center gap-2 relative group">
                {/* Avatar trigger */}
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-xl transition">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 text-sm">{user.name}</span>
                  <span className="text-gray-500 text-xs">▾</span>
                </button>

                {/* Dropdown — appears on hover */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 space-y-0.5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      👤 My Profile
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      ❤️ Favorites
                    </Link>
                    <Link
                      to="/watchlist"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      🔖 Watchlist
                    </Link>
                    <Link
                      to="/history"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
                    >
                      🕐 Watch History
                    </Link>

                    <div className="border-t border-gray-800 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-600/10 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
              >
                Login
              </Link>
            )}

            {/* Mobile search toggle */}
            <button
              onClick={() => { setSearchOpen((p) => !p); setMenuOpen(false); }}
              className="md:hidden text-gray-400 hover:text-white transition text-lg p-1"
            >
              🔍
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => { setMenuOpen((p) => !p); setSearchOpen(false); }}
              className="md:hidden flex flex-col gap-1.5 p-2 text-gray-400 hover:text-white transition"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

        </div>

        {/* Mobile search bar dropdown */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-800 px-4 py-3">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-gray-800 rounded-xl px-3 py-2.5 gap-2 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <span className="text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search movies, TV, people..."
                autoFocus
                className="bg-transparent text-white text-sm outline-none placeholder-gray-500 flex-1"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className="text-gray-400 hover:text-white text-xs transition"
                >
                  ✕
                </button>
              )}
            </form>
          </div>
        )}

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 space-y-1">

            {/* Nav links */}
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-yellow-400 hover:bg-gray-800 transition"
              >
                ⚙️ Admin Panel
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-gray-800 my-2" />

            {/* User links */}
            {user && userLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className="block px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
              >
                {label}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-800 my-2" />

            {/* Auth */}
            {user ? (
              <div className="px-3">
                <p className="text-gray-500 text-xs mb-2">{user.name}</p>
                <button
                  onClick={() => { handleLogout(); closeMenu(); }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition mx-3"
              >
                Login
              </Link>
            )}

          </div>
        )}
      </nav>
    </>
  );
}