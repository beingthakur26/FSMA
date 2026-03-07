// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Topnav from './templates/Topnav'
// import Dropdown from './templates/Dropdown'
// import axios from '../utilis/axios'
// import Cards from './templates/Cards'
// import InfiniteScroll from 'react-infinite-scroll-component';

// const Popular  = () => {
//     const navigate = useNavigate()

//     const [category, setCategory] = useState("movie")
//     const [trending, settrending] = useState([])
//     const [page, setpage] = useState(1)
//     const [hasMore, sethasMore] = useState(true)

//     const getTrending = async () => {
//         try {
//             const {data} = await axios.get(`/${category}/popular?page=${page}`)
//             // settrending(data.results);
//             if (data.results.length > 0) {
//                 settrending((prevState) => [...prevState, ...data.results])
//                 setpage(page + 1)
//             } else{
//                 sethasMore(false)
//             }
//         } catch (error) {
//             console.log("Error fetching trending:", error);
//         }
//     }

//     const refreshHandler = () => {
//         if(trending.length === 0) {
//             getTrending()
//         } else {
//             setpage(1)
//             settrending([])
//             getTrending()
//         }
//     }

//     useEffect(() => {
//         // getTrending()
//         refreshHandler()
//     }, [category])

//   return (
//     <div className='px-[4%] py-[1%] w-screen bg-[#0D0D0F]'>
//         <div className='w-full flex items-center justify-between '>
//             <i 
//                 onClick={() => navigate(-1)} 
//                 className="ri-arrow-left-line text-3xl text-center text-zinc-300 hover:text-[#6556CD] fixed"
//             ></i>
//             <h1 className='text-3xl text-zinc-300 font-semibold pl-10 '>
//                 Popular
//             </h1>
//             <div className='w-[90%] flex items-center justify-between'>
//                 <Topnav/>
//                 <Dropdown 
//                     title="Category" 
//                     option={['movie', 'tv', 'person']} 
//                     func={(e) => setCategory(e.target.value)}
//                 />
//             </div>
//         </div>
//         <InfiniteScroll 
//             dataLength={trending.length} 
//             next={getTrending}
//             hasMore={hasMore}
//             loader={<h4>Loading...</h4>}
//             endMessage={
//             <p style={{ textAlign: 'center' }}>
//                 <b>Yay! You have seen it all</b>
//             </p>
//   }
//         >
//             <Cards data={trending} title='popular'/>
//         </InfiniteScroll>
//     </div>
//   )
// }

// export default Popular



import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import axios from '../utilis/axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import noimage from '/noimage.jpg'

const Popular = () => {
  const navigate = useNavigate()

  const [category, setCategory] = useState("movie")
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // 🔹 Fetch Popular Items
  const fetchPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`)
      if (data.results && data.results.length > 0) {
        setItems((prev) => [...prev, ...data.results])
        setPage((prev) => prev + 1)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error fetching popular data:", error)
    }
  }

  // 🔹 Refresh when category changes
  const refreshData = () => {
    setPage(1)
    setItems([])
    setHasMore(true)
    fetchPopular()
  }

  useEffect(() => {
    refreshData()
  }, [category])

  // 🔹 Handle navigation to detail page
  const handleCardClick = (id) => {
    if (!id) return
    navigate(`/${category}/details/${id}`)
  }

  return (
    <div className="px-[4%] py-[1%] w-screen bg-[#0D0D0F] min-h-screen">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-3xl text-zinc-300 hover:text-[#6556CD] cursor-pointer"
          ></i>
          <h1 className="text-3xl text-zinc-300 font-semibold">Popular</h1>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <Topnav />
          <Dropdown
            title="Category"
            option={['movie', 'tv', 'person']}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Cards Section */}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchPopular}
        hasMore={hasMore}
        loader={<h4 className="text-center text-zinc-400 py-4">Loading...</h4>}
        endMessage={
          <p className="text-center text-zinc-500 py-4">
            <b>Yay! You’ve seen it all 🎉</b>
          </p>
        }
      >
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <CardItem item={item} category={category} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Popular

// 🔹 Reusable Card Component
const CardItem = ({ item, category }) => {
  const imagePath = item.poster_path || item.profile_path
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/w500${imagePath}`
    : noimage

  const title = item.title || item.name
  const subInfo =
    category === "movie"
      ? item.release_date?.slice(0, 4)
      : category === "tv"
      ? item.first_air_date?.slice(0, 4)
      : item.known_for_department

  return (
    <div className="w-[150px] md:w-[200px] bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-[#6556CD]/30">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[225px] object-cover"
      />
      <div className="p-2">
        <h2 className="text-center text-zinc-200 text-sm font-medium truncate">
          {title}
        </h2>
        {subInfo && (
          <p className="text-center text-zinc-500 text-xs mt-1">{subInfo}</p>
        )}
      </div>
    </div>
  )
}
