import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const VerticalCards = ({ data, title }) => {
  if (!data || !Array.isArray(data)) {
    return <div className="text-gray-400 text-center py-10">Loading...</div>;
  }

  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    18: 'Drama',
    14: 'Fantasy',
    27: 'Horror',
    10749: 'Romance',
    878: 'Sci-Fi',
  };

  // Group data by genre IDs
  const genreSections = Object.entries(genreMap).map(([id, name]) => {
    const filtered = data.filter((item) =>
      item.genre_ids?.includes(Number(id))
    );
    return { id, name, items: filtered };
  });

  return (
    <div className="w-full py-10 px-4 flex flex-col gap-16 overflow-y-auto">
      {genreSections.map(
        (section) =>
          section.items.length > 0 && (
            <div
              key={section.id}
              className="w-full flex flex-col gap-6 scroll-mt-20"
            >
              {/* Section Title */}
              <h2 className="text-3xl font-bold text-white tracking-wide mb-2">
                {section.name}
              </h2>

              {/* Horizontal Scroll Row */}
              <div
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {section.items.map((item) => {
                  const isPerson = item.media_type === 'person';
                  const imageSrc =
                    !item.backdrop_path && !item.poster_path && !item.profile_path
                      ? noimage
                      : `https://image.tmdb.org/t/p/w500/${
                          item.backdrop_path ||
                          item.poster_path ||
                          item.profile_path
                        }`;

                  const year =
                    item.release_date?.split('-')[0] ||
                    item.first_air_date?.split('-')[0] ||
                    '—';
                  const rating = item.vote_average
                    ? item.vote_average.toFixed(1)
                    : 'N/A';
                  const genres = item.genre_ids
                    ?.map((id) => genreMap[id])
                    .filter(Boolean)
                    .join(', ') || 'N/A';

                  return (
                    <Link
                      to={`/${item.media_type || title}/details/${item.id}`}
                      key={item.id}
                      className={`relative bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out snap-start shrink-0 ${
                        isPerson
                          ? 'w-[180px] h-[280px]'
                          : 'w-[260px] h-[400px] md:w-[300px] md:h-[420px]'
                      }`}
                    >
                      {/* Poster / Image */}
                      <img
                        src={imageSrc}
                        alt={item.title || item.name}
                        className="w-full h-[90%] object-cover"
                      />

                      {/* Hover Overlay */}
                      {!isPerson && (
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <p className="text-sm text-gray-300">⭐ {rating}</p>
                          <p className="text-sm text-gray-300">📅 {year}</p>
                          <p className="text-sm text-gray-300">🎭 {genres}</p>
                        </div>
                      )}

                      {/* Title Only */}
                      <div className="p-2">
                        <h1 className="text-lg font-semibold text-white truncate">
                          {item.title || item.name || item.original_name}
                        </h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default VerticalCards;
