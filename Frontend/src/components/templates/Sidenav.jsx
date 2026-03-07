// import { Link } from 'react-router-dom'
// import Trending from '../Trending'

// const Sidenav = () => {

//   return (
//     <>
//         <div className='w-[20%] h-full border-r-2 border-[#3F3F46] p-3 text-white '>
//             <h1 className='flex items-center gap-3 font-bold ml-2'>
//                 <img className='w-5 h-5' src="https://ik.imagekit.io/sheryians/light-logo_lNzGXRRlQ.png" alt=""></img>
//                 <span className='text-3xl'>SCSDB</span>
//             </h1>
//             <nav className='flex flex-col ml-1 text-xl text-zinc-400 gap-2'>
//                 <h1 className='font-semibold mt-10 mb-5 text-xl text-white'>New Feeds</h1>
//                 <Link to='/trending' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-fire-line"></i>
//                     Trending
//                 </Link>
//                 <Link to='/popular' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-sparkling-fill mr-1"></i>
//                     Popular
//                 </Link>
//                 <Link to='/movie' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-movie-line mr-1"></i>
//                     Movies
//                 </Link>
//                 <Link to='/tv' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-tv-line mr-1"></i>
//                     TV Shows
//                 </Link>
//                 <Link to='/people' className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-user-line mr-1"></i>
//                     People
//                 </Link>
//             </nav>
//             <nav className='flex flex-col ml-1 text-xl text-zinc-400 gap-2'>
//                 <h1 className='font-semibold mt-10 mb-5 text-xl text-white'>
//                     Website Info
//                 </h1>
//                 <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-information-line mr-1"></i>
//                     About
//                 </Link>
//                 <Link className='hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-4'>
//                     <i className="ri-phone-line mr-1"></i>
//                     Contact
//                 </Link>
//             </nav>
//         </div>
//     </>
//   )
// }

// export default Sidenav


// import { Link } from 'react-router-dom'

// const Sidenav = () => {
//   return (
//     <aside className="fixed top-0 left-0 w-[18%] min-w-[200px] h-screen border-r border-zinc-800 p-4 bg-[#121212] text-white flex flex-col justify-between overflow-y-auto z-50">
//       {/* Logo */}
//       <div>
//         <div className="flex items-center gap-3 mb-10">
//           <img
//             className="w-6 h-6"
//             src="https://ik.imagekit.io/sheryians/light-logo_lNzGXRRlQ.png"
//             alt="SCSDB Logo"
//           />
//           <span className="text-2xl font-extrabold tracking-wide">SCSDB</span>
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-2 text-zinc-400 text-[1rem]">
//           <h2 className="font-semibold text-zinc-300 mb-3 mt-2 text-sm uppercase tracking-wide">New Feeds</h2>
//           {[
//             { path: '/trending', icon: 'ri-fire-line', label: 'Trending' },
//             { path: '/popular', icon: 'ri-sparkling-fill', label: 'Popular' },
//             { path: '/movie', icon: 'ri-movie-line', label: 'Movies' },
//             { path: '/tv', icon: 'ri-tv-line', label: 'TV Shows' },
//             { path: '/people', icon: 'ri-user-line', label: 'People' },
//           ].map(({ path, icon, label }) => (
//             <Link
//               key={path}
//               to={path}
//               className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-[#6556CD]/20 hover:text-[#6556CD] transition duration-300 ease-in-out"
//             >
//               <i className={`${icon} text-lg`}></i>
//               <span>{label}</span>
//             </Link>
//           ))}

//           <h2 className="font-semibold text-zinc-300 mb-3 mt-6 text-sm uppercase tracking-wide">Website Info</h2>
//           {[
//             { path: '/about', icon: 'ri-information-line', label: 'About' },
//             { path: '/contact', icon: 'ri-phone-line', label: 'Contact' },
//           ].map(({ path, icon, label }) => (
//             <Link
//               key={path}
//               to={path}
//               className="flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-[#6556CD]/20 hover:text-[#6556CD] transition duration-300 ease-in-out"
//             >
//               <i className={`${icon} text-lg`}></i>
//               <span>{label}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Footer / Version */}
//       <div className="text-sm text-zinc-600 mt-8 mb-2 text-center">
//         © 2025 SCSDB
//       </div>
//     </aside>
//   )
// }

// export default Sidenav


// Sidenav.jsx
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <div className="fixed left-0 top-0 w-[20%] h-screen border-r-2 border-[#3F3F46] p-3 text-white bg-[#121212]">
      <h1 className="flex items-center gap-3 font-bold ml-2">
        <img
          className="w-5 h-5"
          src="https://ik.imagekit.io/sheryians/light-logo_lNzGXRRlQ.png"
          alt="logo"
        />
        <span className="text-3xl">SCSDB</span>
      </h1>

      <nav className="flex flex-col ml-1 text-xl text-zinc-400 gap-2">
        <h1 className="font-semibold mt-10 mb-5 text-xl text-white">New Feeds</h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-fire-line mr-1"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-sparkling-fill mr-1"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-movie-line mr-1"></i> Movies
        </Link>
        <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-tv-line mr-1"></i> TV Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-user-line mr-1"></i> People
        </Link>
      </nav>

      <nav className="flex flex-col ml-1 text-xl text-zinc-400 gap-2">
        <h1 className="font-semibold mt-10 mb-5 text-xl text-white">Website Info</h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-information-line mr-1"></i> About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg px-2 py-3">
          <i className="ri-phone-line mr-1"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
