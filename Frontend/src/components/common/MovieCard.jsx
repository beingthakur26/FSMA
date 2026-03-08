import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_IMAGE_BASE } from "../../services/tmdb";
import { addToWatchlistAction, removeFromWatchlistAction } from "../../redux/slices/watchlistSlice";

export default function MovieCard({ item }) {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { items: watchlist } = useSelector((state) => state.watchlist);

  const title  = item.title || item.name || "Untitled";
  const date   = item.release_date || item.first_air_date || "";
  const year   = date ? new Date(date).getFullYear() : "N/A";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const type   = item.media_type === "tv" ? "TV" : "Movie";

  const poster = item.poster_path
    ? `${TMDB_IMAGE_BASE}${item.poster_path}`
    : "/placeholder.jpg";

  const movieId       = String(item.id);
  const isWatchlisted = watchlist.some((w) => w.movieId === movieId);

  const handleCardClick = () => {
    const route = item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
    navigate(route);
  };

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); // prevent navigating to detail page
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAction(movieId));
    } else {
      dispatch(addToWatchlistAction({
        movieId,
        title:     item.title || item.name,
        poster:    item.poster_path || "",
        mediaType: item.media_type || "movie",
      }));
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="min-w-[160px] max-w-[160px] cursor-pointer group"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={poster}
          alt={title}
          className="w-full h-[240px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
        />

        {/* Rating badge */}
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">
          ⭐ {rating}
        </div>

        {/* Type badge */}
        <div className="absolute top-2 right-2 bg-blue-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {type}
        </div>

        {/* Watchlist toggle — appears on hover */}
        <button
          onClick={handleWatchlistToggle}
          className={`
            absolute bottom-2 left-1/2 -translate-x-1/2
            opacity-0 group-hover:opacity-100
            text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200
            whitespace-nowrap
            ${isWatchlisted
              ? "bg-green-500/90 text-white hover:bg-red-500/90"
              : "bg-black/80 text-gray-200 hover:bg-blue-600"
            }
          `}
          title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isWatchlisted ? "🔖 Watchlisted" : "+ Watchlist"}
        </button>
      </div>

      <p className="text-white text-sm font-medium mt-2 truncate">{title}</p>
      <p className="text-gray-500 text-xs">{year}</p>
    </div>
  );
}