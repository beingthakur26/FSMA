import User from '../models/User.js'
import Movie from '../models/Movie.js'

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PATCH /api/admin/users/:id/ban
const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.isBanned = !user.isBanned
    await user.save()
    // FIX: return full user (minus password) so Redux can update state correctly
    const updated = await User.findById(user._id).select('-password')
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/admin/movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 })
    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/admin/movies
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT /api/admin/movies/:id
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/admin/movies/:id
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.json({ message: 'Movie deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/admin/stats  ← NEW: was completely missing
const getStats = async (req, res) => {
  try {
    const [totalUsers, totalMovies, bannedUsers] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      User.countDocuments({ isBanned: true }),
    ])

    // totalFavorites / totalHistory — aggregate across all users
    const favAgg = await User.aggregate([
      { $project: { favCount: { $size: { $ifNull: ["$favorites", []] } } } },
      { $group: { _id: null, total: { $sum: "$favCount" } } },
    ])
    const histAgg = await User.aggregate([
      { $project: { histCount: { $size: { $ifNull: ["$watchHistory", []] } } } },
      { $group: { _id: null, total: { $sum: "$histCount" } } },
    ])

    res.json({
      totalUsers,
      totalMovies,
      bannedUsers,
      totalFavorites: favAgg[0]?.total ?? 0,
      totalHistory: histAgg[0]?.total ?? 0,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllUsers,
  banUser,
  deleteUser,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getStats,  // ← export the new one
}