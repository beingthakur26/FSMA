import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const navItems = [
  { to: "/admin", label: "📊 Dashboard", end: true },
  { to: "/admin/movies", label: "🎬 Movies" },
  { to: "/admin/users", label: "👥 Users" },
];

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col fixed top-0 left-0 h-full z-40">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">
            🎬 <span className="text-yellow-400">Admin</span>
          </h1>
          <p className="text-gray-500 text-xs mt-1">{user?.name}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-5 border-t border-gray-800 space-y-2">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            ← Back to Site
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-600/10 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 p-8 min-h-screen">
        {children}
      </main>

    </div>
  );
}