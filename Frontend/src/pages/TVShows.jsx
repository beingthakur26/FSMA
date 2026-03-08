import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTVPage, resetTVList } from "../redux/slices/movieSlice";
import { getTVGenres, getTVByGenre } from "../services/tmdb";
import MovieCard from "../components/common/MovieCard";
import SkeletonCard from "../components/common/SkeletonCard";
import GenreFilter from "../components/common/GenreFilter";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function TVShows() {
  const dispatch = useDispatch();
  const { tvList, tvPage, tvTotalPages, tvLoading, error } =
    useSelector((state) => state.movies);

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreShows, setGenreShows] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [genreTotal, setGenreTotal] = useState(1);
  const [genreLoading, setGenreLoading] = useState(false);

  const hasMore = selectedGenre
    ? genrePage < genreTotal
    : tvPage < tvTotalPages;

  useEffect(() => {
    getTVGenres().then((res) => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    dispatch(resetTVList());
    dispatch(fetchTVPage(1));
    return () => dispatch(resetTVList());
  }, [dispatch]);

  const loadGenre = async (genreId, page = 1) => {
    setGenreLoading(true);
    try {
      const res = await getTVByGenre(genreId, page);
      if (page === 1) {
        setGenreShows(res.data.results);
      } else {
        setGenreShows((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          return [...prev, ...res.data.results.filter((m) => !ids.has(m.id))];
        });
      }
      setGenrePage(res.data.page);
      setGenreTotal(res.data.total_pages);
    } finally {
      setGenreLoading(false);
    }
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setGenreShows([]);
    setGenrePage(1);
    if (genreId) loadGenre(genreId, 1);
  };

  const loadMore = useCallback(() => {
    if (selectedGenre) {
      if (!genreLoading && genrePage < genreTotal) {
        loadGenre(selectedGenre, genrePage + 1);
      }
    } else {
      if (!tvLoading && tvPage < tvTotalPages) {
        dispatch(fetchTVPage(tvPage + 1));
      }
    }
  }, [selectedGenre, genreLoading, genrePage, genreTotal, tvLoading, tvPage, tvTotalPages]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  const displayList = selectedGenre ? genreShows : tvList;
  const isLoading = selectedGenre ? genreLoading : tvLoading;

  return (
    <div className="min-h-screen bg-gray-950 pt-24 px-4 max-w-7xl mx-auto pb-16">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">📺 TV Shows</h1>
        <p className="text-gray-400 text-sm mt-1">
          {displayList.length} shows loaded
        </p>
      </div>

      <GenreFilter
        genres={genres}
        selectedId={selectedGenre}
        onSelect={handleGenreSelect}
      />

      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {displayList.map((item) => (
          <MovieCard key={item.id} item={{ ...item, media_type: "tv" }} />
        ))}
        {isLoading &&
          Array(10).fill(0).map((_, i) => <SkeletonCard key={`sk-${i}`} />)
        }
      </div>

      {hasMore && <div ref={sentinelRef} className="h-10 mt-6" />}

      {!hasMore && displayList.length > 0 && (
        <p className="text-center text-gray-600 text-sm mt-10">
          You've reached the end 📺
        </p>
      )}
    </div>
  );
}