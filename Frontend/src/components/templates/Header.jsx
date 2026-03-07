import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({ wallpaper}) => {
  return (
    <Link to={`/${wallpaper.media_type}/details/${wallpaper.id}`} className='w-full h-[50vh] flex flex-col justify-end p-[5%] items-start mt-3'
        style={{
            background: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/w500/${wallpaper.backdrop_path || wallpaper.poster_path || wallpaper.profile_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        <h1 className='text-5xl font-bold text-white '> 
            {wallpaper.title || wallpaper.name || wallpaper.original_name }
        </h1>
        <p className='text-zinc-200 mt-4 w-[50%] text-sm'>
            {wallpaper.overview.length > 200 ? wallpaper.overview.slice(0, 200) + "..." : wallpaper.overview}....
            <span className='text-blue-500 hover:underline'>Read More</span>
        </p>
        <p className='text-white mt-4 mb-2 flex items-center'>
            <i className="ri-calendar-line mr-1 text-amber-200"></i> {wallpaper.release_date || wallpaper.first_air_date}
            <i className="ri-4k-line ml-4 mr-1 text-amber-200"></i> {wallpaper.adult ? "18+" : "U/A"}
        </p>
        <span className='px-2 py-2 bg-[#6556CD] rounded-lg text-zinc-300 font-semibold hover:underline'>Watch Trailer</span>
    </Link >
  )
}

export default Header