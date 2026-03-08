import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  clearSelectedMovie,
} from "../redux/slices/movieSlice";
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/favoritesSlice";
import { addToWatchlistAction, removeFromWatchlistAction } from "../redux/slices/watchlistSlice";
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE } from "../services/tmdb";
import TrailerModal from "../components/models/TrailerModal";
import Loader from "../components/common/Loader";
import { saveToHistory } from "../redux/slices/watchHistoryScroll";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedMovie: movie, trailerKey, detailLoading } = useSelector(
    (state) => state.movies
  );
  const { items: favorites } = useSelector((state) => state.favorites);
  const { items: watchlist } = useSelector((state) => state.watchlist);

  const isFavorited   = favorites.some((fav) => fav.movieId === String(id));
  const isWatchlisted = watchlist.some((w)   => w.movieId   === String(id));

  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieVideos(id));
    dispatch(fetchFavorites());
    // watchlist is already loaded globally in App.jsx — no refetch needed

    return () => dispatch(clearSelectedMovie());
  }, [id, dispatch]);

  useEffect(() => {
    if (movie) {
      dispatch(saveToHistory({
        movieId:      String(movie.id),
        title:        movie.title,
        poster:       movie.poster_path || "",
        rating:       movie.vote_average,
        release_date: movie.release_date || "",
        media_type:   "movie",
        watchedAt:    new Date().toISOString(),
      }));
    }
  }, [movie, dispatch]);

  if (detailLoading || !movie) return <Loader />;

  const backdrop = movie.backdrop_path ? `${TMDB_BACKDROP_BASE}${movie.backdrop_path}` : null;
  const poster   = movie.poster_path   ? `${TMDB_IMAGE_BASE}${movie.poster_path}`       : "/placeholder.jpg";
  const rating   = movie.vote_average  ? movie.vote_average.toFixed(1)                  : "N/A";
  const year     = movie.release_date  ? new Date(movie.release_date).getFullYear()      : "N/A";
  const runtime  = movie.runtime       ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";
  const genres   = movie.genres?.map((g) => g.name) || [];
  const overview = movie.overview || "Description not available.";

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(String(id)));
    } else {
      dispatch(addToFavorites({
        movieId:      String(id),
        title:        movie.title,
        poster:       movie.poster_path || "",
        rating:       movie.vote_average,
        release_date: movie.release_date || "",
        media_type:   "movie",
      }));
    }
  };

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAction(String(id)));
    } else {
      dispatch(addToWatchlistAction({
        movieId:   String(id),
        title:     movie.title,          // ← movie only, no show reference
        poster:    movie.poster_path || "",
        mediaType: "movie",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-16">

      {/* Backdrop */}
      <div className="relative w-full h-[55vh]">
        {backdrop
          ? <img src={backdrop} alt={movie.title} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-gray-800" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="shrink-0">
            <img
              src={poster}
              alt={movie.title}
              onError={(e) => { e.target.src = "/placeholder.jpg"; }}
              className="w-48 h-72 object-cover rounded-xl shadow-2xl border border-gray-700"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4">
            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-yellow-400 font-semibold">⭐ {rating}</span>
              <span>•</span><span>{year}</span>
              <span>•</span><span>{runtime}</span>
              {movie.status && (<><span>•</span><span className="text-green-400">{movie.status}</span></>)}
            </div>

            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {genres.map((genre) => (
                  <span key={genre} className="bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-2xl">{overview}</p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setShowTrailer(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition flex items-center gap-2"
              >
                ▶ Watch Trailer
              </button>

              {/* Favorite toggle */}
              <button
                onClick={handleFavoriteToggle}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition border ${
                  isFavorited
                    ? "bg-red-600/30 border-red-500 text-red-400 hover:bg-red-600/50"
                    : "bg-red-600/20 border-red-500/40 text-red-400 hover:bg-red-600/40"
                }`}
              >
                {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
              </button>

              {/* Watchlist toggle */}
              <button
                onClick={handleWatchlistToggle}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition border ${
                  isWatchlisted
                    ? "bg-green-600/30 border-green-500 text-green-400 hover:bg-green-600/50"
                    : "bg-green-600/20 border-green-500/40 text-green-400 hover:bg-green-600/40"
                }`}
              >
                {isWatchlisted ? "🔖 Watchlisted" : "🔖 Add to Watchlist"}
              </button>

            </div>

            {/* Extra stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {movie.budget > 0 && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Budget</p>
                  <p className="text-white font-semibold text-sm">${movie.budget.toLocaleString()}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Revenue</p>
                  <p className="text-white font-semibold text-sm">${movie.revenue.toLocaleString()}</p>
                </div>
              )}
              {movie.vote_count > 0 && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Vote Count</p>
                  <p className="text-white font-semibold text-sm">{movie.vote_count.toLocaleString()}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
}