// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { asyncLoadtv, removetv } from '../store/actions/tvActions'
// import { Link, useParams, useNavigate } from 'react-router-dom'
// import noimage from '/noimage.jpg'

// const TvDetail = () => {
//   const { info } = useSelector((state) => state.tv)
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(asyncLoadtv(id))
//     return () => {
//       dispatch(removetv())
//     }
//   }, [id])

//   return info ? (
//     <div className="pb-10 w-screen text-white px-[3%] py-[0.5%] bg-[#0D0D0F]">

//       {/* Navigation */}
//       <nav className="w-full flex items-center justify-between text-2xl">
//         <i
//           onClick={() => navigate(-1)}
//           className="ri-arrow-left-line text-4xl text-center text-zinc-300 hover:text-[#6556CD]"
//         ></i>

//         <div className="flex items-center justify-between w-[20%]">
//           {info.detail.homepage && (
//             <a target="_blank" href={info.detail.homepage}>
//               <i className="ri-home-5-line"></i>
//             </a>
//           )}
//           {info.external_id?.wikidata_id && (
//             <a target="_blank" href={`https://www.wikidata.org/wiki/${info.external_id.wikidata_id}`}>
//               <i className="ri-global-line"></i>
//             </a>
//           )}
//           {info.external_id?.imdb_id && (
//             <a target="_blank" href={`https://www.imdb.com/title/${info.external_id.imdb_id}`}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="64"
//                 height="32"
//                 viewBox="0 0 64 32"
//                 version="1.1"
//               >
//                 <g fill="#F5C518">
//                   <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
//                 </g>
//                 <g
//                   transform="translate(8.000000, 7.000000)"
//                   fill="#000000"
//                   fillRule="nonzero"
//                 >
//                   <polygon points="0 18 5 18 5 0 0 0"></polygon>
//                   <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
//                   <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
//                   <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z"></path>
//                 </g>
//               </svg>
//             </a>
//           )}
//         </div>
//       </nav>

//       {/* Title and Info */}
//       <div className="pb-2">
//         <h1 className="text-5xl text-zinc-200 font-black ">
//           {info.detail.name || info.detail.original_name}
//         </h1>

//         <div className="flex gap-2 text-sm font-semibold text-zinc-300 pt-2">
//           <h4>{info.detail.first_air_date?.split("-")[0]}</h4> | 
//           <h4>{info.content_rating || "PG-13"}</h4> | 
//           <h4>{info.detail.number_of_seasons} Seasons</h4>
//         </div>
//       </div>

//       {/* Poster + Trailer */}
//       <div className="flex w-full gap-1 pb-2">
//         <div className="image w-70 rounded-lg overflow-hidden h-[55vh]">
//           <img
//             src={`https://image.tmdb.org/t/p/w500/${
//               info.detail.poster_path || info.detail.backdrop_path
//             }`}
//             alt=""
//             className="w-full h-full object-cover rounded mb-3"
//           />
//         </div>

//         <div className="w-[55vw] rounded-md">
//           {info.video && info.video.key ? (
//             <iframe
//               src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&mute=1&loop=1&playlist=${info.video.key}`}
//               title={info.video.name || "Trailer"}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-[55vh] rounded-md bg-blue-700"
//             ></iframe>
//           ) : (
//             <div className="w-full h-[55vh] rounded-md flex items-center justify-center bg-zinc-900/60 text-zinc-400 text-lg">
//               No trailer available
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Genres + Platforms */}
//       <div className="flex items-center justify-between w-[73.5vw]">
//         <div className="flex flex-wrap gap-2 mt-2">
//           {info.detail.genres?.map((genre) => (
//             <span
//               key={genre.id}
//               className="px-3 py-1 text-sm rounded-full text-gray-200 border border-gray-700 hover:bg-gray-800"
//             >
//               {genre.name}
//             </span>
//           ))}
//         </div>

//         <div className="mt-4 flex gap-3 gap-y-5">
//           {info.watch_provider?.flatrate && (
//             <div className="flex gap-3">
//               {info.watch_provider.flatrate.map((w, id) => (
//                 <img
//                   key={id}
//                   className="w-[6vh] h-[6vh] object-cover rounded-md mb-1"
//                   src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
//                   title={w.provider_name}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Overview */}
//       <p className="w-[57vw] text-md text-zinc-300 font-semibold">
//         {info.detail.overview}
//       </p>

//       {/* Similar Shows */}
//       <div className="mt-10 pb-10">
//         <h1 className="text-3xl font-bold text-zinc-200 mb-4">Similar Shows</h1>

//         {info.similar && info.similar.length > 0 ? (
//           <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md ">
//             {info.similar.map((tv, index) => (
//               <Link
//                 to={`/tv/details/${tv.id}`}
//                 key={index}
//                 className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
//               >
//                 <div className="image w-full rounded-lg overflow-hidden h-[50vh]">
//                   <img
//                     src={
//                       tv.poster_path
//                         ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
//                         : noimage
//                     }
//                     alt={tv.name}
//                     className="w-full h-full object-cover rounded mb-3"
//                   />
//                 </div>
//                 <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
//                   {tv.name}
//                 </h1>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-zinc-400 text-sm">No similar shows found.</p>
//         )}
//       </div>

//       {/* Recommended Shows */}
//       <div className="mt-10 pb-10">
//         <h1 className="text-3xl font-bold text-zinc-200 mb-4">Recommended Shows</h1>

//         {info.recommendations && info.recommendations.length > 0 ? (
//           <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md">
//             {info.recommendations.map((tv, index) => (
//               <Link
//                 to={`/tv/details/${tv.id}`}
//                 key={index}
//                 className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
//               >
//                 <div className="image w-full rounded-lg overflow-hidden h-[50vh]">
//                   <img
//                     src={
//                       tv.poster_path
//                         ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
//                         : noimage
//                     }
//                     alt={tv.name}
//                     className="w-full h-full object-cover rounded mb-3"
//                   />
//                 </div>
//                 <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
//                   {tv.name}
//                 </h1>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-zinc-400 text-sm">No recommended shows found.</p>
//         )}
//       </div>
//     </div>
//   ) : (
//     <h1 className="text-2xl p-4 text-white w-full h-screen">Loading......</h1>
//   )
// }

// export default TvDetail



import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadtv, removetv } from '../store/actions/tvActions'
import { Link, useParams, useNavigate } from 'react-router-dom'
import noimage from '/noimage.jpg'

const TvDetail = () => {
  const { info } = useSelector((state) => state.tv)
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLoadtv(id))
    return () => {
      dispatch(removetv())
    }
  }, [id])

  return info ? (
    <div className="pb-10 w-screen text-white px-[3%] py-[0.5%] bg-[#0D0D0F]">

      {/* Navigation */}
      <nav className="w-full flex items-center justify-between text-2xl">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-4xl text-center text-zinc-300 hover:text-[#6556CD] cursor-pointer"
        ></i>

        <div className="flex items-center justify-between w-[20%]">
          {info.detail.homepage && (
            <a target="_blank" href={info.detail.homepage}>
              <i className="ri-home-5-line"></i>
            </a>
          )}
          {info.external_id?.wikidata_id && (
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.external_id.wikidata_id}`}>
              <i className="ri-global-line"></i>
            </a>
          )}
          {info.external_id?.imdb_id && (
            <a target="_blank" href={`https://www.imdb.com/title/${info.external_id.imdb_id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="32"
                viewBox="0 0 64 32"
                version="1.1"
              >
                <g fill="#F5C518">
                  <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                </g>
                <g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero">
                  <polygon points="0 18 5 18 5 0 0 0"></polygon>
                  <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                  <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                  <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z"></path>
                </g>
              </svg>
            </a>
          )}
        </div>
      </nav>

      {/* Title and Info */}
      <div className="pb-2">
        <h1 className="text-5xl text-zinc-200 font-black ">
          {info.detail.name || info.detail.original_name}
        </h1>

        <div className="flex gap-2 text-sm font-semibold text-zinc-300 pt-2">
          <h4>{info.detail.first_air_date?.split('-')[0]}</h4> | 
          <h4>{info.content_rating || 'PG-13'}</h4> | 
          <h4>{info.detail.number_of_seasons} Seasons</h4>
        </div>
      </div>

      {/* Poster + Trailer */}
      <div className="flex w-full gap-1 pb-2">
        <div className="image w-70 rounded-lg overflow-hidden h-[55vh]">
          <img
            src={`https://image.tmdb.org/t/p/w500/${info.detail.poster_path || info.detail.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover rounded mb-3"
          />
        </div>

        <div className="w-[55vw] rounded-md">
          {info.video && info.video.key ? (
            <iframe
              src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&mute=1&loop=1&playlist=${info.video.key}`}
              title={info.video.name || 'Trailer'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[55vh] rounded-md bg-blue-700"
            ></iframe>
          ) : (
            <div className="w-full h-[55vh] rounded-md flex items-center justify-center bg-zinc-900/60 text-zinc-400 text-lg">
              No trailer available
            </div>
          )}
        </div>
      </div>

      {/* Genres + Platforms */}
      <div className="flex items-center justify-between w-[73.5vw]">
        <div className="flex flex-wrap gap-2 mt-2">
          {info.detail.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 text-sm rounded-full text-gray-200 border border-gray-700 hover:bg-gray-800"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="mt-4 flex gap-3 gap-y-5">
          {info.watch_provider?.flatrate && (
            <div className="flex gap-3">
              {info.watch_provider.flatrate.map((w, id) => (
                <img
                  key={id}
                  className="w-[6vh] h-[6vh] object-cover rounded-md mb-1"
                  src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                  title={w.provider_name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overview */}
      <p className="w-[57vw] text-md text-zinc-300 font-semibold mt-2">
        {info.detail.overview}
      </p>

      {/* 🌟 Seasons Section */}
      {info.detail.seasons && info.detail.seasons.length > 0 && (
        <div className="mt-10 pb-10">
          <h1 className="text-3xl font-bold text-zinc-200 mb-4">Seasons</h1>

          <div className="w-full p-4 flex flex-wrap justify-start gap-6 rounded-md">
            {info.detail.seasons.map((season, index) => (
              <div
                key={index}
                className="w-40 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer"
              >
                <div className="w-full h-60 rounded-lg overflow-hidden bg-zinc-900">
                  <img
                    src={
                      season.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                        : noimage
                    }
                    alt={season.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-2">
                  <h1 className="text-base text-zinc-200 font-semibold leading-tight hover:text-[#6556CD] line-clamp-2">
                    {season.name}
                  </h1>
                  <p className="text-xs text-zinc-400 mt-1">
                    {season.air_date ? season.air_date.split('-')[0] : 'N/A'} • {season.episode_count} eps
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Similar Shows */}
      <div className="mt-10 pb-10">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">Similar Shows</h1>
        {info.similar && info.similar.length > 0 ? (
          <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md">
            {info.similar.map((tv, index) => (
              <Link
                to={`/tv/details/${tv.id}`}
                key={index}
                className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
              >
                <div className="image w-full rounded-lg overflow-hidden h-[50vh]">
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                        : noimage
                    }
                    alt={tv.name}
                    className="w-full h-full object-cover rounded mb-3"
                  />
                </div>
                <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
                  {tv.name}
                </h1>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm">No similar shows found.</p>
        )}
      </div>

      {/* Recommended Shows */}
      <div className="mt-10 pb-10">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">Recommended Shows</h1>
        {info.recommendations && info.recommendations.length > 0 ? (
          <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md">
            {info.recommendations.map((tv, index) => (
              <Link
                to={`/tv/details/${tv.id}`}
                key={index}
                className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
              >
                <div className="image w-full rounded-lg overflow-hidden h-[50vh]">
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
                        : noimage
                    }
                    alt={tv.name}
                    className="w-full h-full object-cover rounded mb-3"
                  />
                </div>
                <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
                  {tv.name}
                </h1>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm">No recommended shows found.</p>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-2xl p-4 text-white w-full h-screen">Loading......</h1>
  )
}

export default TvDetail
