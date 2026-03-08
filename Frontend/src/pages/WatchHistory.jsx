import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchWatchHistory,
  deleteSingleHistory,
  clearAllHistory,
} from "../redux/slices/watchHistoryScroll";
import { TMDB_IMAGE_BASE } from "../services/tmdb";
import Loader from "../components/common/Loader";

function HistoryCard({ item, onRemove }) {
  const navigate = useNavigate();

  const poster = item.poster
    ? `${TMDB_IMAGE_BASE}${item.poster}`
    : "/placeholder.jpg";

  const rating = item.rating ? item.rating.toFixed(1) : "N/A";
  const year = item.release_date
    ? new Date(item.release_date).getFullYear()
    : "N/A";

  // Format watched time
  const watchedAt = item.watchedAt
    ? new Date(item.watchedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition group">
      {/* Poster */}
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/movie/${item.movieId}`)}
      >
        <img
          src={poster}
          alt={item.title}
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
          ⭐ {rating}
        </div>
        {/* Watched badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          👁 Watched
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p
          className="text-white font-semibold text-sm truncate cursor-pointer hover:text-blue-400 transition mb-1"
          onClick={() => navigate(`/movie/${item.movieId}`)}
        >
          {item.title}
        </p>
        <p className="text-gray-500 text-xs mb-1">{year}</p>
        {watchedAt && (
          <p className="text-gray-600 text-xs mb-3">🕐 {watchedAt}</p>
        )}

        <button
          onClick={() => onRemove(item.movieId)}
          className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white text-xs font-semibold py-2 rounded-lg transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default function WatchHistory() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchWatchHistory());
  }, [dispatch]);

  const handleRemove = (movieId) => {
    dispatch(deleteSingleHistory(movieId));
  };

  const handleClearAll = () => {
    if (window.confirm("Clear your entire watch history?")) {
      dispatch(clearAllHistory());
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 px-4 max-w-7xl mx-auto pb-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">🕐 Watch History</h1>
          <p className="text-gray-400 text-sm mt-1">
            {items.length > 0
              ? `${items.length} movie${items.length > 1 ? "s" : ""} watched`
              : "No history yet"}
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-6">{error}</p>
      )}

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="text-center mt-24">
          <p className="text-6xl mb-4">🎬</p>
          <p className="text-white text-lg font-semibold">No watch history yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Movies you open will automatically appear here
          </p>
        </div>
      )}

      {/* History grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items.map((item) => (
            <HistoryCard
              key={item.movieId}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

    </div>
  );
}