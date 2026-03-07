import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tv from './components/Tv'
import People from './components/People'
import MovieDetail from './components/MovieDetail'
import TvDetail from './components/TvDetail'
import PeopleDetail from './components/PeopleDetail'

const App = () => {
  return (
    <div className='w-screen bg-[#0D0D0F] flex overflow-x-hidden'>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movie' element={<Movie/>}/>
        <Route path='/movie/details/:id' element={<MovieDetail/>}/>
        <Route path= '/tv' element={<Tv/>} />
        <Route path='/tv/details/:id' element={<TvDetail/>}/>
        <Route path= '/people' element={<People/>} />
        <Route path='/person/details/:id' element={<PeopleDetail/>}/>
      </Routes>
    </div>
  )
}

export default App