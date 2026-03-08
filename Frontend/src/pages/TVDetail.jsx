import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTVDetails,
  fetchTVVideos,
  clearSelectedMovie,
} from "../redux/slices/movieSlice";
import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/favoritesSlice";
import { addToWatchlistAction, removeFromWatchlistAction } from "../redux/slices/watchlistSlice";
import { saveToHistory } from "../redux/slices/watchHistoryScroll";
import { TMDB_BACKDROP_BASE, TMDB_IMAGE_BASE } from "../services/tmdb";
import TrailerModal from "../components/models/TrailerModal";
import Loader from "../components/common/Loader";

export default function TVDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedMovie: show, trailerKey, detailLoading } = useSelector(
    (state) => state.movies
  );
  const { items: favorites } = useSelector((state) => state.favorites);
  const { items: watchlist } = useSelector((state) => state.watchlist);

  const isFavorited   = favorites.some((fav) => fav.movieId === String(id));
  const isWatchlisted = watchlist.some((w)   => w.movieId   === String(id));

  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    dispatch(fetchTVDetails(id));
    dispatch(fetchTVVideos(id));
    dispatch(fetchFavorites());
    // watchlist already loaded globally in App.jsx

    return () => dispatch(clearSelectedMovie());
  }, [id, dispatch]);

  useEffect(() => {
    if (show) {
      dispatch(saveToHistory({
        movieId:      String(show.id),
        title:        show.name,
        poster:       show.poster_path || "",
        rating:       show.vote_average,
        release_date: show.first_air_date || "",
        media_type:   "tv",
        watchedAt:    new Date().toISOString(),
      }));
    }
  }, [show, dispatch]);

  if (detailLoading || !show) return <Loader />;

  const backdrop = show.backdrop_path ? `${TMDB_BACKDROP_BASE}${show.backdrop_path}` : null;
  const poster   = show.poster_path   ? `${TMDB_IMAGE_BASE}${show.poster_path}`       : "/placeholder.jpg";
  const rating   = show.vote_average  ? show.vote_average.toFixed(1)                  : "N/A";
  const year     = show.first_air_date ? new Date(show.first_air_date).getFullYear()  : "N/A";
  const genres   = show.genres?.map((g) => g.name) || [];
  const overview = show.overview || "Description not available.";

  const seasons  = show.number_of_seasons  ?? null;
  const episodes = show.number_of_episodes ?? null;
  const status   = show.status  || null;
  const network  = show.networks?.[0]?.name || null;

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      dispatch(removeFromFavorites(String(id)));
    } else {
      dispatch(addToFavorites({
        movieId:      String(id),
        title:        show.name,
        poster:       show.poster_path || "",
        rating:       show.vote_average,
        release_date: show.first_air_date || "",
        media_type:   "tv",
      }));
    }
  };

  const handleWatchlistToggle = () => {
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAction(String(id)));
    } else {
      dispatch(addToWatchlistAction({
        movieId:   String(id),
        title:     show.name,            // ← show only, no movie reference
        poster:    show.poster_path || "",
        mediaType: "tv",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-16">

      {/* Backdrop */}
      <div className="relative w-full h-[55vh]">
        {backdrop
          ? <img src={backdrop} alt={show.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-gray-800" />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-black/50 hover:bg-black/80 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          ← Back
        </button>
        <div className="absolute top-5 right-5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          📺 TV Show
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Poster */}
          <div className="shrink-0">
            <img
              src={poster}
              alt={show.name}
              onError={(e) => { e.target.src = "/placeholder.jpg"; }}
              className="w-48 h-72 object-cover rounded-xl shadow-2xl border border-gray-700"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4">
            <h1 className="text-4xl font-bold text-white mb-2">{show.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-yellow-400 font-semibold">⭐ {rating}</span>
              <span>•</span><span>{year}</span>
              {seasons  && (<><span>•</span><span>{seasons} Season{seasons > 1 ? "s" : ""}</span></>)}
              {episodes && (<><span>•</span><span>{episodes} Episodes</span></>)}
              {status   && (
                <><span>•</span>
                <span className={
                  status === "Returning Series" ? "text-green-400" :
                  status === "Ended"            ? "text-red-400"   : "text-yellow-400"
                }>{status}</span></>
              )}
            </div>

            {network && (
              <p className="text-gray-500 text-sm mb-3">
                📡 Network: <span className="text-gray-300">{network}</span>
              </p>
            )}

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

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              {seasons && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Seasons</p>
                  <p className="text-white font-semibold text-sm">{seasons}</p>
                </div>
              )}
              {episodes && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Episodes</p>
                  <p className="text-white font-semibold text-sm">{episodes}</p>
                </div>
              )}
              {show.vote_count > 0 && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-500 text-xs mb-1">Vote Count</p>
                  <p className="text-white font-semibold text-sm">{show.vote_count.toLocaleString()}</p>
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