import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../redux/slices/adminSlice";
import AddEditMovie from "./AddEditMovie";
import Loader from "../components/common/Loader";

export default function ManageMovies() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.admin);

  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminMovies());
  }, [dispatch]);

  const handleSubmit = async (formData) => {
    if (editingMovie) {
      await dispatch(updateMovie({ id: editingMovie._id, data: formData }));
    } else {
      await dispatch(addMovie(formData));
    }
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this movie permanently?")) {
      dispatch(deleteMovie(id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && movies.length === 0) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">🎬 Manage Movies</h1>
          <p className="text-gray-400 text-sm mt-1">{movies.length} total movies</p>
        </div>
        <button
          onClick={() => { setEditingMovie(null); setShowForm(true); }}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition"
        >
          + Add Movie
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search movies..."
        className="w-full max-w-sm bg-gray-800 text-white rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-600 text-sm mb-6"
      />

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="px-5 py-4 font-medium">Title</th>
              <th className="px-5 py-4 font-medium hidden md:table-cell">Genre</th>
              <th className="px-5 py-4 font-medium hidden md:table-cell">Category</th>
              <th className="px-5 py-4 font-medium hidden md:table-cell">Release</th>
              <th className="px-5 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-10">
                  No movies found
                </td>
              </tr>
            ) : (
              filtered.map((movie) => (
                <tr
                  key={movie._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                >
                  <td className="px-5 py-4 text-white font-medium">{movie.title}</td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{movie.genre || "—"}</td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">{movie.category || "—"}</td>
                  <td className="px-5 py-4 text-gray-400 hidden md:table-cell">
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit modal */}
      {showForm && (
        <AddEditMovie
          movie={editingMovie}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
    </div>
  );
}