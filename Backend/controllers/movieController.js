import Movie from '../models/Movie.js'

// GET /api/movies — fetch all admin-added movies (public)
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/movies/:id — fetch single movie by ID (public)
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}