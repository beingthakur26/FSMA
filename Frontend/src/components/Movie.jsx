import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import axios from '../utilis/axios'
import Cards from './templates/Cards'
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular  = () => {
    const navigate = useNavigate()

    const [category, setCategory] = useState("now_playing")
    const [trending, settrending] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const getTrending = async () => {
        try {
            const {data} = await axios.get(`/movie/${category}?page=${page}`)
            // settrending(data.results);
            if (data.results.length > 0) {
                settrending((prevState) => [...prevState, ...data.results])
                setpage(page + 1)
            } else{
                sethasMore(false)
            }
        } catch (error) {
            console.log("Error fetching trending:", error);
        }
    }

    const refreshHandler = () => {
        if(trending.length === 0) {
            getTrending()
        } else {
            setpage(1)
            settrending([])
            getTrending()
        }
    }

    useEffect(() => {
        // getTrending()
        refreshHandler()
    }, [category])

  return (
    <div className='px-[4%] py-[1%] w-screen bg-[#0D0D0F]'>
        <div className='w-full flex items-center justify-between '>
            <i 
                onClick={() => navigate(-1)} 
                className="ri-arrow-left-line text-3xl text-center text-zinc-300 hover:text-[#6556CD] fixed"
            ></i>
            <h1 className='text-3xl text-zinc-300 font-semibold pl-10 '>
                Movie
            </h1>
            <div className='w-[90%] flex items-center justify-between'>
                <Topnav/>
                <Dropdown 
                    title="Category" 
                    option={['now_playing', 'popular', 'top_rated', 'upcoming']} 
                    func={(e) => setCategory(e.target.value)}
                />
            </div>
        </div>
        <InfiniteScroll 
            dataLength={trending.length} 
            next={getTrending}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>
  }
        >
            <Cards data={trending} title='movie'/>
        </InfiniteScroll>
    </div>
  )
}

export default Popular