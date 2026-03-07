import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncLoadmovie, removemovie } from '../store/actions/movieActions'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import noimage from '/noimage.jpg'

const MovieDetail = () => {

  const {info} = useSelector((state) => state.movie)
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncLoadmovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [id])

  return info ? (
    <div 
      // style={{
      //       background: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/w500/${info.detail.backdrop_path})`,
      //       backgroundSize: 'cover',
      //       backgroundPosition: 'center',
      // }}
      className='pb-10 w-screen text-white px-[3%] py-[0.5%] bg-[#0D0D0F]'>
      
      {/* Part 1 Navigation */}
      <nav 
        className='w-full flex items-center justify-between text-2xl'
      >
        <i 
          onClick={() => navigate(-1)} 
          className="ri-arrow-left-line text-4xl text-center text-zinc-300 hover:text-[#6556CD]"
        ></i>
        <div className='flex items-center justify-between w-[20%]'>
          <a target="_blank" href={info.detail.homepage}>
            <i className="ri-home-5-line"></i>
          </a>
          <a target="_blank" href={`https://www.wikidata.org/wiki/${info.external_id.wikidata_id}`}>
            <i className="ri-global-line"></i>
          </a>
          <a target="_blank" href={`https://www.imdb.com/title/${info.external_id.imdb_id}`}>
            <svg id="home_img" className="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
          </a>
        </div>
      </nav> 

      {/* Part 2 Poster and Trailer */}
      <div className='pb-2 '>
        <h1 className="text-5xl text-zinc-200 font-black ">
          {info.detail.title || info.detail.name || info.detail.original_name}
        </h1>
        <div className='flex gap-2 text-sm font-semibold text-zinc-300 pt-2'>
          <h4>{info.detail.release_date.split("-")[0]}</h4>{"|"}
          <h4>{info.detail.adult ? "18+" : "PG-13"}</h4> {"|"}
          <h4>{info.detail.runtime}hr</h4>
        </div>
      </div>
      <div className='flex w-full gap-1 pb-2'>
        <div className={`image w-70 rounded-lg overflow-hidden h-[55vh]`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt=""
            className="w-full h-full object-cover rounded mb-3"
          />
        </div>

        <div className="w-[55vw] rounded-md">
          {info.video && info.video.key ? (
            <iframe
              src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&mute=1&loop=1&playlist=${info.video.key}`}
              title={info.video.name || "Trailer"}
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

        {/* <div className="w-[55vw] rounded-md">
          <iframe
            src={`https://www.youtube.com/embed/${info.video.key}?autoplay=1&mute=1&loop=1&playlist=${info.video.key}`}
            title={info.video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[55vh] rounded-md bg-blue-700"
          ></iframe>
        </div> */}
      </div>

      {/* Part 3 Media */}
      <div className='flex items-center justify-between w-[73.5vw]'>
        <div className="flex flex-wrap gap-2 mt-2">
          {info.detail.genres && info.detail.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 text-sm rounded-full  text-gray-200 border border-gray-700 hover:bg-gray-800"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className='mt-4 flex gap-3 gap-y-5'>
              {info.watch_provider && info.watch_provider.flatrate &&
                <div className='flex gap-3 '>
                  {/* <h1 className='text-sm text-zinc-300 font-semibold hover:text-[#6556CD]'>Available on Platforms: </h1> */}
                  {info.watch_provider.flatrate.map((w, id) => (
                  <img key={id}
                  className='w-[6vh] h-[6vh] object-cover rounded-md mb-1' 
                  src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                  title={w.provider_name}
                  ></img>
                  ))}
                </div>
              }
              {info.watch_provider && info.watch_provider.rent &&
                <div className='flex gap-3'>
                  {/* <h1 className='text-sm text-zinc-300 font-semibold hover:text-[#6556CD]'>Available on Rent: </h1> */}
                  {info.watch_provider.rent.map((w, id) => (
                  <img key={id}
                  className='w-[6vh] h-[6vh] object-cover rounded-md mb-1' 
                  src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                  title={w.provider_name}
                  ></img>
                  ))}
                </div>
              }
              {/* {info.watch_provider && info.watch_provider.buy &&
                <div className='flex gap-x-3'>
                  <h1 className='text-sm text-zinc-300 font-semibold hover:text-[#6556CD]'>Available to Buy: </h1>
                  {info.watch_provider.buy.map((w, id) => (
                  <img key={id}
                  className='w-[6vh] h-[6vh] object-cover rounded-md mb-1' 
                  src={`https://image.tmdb.org/t/p/w500/${w.logo_path}`}
                  title={w.provider_name}
                  ></img>
                  ))}
                </div>
              } */}
        </div>
      </div>

      {/* Part 4 Overview */}
      <p className='w-[57vw] text-md text-zinc-300 font-semibold'>
        {info.detail.overview}
      </p>

      {/* Part 5 — Similar Movies */}
      <div className="mt-10 pb-10">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">Similar Movies</h1>

        {info.similar && info.similar.length > 0 ? (
          <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md">
            {info.similar.map((movie, index) => (
              <Link
                to={`/movie/details/${movie.id}`}
                key={index}
                className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
              >
                <div className="image w-full rounded-lg bg-blue-500 overflow-hidden h-[50vh]">
                  <img
                    src={
                      !movie.backdrop_path && !movie.poster_path
                        ? noimage
                        : `https://image.tmdb.org/t/p/w500/${
                            movie.backdrop_path || movie.poster_path
                          }`
                    }
                    alt={movie.title || movie.name || movie.original_name}
                    className="w-full h-full object-cover rounded mb-3"
                  />
                </div>

                <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
                  {movie.title || movie.name || movie.original_name}
                </h1>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm">No similar movies found.</p>
        )}
      </div>

      {/* Part 6 Recommendation Movies */}
      <div className="mt-10 pb-10">
        <h1 className="text-3xl font-bold text-zinc-200 mb-4">
          Recommended Movies
        </h1>

        {info.recommendations && info.recommendations.length > 0 ? (
          <div className="w-full p-4 flex justify-center flex-wrap gap-10 rounded-md">
            {info.recommendations.map((movie, index) => {
              const imageSrc = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : noimage;

              return (
                <Link
                  to={`/movie/details/${movie.id}`}
                  key={index}
                  className="w-70 mt-2 rounded-lg flex flex-col hover:scale-105 duration-300 cursor-pointer h-[56vh]"
                >
                  <div className="image w-full h-[50vh] rounded-lg bg-blue-500 overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={movie.title || movie.original_title}
                      className="w-full h-full object-cover rounded mb-3"
                    />
                  </div>

                  <h1 className="text-2xl text-zinc-200 font-bold mt-2 hover:text-[#6556CD]">
                    {movie.title || movie.original_title}
                  </h1>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm">No recommended movies found.</p>
        )}
      </div>
    </div>
  ) : <h1 className='text-2xl p-4 text-white h-screen w-full  '> Loading......</h1>
}

export default MovieDetail