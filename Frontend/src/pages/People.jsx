import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPopularPeople,
  getPersonDetails,
  getPersonMovieCredits,
  TMDB_IMAGE_BASE,
  TMDB_PROFILE_BASE
} from "../services/tmdb";

import SkeletonCard from "../components/common/SkeletonCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";



function PersonCard({ person, onClick }) {
  const photo =
    person.profile_path
      ? `${TMDB_PROFILE_BASE}${person.profile_path}`
      : "/placeholder.jpg";

  const knownFor = person.known_for
    ?.map((k) => k.title || k.name)
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  return (
    <div onClick={() => onClick(person)} className="cursor-pointer group text-center">
      <div className="relative overflow-hidden rounded-2xl mb-3">
        <img
          src={photo}
          alt={person.name}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
          className="w-full h-[220px] object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-semibold bg-blue-600/80 px-3 py-1 rounded-full">
            View Profile
          </span>
        </div>
      </div>

      <p className="text-white font-semibold text-sm truncate">{person.name}</p>

      {knownFor && (
        <p className="text-gray-500 text-xs mt-0.5 truncate px-1">{knownFor}</p>
      )}

      <p className="text-blue-400 text-xs mt-0.5">
        {person.known_for_department}
      </p>
    </div>
  );
}



function PersonModal({ person, onClose }) {
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const [detRes, credRes] = await Promise.all([
          getPersonDetails(person.id),
          getPersonMovieCredits(person.id),
        ]);

        setDetails(detRes.data);

        const sorted = credRes.data.cast
          .sort((a, b) => b.popularity - a.popularity)
          .filter((m) => m.poster_path);

        setCredits(sorted);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [person.id]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const photo = details?.profile_path
    ? `${TMDB_IMAGE_BASE}${details.profile_path}`
    : "/placeholder.jpg";

  const birthday = details?.birthday
    ? new Date(details.birthday).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const age =
    details?.birthday && !details?.deathday
      ? Math.floor((new Date() - new Date(details.birthday)) / 31557600000)
      : null;

  const bio = details?.biography || "Biography not available.";

  const visibleMovies = credits.slice(0, visibleCount);
  const hasMore = visibleCount < credits.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="sticky top-0 flex justify-end p-3 bg-gray-900/90">
          <button
            onClick={onClose}
            className="bg-black/60 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="px-6 pb-6">

            {/* Person info */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <img
                src={photo}
                alt={details?.name}
                className="w-36 h-48 object-cover rounded-xl border border-gray-700"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  {details?.name}
                </h2>

                <p className="text-blue-400 text-sm mb-3">
                  {details?.known_for_department}
                </p>

                <div className="text-sm text-gray-400 space-y-1 mb-4">
                  {birthday && (
                    <p>
                      🎂 Born:
                      <span className="text-gray-300 ml-1">
                        {birthday}
                        {age ? ` (${age} yrs)` : ""}
                      </span>
                    </p>
                  )}

                  {details?.place_of_birth && (
                    <p>📍 {details.place_of_birth}</p>
                  )}

                  {details?.deathday && (
                    <p>✝️ Died: {details.deathday}</p>
                  )}

                  {credits.length > 0 && (
                    <p>🎬 {credits.length} movie credits</p>
                  )}
                </div>

                <p className="text-gray-400 text-sm line-clamp-4">{bio}</p>
              </div>
            </div>

            {/* Movies */}
            {credits.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">
                  🎬 Known For
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {visibleMovies.map((movie) => {
                    const poster = `${TMDB_IMAGE_BASE}${movie.poster_path}`;

                    return (
                      <div
                        key={movie.id}
                        onClick={() => {
                          navigate(`/movie/${movie.id}`);
                          onClose();
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          src={poster}
                          alt={movie.title}
                          className="w-full h-[150px] object-cover rounded-lg"
                        />

                        <p className="text-gray-300 text-xs mt-1 truncate">
                          {movie.title}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {hasMore && (
                  <button
                    onClick={() => setVisibleCount((p) => p + 8)}
                    className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl"
                  >
                    Show More
                  </button>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}



export default function People() {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const hasMore = page < totalPages;

  const loadPeople = async (pageNum) => {
    setLoading(true);

    try {
      const res = await getPopularPeople(pageNum);

      setPeople((prev) => {
        const ids = new Set(prev.map((p) => p.id));

        return [
          ...prev,
          ...res.data.results.filter((p) => !ids.has(p.id)),
        ];
      });

      setPage(res.data.page);
      setTotalPages(res.data.total_pages);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople(1);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) loadPeople(page + 1);
  }, [loading, hasMore, page]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <div className="min-h-screen bg-gray-950">

      <div className="max-w-7xl mx-auto pt-24 px-4 pb-16">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">🎭 People</h1>
          <p className="text-gray-400 text-sm">
            Popular actors, directors and crew
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={setSelectedPerson}
            />
          ))}

          {loading &&
            Array(10)
              .fill(0)
              .map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
        </div>

        {hasMore && <div ref={sentinelRef} className="h-10 mt-6" />}

        {selectedPerson && (
          <PersonModal
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
          />
        )}

      </div>
    </div>
  );
}