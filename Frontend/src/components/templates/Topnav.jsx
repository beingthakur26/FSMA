import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from './../../utilis/axios'
import noimage from '/noimage.jpg'

const Topnav = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState(null)

    const getSearches = async () => {
        try {
            const data = await axios.get(`/search/multi?query=${searchTerm}`);
            setSearchResults(data.data.results);
        } catch (error) {
            console.log("Error :", error);
        }
    }

    useEffect(() => {
        getSearches()
    }, [searchTerm])

  return (
    <div className='w-full h-[6vh] relative flex items-center justify-start pl-[20%] py-6 '>
        <i className="ri-search-line text-zinc-400 text-2xl"></i>
        <input 
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text" 
            placeholder='Search.....' 
            className='w-[50%] h-[5vh] bg-zinc-700 pl-10 pr-4 rounded-lg text-white mx-6 outline-none' 
        />
        {searchTerm && (
            <i onClick={() => setSearchTerm("")} className="ri-close-line text-zinc-400 text-2xl"></i>
        )}

        {/* <i className="ri-notification-line text-zinc-400 text-2xl absolute "></i> */}

        <div className='absolute w-[40%] max-h-[40vh] z-999 top-[90%] bg-zinc-100  ml-[4%] overflow-auto rounded-md'>
            {searchResults && searchResults.map((item) => (
                <Link 
                    to={`/${item.media_type}/details/${item.id}`}
                    key={item.id}
                >
                    <div className='px-1 py-2 text-zinc-600 font-semibold w-full flex items-center justify-start gap-4 border-b-2 border-zinc-300 hover:bg-zinc-300 hover:text-black duration-200'>
                        <img 
                            className='w-[4vw] h-[4vw] object-cover rounded-md' 
                            src={
                                !item.backdrop_path && !item.poster_path && !item.profile_path ? noimage :
                                `https://image.tmdb.org/t/p/w500/${item.backdrop_path || item.poster_path || item.profile_path}`
                            } 
                            alt="" 
                        />
                        <span className='text-xl'>{item.title || item.name}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Topnav