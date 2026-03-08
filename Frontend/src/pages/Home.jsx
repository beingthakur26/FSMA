import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  fetchTrending,
  fetchPopularMovies,
  fetchMovieVideos,
  clearSelectedMovie,
} from "../redux/slices/movieSlice";
import { addToFavorites, removeFromFavorites, fetchFavorites } from "../redux/slices/favoritesSlice";
import { TMDB_BACKDROP_BASE } from "../services/tmdb";
import MovieCard from "../components/common/MovieCard";
import SkeletonCard from "../components/common/SkeletonCard";
import Loader from "../components/common/Loader";
import TrailerModal from "../components/models/TrailerModal";

// ── Scrollable row with arrow buttons ─────────────────────────────────────────
function MovieRow({ title, items, loading }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 600, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition"
          >
            ‹
          </button>
          <button
            onClick={() => scroll(1)}
            className="bg-gray-800 hover:bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto pb-3 px-4 md:px-8 scrollbar-hide scroll-smooth"
      >
        {loading
          ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => <MovieCard key={item.id} item={item} />)
        }
      </div>
    </section>
  );
}

// ── Hero banner ───────────────────────────────────────────────────────────────
function HeroBanner({ item, trailerKey, onWatchTrailer }) {
  const dispatch = useDispatch();
  const { items: favorites } = useSelector((state) => state.favorites);

  if (!item) return null;

  const backdrop = item.backdrop_path
    ? `${TMDB_BACKDROP_BASE}${item.backdrop_path}`
    : null;

  const title    = item.title || item.name || "Untitled";
  const overview = item.overview || "Description not available.";
  const rating   = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const isFav    = favorites.some((f) => f.movieId === String(item.id));

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFromFavorites(String(item.id)));
    } else {
      dispatch(addToFavorites({
        movieId:      String(item.id),
        title:        item.title || item.name,
        poster:       item.poster_path || "",
        rating:       item.vote_average,
        release_date: item.release_date || item.first_air_date || "",
        media_type:   item.media_type || "movie",
      }));
    }
  };

  return (
    <div className="relative w-full h-[70vh] mb-12 overflow-hidden">
      {backdrop
        ? <img src={backdrop} alt={title} className="w-full h-full object-cover object-top" />
        : <div className="w-full h-full bg-gray-800" />
      }

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
        <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-2 block">
          🔥 Trending Today
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400 text-sm font-semibold">⭐ {rating}</span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-5">
          {overview}
        </p>
        <div className="flex gap-3">
          {/* ✅ Now opens TrailerModal instead of navigating */}
          <button
            onClick={onWatchTrailer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition flex items-center gap-2"
          >
            ▶ Watch Trailer
          </button>
          <button
            onClick={handleFavorite}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition border ${
              isFav
                ? "bg-red-600/30 border-red-500 text-red-400 hover:bg-red-600/50"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
          >
            {isFav ? "❤️ Favorited" : "+ Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Home page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const dispatch = useDispatch();
  const { trending, popular, loading, trailerKey } = useSelector((state) => state.movies);
  const [showTrailer, setShowTrailer] = useState(false);

  const heroItem = trending[0];
  const heroId   = heroItem?.id;
  const heroType = heroItem?.media_type;

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopularMovies());
    dispatch(fetchFavorites());
    return () => dispatch(clearSelectedMovie());
  }, [dispatch]);

  // ✅ Fetch trailer key for hero item once trending loads
  useEffect(() => {
    if (heroId && heroType !== "person") {
      dispatch(fetchMovieVideos(heroId));
    }
  }, [heroId, heroType, dispatch]);

  if (loading && trending.length === 0) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 pt-16">
      <HeroBanner
        item={heroItem}
        trailerKey={trailerKey}
        onWatchTrailer={() => setShowTrailer(true)}
      />

      <div className="pb-16">
        <MovieRow title="🔥 Trending Now"   items={trending} loading={loading} />
        <MovieRow title="🎬 Popular Movies" items={popular}  loading={loading} />
      </div>

      {/* ✅ Trailer modal wired correctly */}
      {showTrailer && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}