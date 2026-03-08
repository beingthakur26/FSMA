import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile, clearError } from "../redux/slices/authSlice";
import { fetchFavorites } from "../redux/slices/favoritesSlice";
import { fetchWatchHistory } from "../redux/slices/watchHistoryScroll";
import { fetchWatchlist } from "../redux/slices/watchlistSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

function StatCard({ label, value, icon, to }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(to)}
      className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-5 cursor-pointer transition group"
    >
      <p className="text-3xl mb-2">{icon}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-gray-400 text-sm group-hover:text-white transition">{label}</p>
    </div>
  );
}

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const { items: favorites }     = useSelector((state) => state.favorites);
  const { items: history }       = useSelector((state) => state.history);
  const { items: watchlist }     = useSelector((state) => state.watchlist);

  const [activeTab, setActiveTab] = useState("info");
  const [success, setSuccess]     = useState(false);

  const [infoForm, setInfoForm] = useState({ name: "", email: "" });
  const [passForm, setPassForm] = useState({ newPassword: "", confirmPassword: "" });
  const [passError, setPassError] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchFavorites());
    dispatch(fetchWatchHistory());
    dispatch(fetchWatchlist());
    return () => dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) setInfoForm({ name: user.name || "", email: user.email || "" });
  }, [user]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(infoForm));
    if (updateProfile.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    setPassError("");
    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassError("Passwords do not match");
      return;
    }
    if (passForm.newPassword.length < 6) {
      setPassError("Password must be at least 6 characters");
      return;
    }
    const result = await dispatch(updateProfile({ password: passForm.newPassword }));
    if (updateProfile.fulfilled.match(result)) {
      setSuccess(true);
      setPassForm({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (!user) return <Loader />;

  const tabs = [
    { id: "info",     label: "👤 Info" },
    { id: "password", label: "🔒 Password" },
    { id: "stats",    label: "📊 Stats" },
  ];

  return (
    // FIX: full-width bg-gray-950 on outer, max-w constraint on inner
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-3xl mx-auto pt-24 px-4 pb-16">

        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
            {user.role === "admin" && (
              <span className="text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Success */}
        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-400 rounded-xl px-4 py-3 mb-5 text-sm">
            ✅ Profile updated successfully
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-xl px-4 py-3 mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Info */}
        {activeTab === "info" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-5">Edit Profile Info</h2>
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <input type="text" value={infoForm.name} required
                  onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input type="email" value={infoForm.email} required
                  onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}

        {/* Tab: Password */}
        {activeTab === "password" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-5">Change Password</h2>
            {passError && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-xl px-4 py-3 mb-4 text-sm">
                {passError}
              </div>
            )}
            <form onSubmit={handlePassSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">New Password</label>
                <input type="password" value={passForm.newPassword} required
                  placeholder="Min. 6 characters"
                  onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                <input type="password" value={passForm.confirmPassword} required
                  placeholder="Repeat password"
                  onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder-gray-600"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition text-sm">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}

        {/* Tab: Stats */}
        {activeTab === "stats" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard label="Favorites"    value={favorites.length} icon="❤️" to="/favorites" />
              <StatCard label="Watchlist"    value={watchlist.length} icon="🔖" to="/watchlist" />
              <StatCard label="Watch History" value={history.length}  icon="🕐" to="/history"   />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mt-4">
              <h3 className="text-white font-semibold mb-3">Account Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Member since</span>
                  <span className="text-gray-300">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Role</span>
                  <span className={user.role === "admin" ? "text-yellow-400" : "text-gray-300"}>
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account status</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}