import express from 'express'
import {
  getAllUsers, banUser, deleteUser,
  getAllMovies, createMovie, updateMovie, deleteMovie,
  getStats,  // ← import new controller
} from '../controllers/adminController.js'
import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router()

// All admin routes: must be logged in + admin role
router.use(protect, adminOnly)

// Stats
router.get('/stats', getStats)   // ← was missing entirely

// Users
router.get('/users', getAllUsers)
router.patch('/users/:id/ban', banUser)   // PATCH, not PUT
router.delete('/users/:id', deleteUser)

// Movies
router.get('/movies', getAllMovies)
router.post('/movies', createMovie)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)

export default router