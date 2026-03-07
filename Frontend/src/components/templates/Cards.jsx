import React from 'react'
import noimage from '/noimage.jpg'
import { Link } from 'react-router-dom'

// 🎭 Genre ID to Name mapping (TMDB official genre IDs)
const GENRE_MAP = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
}

const Cards = ({ data, title }) => {
  if (!data || !Array.isArray(data)) {
    // 🦴 Animated Skeleton Loader
    return (
      <div className="w-full p-4 flex justify-center flex-wrap gap-10">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-72 h-[56vh] bg-[#1c1c1f] animate-pulse rounded-xl"
            ></div>
          ))}
      </div>
    )
  }

  return (
    <div className="w-full bg-[#0D0D0F] p-4 flex justify-center flex-wrap gap-10 rounded-md">
      {data.map((item, index) => {
        const isPerson = item.media_type === 'person'
        const showOverlay = !isPerson // no overlay for people

        const imageSrc =
          !item.backdrop_path && !item.poster_path && !item.profile_path
            ? noimage
            : `https://image.tmdb.org/t/p/w500/${
                item.backdrop_path || item.poster_path || item.profile_path
              }`

        // 🎬 Get first two genres as names
        const genres =
          item.genre_ids && item.genre_ids.length > 0
            ? item.genre_ids
                .slice(0, 2)
                .map((id) => GENRE_MAP[id] || 'Unknown')
                .join(', ')
            : 'N/A'

        const rating = item.vote_average
          ? item.vote_average.toFixed(1)
          : 'N/A'

        const year = item.release_date
          ? item.release_date.slice(0, 4)
          : item.first_air_date
          ? item.first_air_date.slice(0, 4)
          : 'N/A'

        return (
          <Link
            to={`/${item.media_type || title}/details/${item.id}`}
            key={index}
            className={`relative w-72 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer ${
              isPerson ? 'h-[40vh]' : 'h-[56vh]'
            }`}
          >
            {/* Image */}
            <div
              className={`relative w-full rounded-lg overflow-hidden ${
                isPerson ? 'h-60' : 'h-[50vh]'
              }`}
            >
              <img
                src={imageSrc}
                alt={item.title || item.name || item.original_name}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* 🩶 Hover Overlay (only for movies/tv) */}
              {showOverlay && (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-zinc-100 text-sm space-y-1">
                    <p>
                      ⭐ <span className="font-semibold text-[#6556CD]">Rating:</span> {rating}
                    </p>
                    <p>
                      🎭 <span className="font-semibold text-[#6556CD]">Genre:</span> {genres}
                    </p>
                    <p>
                      📅 <span className="font-semibold text-[#6556CD]">Year:</span> {year}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl text-zinc-200 font-semibold mt-2 hover:text-[#6556CD] truncate">
              {item.title || item.name || item.original_name}
            </h1>
          </Link>
        )
      })}
    </div>
  )
}

export default Cards


// import React from 'react'
// import noimage from '/noimage.jpg'
// import { Link } from 'react-router-dom';

// const Cards = ({ data, title }) => {
//   if (!data || !Array.isArray(data)) {
//     return <div className="text-gray-400 text-center">Loading...</div>;
//   }
//   return (
//     <div className='w-full bg-[#0D0D0F] p-4 flex justify-center flex-wrap gap-10 rounded-md'>
//       {data.map((item, index) => {
//         const isPerson = item.media_type === "person";
//         const imageSrc =
//           !item.backdrop_path && !item.poster_path && !item.profile_path
//             ? noimage
//             : `https://image.tmdb.org/t/p/w500/${
//                 item.backdrop_path || item.poster_path || item.profile_path
//               }`;

//         return (
//           <Link to={`/${item.media_type || title}/details/${item.id}`}
//             key={index}
//             className={`w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer ${
//               isPerson ? "h-[40vh]" : "h-[56vh]"
//             }`}
//           >
//             <div
//               className={`image w-full rounded-lg bg-blue-500 overflow-hidden ${
//                 isPerson ? "h-60" : "h-[50vh]"
//               }`}
//             >
//               <img
//                 src={imageSrc}
//                 alt={item.title || item.name || item.original_name}
//                 className="w-full h-full object-cover rounded mb-3"
//               />
//             </div>

//             <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
//               {item.title || item.name || item.original_name}
//             </h1>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default Cards;