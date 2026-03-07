import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import Header from './templates/Header'
import axios from '../utilis/axios'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'
import VerticalCards from './templates/VerticalCards'

const Home = () => {
  document.title = "Home - SCSDB"

  const [wallpaper, setWallpaper] = useState(null)
  const [trending, setTrending] = useState(null)
  const [category, setCategory] = useState("all")

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get('/trending/all/week')
      let randomdata = data.results[Math.floor(Math.random() * data.results.length)]
      setWallpaper(randomdata)
    } catch (error) {
      console.log("Error fetching header wallpaper:", error)
    }
  }

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/week`)
      setTrending(data.results)
    } catch (error) {
      console.log("Error fetching trending:", error)
    }
  }

  useEffect(() => {
    getTrending()
    !wallpaper && getHeaderWallpaper()
  }, [category])

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="ml-[20%] w-[80%] h-screen overflow-y-auto bg-[#0D0D0F]">
        <Topnav />
        <Header wallpaper={wallpaper} />

        <div className="py-5 px-4 flex justify-between items-center sticky top-0 bg-[#0D0D0F] z-20">
          <h1 className="text-3xl font-bold text-white">Trending</h1>
          <Dropdown
            title="Filter"
            option={['all', 'tv', 'movie', 'person']}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Horizontal Cards Section */}
        <HorizontalCards data={trending} title={category} />
        <VerticalCards data={trending} title={category} />
      </div>
    </>
  ) : (
    <h1 className="text-2xl p-4 text-white h-screen w-full   ">Loading...</h1>
  )
}

export default Home



// import React, { useEffect, useState } from 'react'
// import Sidenav from './templates/Sidenav'
// import Topnav from './templates/Topnav'
// import Header from './templates/Header'
// import axios from '../utilis/axios'
// import HorizontalCards from './templates/HorizontalCards'
// import Dropdown from './templates/Dropdown'

// const Home = () => {
//     document.title = "Home - SCSDB"

//     const [wallpaper, setWallpaper] = useState(null)
//     const [trending, setTrending] = useState(null);
//     const [category, setCategory] = useState("all")

//     const getHeaderWallpaper = async () => {
//         try {
//             const {data} = await axios.get('/trending/all/week');
//             let randomdata = data.results[Math.floor(Math.random() * data.results.length)];
//             setWallpaper(randomdata);
//         } catch (error) {
//             console.log("Error fetching header wallpaper:", error);
//         }
//     }

//     const getTrending = async () => {
//         try {
//             const {data} = await axios.get(`/trending/${category}/week`);
//             setTrending(data.results);
//         } catch (error) {
//             console.log("Error fetching trending:", error);
//         }
//     }

//     useEffect(() => {
//         getTrending()
//         !wallpaper && getHeaderWallpaper()  
//     }, [category])

//   return wallpaper && trending ? (
//     <>
//     <Sidenav/>
//     <div className='w-[80%] h-full overflow-auto overflow-x--hidden'>
//         <Topnav/>
//         <Header wallpaper={wallpaper} />

//         <div className='py-3 flex justify-between items-center px-2'>
//             <h1 className='text-3xl font-bold text-white'>
//                 Trending
//             </h1>
//             <Dropdown 
//                 title="Filter" 
//                 option={['all', 'tv', 'movie', 'person']} 
//                 func={(e) => setCategory(e.target.value)}
//             />
//         </div>

//         <HorizontalCards data={trending} title={category} />
//     </div>
//     </>
//   ) : <h1 className='text-2xl p-4 text-white '> Loading......</h1>
// }

// export default Home
