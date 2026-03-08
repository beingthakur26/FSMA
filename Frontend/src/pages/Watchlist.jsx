import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWatchlist, removeFromWatchlistAction } from "../redux/slices/watchlistSlice";
import { TMDB_IMAGE_BASE } from "../services/tmdb";
import Loader from "../components/common/Loader";

function WatchlistCard({ item, onRemove }) {
  const navigate = useNavigate();
  const poster = item.poster ? `${TMDB_IMAGE_BASE}${item.poster}` : "/placeholder.jpg";
  const route  = item.mediaType === "tv" ? `/tv/${item.movieId}` : `/movie/${item.movieId}`;

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition group">
      <div className="relative cursor-pointer" onClick={() => navigate(route)}>
        <img src={poster} alt={item.title}
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
          className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-blue-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {item.mediaType === "tv" ? "TV" : "Movie"}
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 text-green-400 text-xs px-2 py-0.5 rounded-full">
          🔖 Saved
        </div>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-sm truncate cursor-pointer hover:text-blue-400 transition mb-1"
          onClick={() => navigate(route)}>{item.title}</p>
        <p className="text-gray-500 text-xs mb-3">
          Added {new Date(item.addedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        <button onClick={() => onRemove(item.movieId)}
          className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition
            bg-green-500/20 text-green-400 border border-green-500/30
            hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30">
          🔖 Watchlisted
        </button>
      </div>
    </div>
  );
}

export default function Watchlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.watchlist);

  useEffect(() => { dispatch(fetchWatchlist()); }, [dispatch]);

  if (loading && items.length === 0) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto pt-24 px-4 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">🔖 My Watchlist</h1>
          <p className="text-gray-400 text-sm mt-1">
            {items.length > 0 ? `${items.length} saved` : "Nothing saved yet"}
          </p>
        </div>
        {error && <p className="text-red-400 text-sm mb-6">{error}</p>}
        {!loading && items.length === 0 && (
          <div className="text-center mt-24">
            <p className="text-6xl mb-4">🔖</p>
            <p className="text-white text-lg font-semibold">Nothing here yet</p>
            <p className="text-gray-500 text-sm mt-1">Add movies or shows to watch later</p>
            <button onClick={() => navigate("/")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-xl transition">
              Browse Content
            </button>
          </div>
        )}
        {items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {items.map((item) => (
              <WatchlistCard key={item.movieId} item={item} onRemove={(id) => dispatch(removeFromWatchlistAction(id))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}