import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchResults, clearSearch, setQuery } from "../redux/slices/searchSlice";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/search/SearchBar";
import SkeletonCard from "../components/common/SkeletonCard";
import { TMDB_IMAGE_BASE } from "../services/tmdb";

function PersonCard({ item }) {
  const photo = item.profile_path ? `${TMDB_IMAGE_BASE}${item.profile_path}` : "/placeholder.jpg";
  return (
    <div className="flex flex-col items-center text-center cursor-pointer group">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-blue-500 transition">
        <img src={photo} alt={item.name}
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="text-white text-sm font-medium mt-2 w-[130px] truncate">{item.name}</p>
      <p className="text-gray-500 text-xs">Person</p>
    </div>
  );
}

function ResultCard({ item }) {
  const navigate = useNavigate();
  if (item.media_type === "person") return <PersonCard item={item} />;

  const title  = item.title || item.name || "Untitled";
  const date   = item.release_date || item.first_air_date || "";
  const year   = date ? new Date(date).getFullYear() : "N/A";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const type   = item.media_type === "tv" ? "TV" : "Movie";
  const poster = item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : "/placeholder.jpg";

  return (
    <div onClick={() => navigate(item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`)}
      className="cursor-pointer group">
      <div className="relative overflow-hidden rounded-xl">
        <img src={poster} alt={title}
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
          className="w-full h-[220px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full">⭐ {rating}</div>
        <div className="absolute top-2 right-2 bg-blue-600/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full">{type}</div>
      </div>
      <p className="text-white text-sm font-medium mt-2 truncate">{title}</p>
      <p className="text-gray-500 text-xs">{year}</p>
    </div>
  );
}

export default function SearchResults() {
  const dispatch = useDispatch();
  const { query, results, loading, error } = useSelector((state) => state.search);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) dispatch(fetchSearchResults(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  useEffect(() => { return () => dispatch(clearSearch()); }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto pt-24 px-4 pb-16">
        <div className="max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Search</h1>
          <SearchBar />
        </div>
        {error && <p className="text-red-400 text-center text-sm mb-6">{error}</p>}
        {!query && !loading && (
          <div className="text-center mt-16">
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-gray-400 text-lg">Search for movies, TV shows, or people</p>
          </div>
        )}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {!loading && results.length > 0 && (
          <>
            <p className="text-gray-400 text-sm mb-5">
              Found <span className="text-white font-semibold">{results.length}</span> results for{" "}
              <span className="text-blue-400 font-semibold">"{query}"</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {results.map((item) => <ResultCard key={`${item.media_type}-${item.id}`} item={item} />)}
            </div>
          </>
        )}
        {!loading && query && results.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-white text-lg font-semibold">No results found</p>
            <p className="text-gray-500 text-sm mt-1">Try a different keyword</p>
          </div>
        )}
      </div>
    </div>
  );
}