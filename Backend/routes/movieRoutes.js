// import express from 'express'
// import Movie from '../models/Movie.js'

// const router = express.Router()

// // Public - fetch admin-added movies
// router.get('/', async (req, res) => {
//   try {
//     const movies = await Movie.find()
//     res.json(movies)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// export default router

import express from 'express'
import { getAllMovies, getMovieById } from '../controllers/movieController.js'

const router = express.Router()

router.get('/', getAllMovies)
router.get('/:id', getMovieById)

export default router