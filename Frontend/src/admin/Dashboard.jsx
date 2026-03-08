import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../redux/slices/adminSlice";
import Loader from "../components/common/Loader";

function StatCard({ label, value, icon, colorClass, subLabel }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
          Live
        </span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value ?? "—"}</p>
      <p className="text-gray-400 text-sm">{label}</p>
      {subLabel && <p className="text-gray-600 text-xs mt-1">{subLabel}</p>}
    </div>
  );
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loading && !stats) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Platform overview — live data</p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
        <StatCard
          label="Total Users"
          value={stats?.totalUsers}
          icon="👥"
          colorClass="bg-blue-500/20 text-blue-400"
        />
        <StatCard
          label="Banned Users"
          value={stats?.bannedUsers}
          icon="🚫"
          colorClass="bg-red-500/20 text-red-400"
          subLabel={
            stats?.totalUsers
              ? `${((stats.bannedUsers / stats.totalUsers) * 100).toFixed(1)}% of users`
              : undefined
          }
        />
        <StatCard
          label="Total Movies"
          value={stats?.totalMovies}
          icon="🎬"
          colorClass="bg-yellow-500/20 text-yellow-400"
        />
        <StatCard
          label="Total Favorites"
          value={stats?.totalFavorites}
          icon="❤️"
          colorClass="bg-pink-500/20 text-pink-400"
        />
        <StatCard
          label="Watch History"
          value={stats?.totalHistory}
          icon="🕐"
          colorClass="bg-green-500/20 text-green-400"
        />
      </div>

      {/* Quick links info card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">📋 Quick Reference</h2>
        <div className="space-y-3 text-sm text-gray-400">
          <p>
            • Add, edit, or remove content from the{" "}
            <span className="text-yellow-400 font-medium">Movies</span> section
          </p>
          <p>
            • Ban, unban, or delete accounts from the{" "}
            <span className="text-yellow-400 font-medium">Users</span> section
          </p>
          <p>
            • Banned users cannot log in or access the platform
          </p>
          <p>
            • Admin accounts are protected — cannot be banned or deleted from this panel
          </p>
          <p>• Stats refresh each time you visit this page</p>
        </div>
      </div>
    </div>
  );
}