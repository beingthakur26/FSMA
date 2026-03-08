import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers, banUser, deleteUser } from "../redux/slices/adminSlice";
import Loader from "../components/common/Loader";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [filterBanned, setFilterBanned] = useState("all"); // "all" | "active" | "banned"

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const handleBan = (user) => {
    const action = user.isBanned ? "Unban" : "Ban";
    if (window.confirm(`${action} "${user.name}"?`)) {
      dispatch(banUser(user._id));
    }
  };

  const handleDelete = (user) => {
    if (window.confirm(`Permanently delete "${user.name}"? This cannot be undone.`)) {
      dispatch(deleteUser(user._id));
    }
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterBanned === "all" ||
      (filterBanned === "banned" && u.isBanned) ||
      (filterBanned === "active" && !u.isBanned);
    return matchesSearch && matchesFilter;
  });

  const bannedCount = users.filter((u) => u.isBanned).length;
  const activeCount = users.length - bannedCount;

  if (loading && users.length === 0) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">👥 Manage Users</h1>
          <p className="text-gray-400 text-sm mt-1">
            {users.length} total &nbsp;·&nbsp;
            <span className="text-green-400">{activeCount} active</span>
            &nbsp;·&nbsp;
            <span className="text-red-400">{bannedCount} banned</span>
          </p>
        </div>
        <button
          onClick={() => dispatch(fetchAdminUsers())}
          className="text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition"
        >
          ↻ Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full max-w-sm bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-600 text-sm"
        />
        <div className="flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "active", label: "Active" },
            { key: "banned", label: "Banned" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterBanned(key)}
              className={`text-sm px-4 py-2 rounded-xl transition font-medium ${
                filterBanned === key
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="px-5 py-4 font-medium">Name</th>
              <th className="px-5 py-4 font-medium hidden md:table-cell">Email</th>
              <th className="px-5 py-4 font-medium hidden md:table-cell">Role</th>
              <th className="px-5 py-4 font-medium hidden sm:table-cell">Joined</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-12">
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b border-gray-800 transition ${
                    user.isBanned
                      ? "bg-red-500/5 hover:bg-red-500/10"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  {/* Name */}
                  <td className="px-5 py-4 text-white font-medium">
                    <div className="flex items-center gap-3">
                      {/* Avatar initials */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          user.isBanned
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className={user.isBanned ? "line-through text-gray-500" : ""}>
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4 text-gray-500 text-xs hidden sm:table-cell">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        user.isBanned
                          ? "bg-red-500/20 text-red-400 border border-red-500/20"
                          : "bg-green-500/20 text-green-400 border border-green-500/20"
                      }`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    {user.role === "admin" ? (
                      <span className="text-xs text-gray-600 italic">Protected</span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleBan(user)}
                          disabled={loading}
                          className={`text-xs px-3 py-1.5 rounded-lg transition border disabled:opacity-50 ${
                            user.isBanned
                              ? "bg-green-600/20 hover:bg-green-600/40 border-green-500/30 text-green-400"
                              : "bg-yellow-600/20 hover:bg-yellow-600/40 border-yellow-500/30 text-yellow-400"
                          }`}
                        >
                          {user.isBanned ? "Unban" : "Ban"}
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={loading}
                          className="bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      {filtered.length > 0 && (
        <p className="text-gray-600 text-xs mt-3 text-right">
          Showing {filtered.length} of {users.length} users
        </p>
      )}
    </div>
  );
}