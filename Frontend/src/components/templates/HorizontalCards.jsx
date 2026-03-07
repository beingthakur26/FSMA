import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/noimage.jpg';

const HorizontalCards = ({ data, title }) => {
  if (!data || !Array.isArray(data)) {
    return <div className="text-gray-400 text-center">Loading...</div>;
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

  return (
    <div className="w-full py-5 px-4">
      <div className="w-full flex flex-wrap justify-start gap-6 overflow-y-hidden">
        {data.map((item) => {
          const isPerson = item.media_type === 'person';
          const imageSrc =
            !item.backdrop_path && !item.poster_path && !item.profile_path
              ? noimage
              : `https://image.tmdb.org/t/p/w500/${
                  item.backdrop_path || item.poster_path || item.profile_path
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
              className={`relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 duration-300 ${
                isPerson ? 'w-[180px] h-[280px]' : 'w-[260px] h-[380px]'
              }`}
            >
              {/* Image */}
              <img
                src={imageSrc}
                alt={item.title || item.name}
                className="w-full h-[80%] object-cover"
              />

              {/* Hover Overlay */}
              {!isPerson && (
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 bottom-[20%]">
                  <p className="text-sm text-gray-300">⭐ Rating: {rating}</p>
                  <p className="text-sm text-gray-300">📅 Year: {year}</p>
                  <p className="text-sm text-gray-300">🎭 Genre: {genres}</p>
                </div>
              )}

              {/* Title below card */}
              <div className="p-2">
                <h1 className="text-xl font-semibold text-white truncate">
                  {item.title || item.name || item.original_name}
                </h1>
                {item.media_type === 'movie' || item.media_type === 'tv' ? (
                  <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
                    {item.overview || 'No description available.'}
                  </p>
                ) : isPerson ? (
                  <p className="text-zinc-400 text-xs">
                    {item.known_for_department}
                  </p>
                ) : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCards;






// import React from 'react'
// import { Link } from 'react-router-dom'
// import Dropdown from './Dropdown'

// const HorizontalCards = ({ data }) => {
//   return (
//     <div className='w-full py-5 px-2'>
//         <div className=' w-full flex h-[55vh] gap-6 overflow-y-hidden '>
//             {data && data.map((item) => {
//                 const isPerson = item.media_type === "person";
//             return (
//                 <Link
//                     to={`/${item.media_type || title}/details/${item.id}`}
//                     key={item.id} 
//                     className={`px-1 min-w-[20%] bg-zinc-900 flex flex-col hover:scale-105 duration-300 cursor-pointer
//                         ${isPerson ? "h-[32vh]" : "h-[50vh]"}`} 
//                 >
//                     <img 
//                         src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path || item.profile_path}`} alt={item.title} 
//                         className={`w-full object-cover rounded mb-3 ${isPerson ? "h-[75%]" : "h-[40%]"}`} 
//                     />

//                     <h1 className='text-lg font-bold text-white '> 
//                         {item.title || item.name || item.original_name }
//                     </h1>
//                     {item.media_type === "movie" || item.media_type === "tv" ? (
//                         <p className="text-zinc-200 mt-1 text-xs">
//                         {item.overview}
//                         <span
//                             className="text-zinc-400 hover:underline hover:text-[#6556CD] ml-1"
//                         >
//                             Read More
//                         </span>
//                         </p>
//                     ) : isPerson ? (
//                         <p className="text-zinc-300 text-[0.7rem] leading-tight">
//                         {item.known_for_department}
//                         </p>
//                     ) : null}
//                 </Link>
//             )})}
//         </div>
//     </div>
//   )
// }

// export default HorizontalCards