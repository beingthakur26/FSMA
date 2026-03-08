import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending, fetchPopularMovies } from "../redux/slices/movieSlice";
import { TMDB_BACKDROP_BASE } from "../services/tmdb";
import MovieCard from "../components/common/MovieCard";
import SkeletonCard from "../components/common/SkeletonCard";
import Loader from "../components/common/Loader";

// Horizontal scroll row
function MovieRow({ title, items, loading }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {loading
          ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : items.map((item) => <MovieCard key={item.id} item={item} />)
        }
      </div>
    </section>
  );
}

// Hero banner using first trending item
function HeroBanner({ item }) {
  if (!item) return null;

  const backdrop = item.backdrop_path
    ? `${TMDB_BACKDROP_BASE}${item.backdrop_path}`
    : null;

  const title = item.title || item.name || "Untitled";
  const overview = item.overview || "Description not available.";

  return (
    <div className="relative w-full h-[70vh] mb-12 rounded-2xl overflow-hidden">
      {backdrop ? (
        <img
          src={backdrop}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-800" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
        <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2 block">
          🔥 Trending Today
        </span>
        <h1 className="text-4xl font-bold text-white mb-3 leading-tight">{title}</h1>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{overview}</p>
        <div className="flex gap-3 mt-5">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition">
            ▶ Watch Trailer
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition">
            + Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const { trending, popular, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading && trending.length === 0) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 px-4 max-w-7xl mx-auto">
      <HeroBanner item={trending[0]} />
      <MovieRow title="🔥 Trending Now" items={trending} loading={loading} />
      <MovieRow title="🎬 Popular Movies" items={popular} loading={loading} />
    </div>
  );
}