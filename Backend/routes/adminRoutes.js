import express from 'express'
import {
  getAllUsers, banUser, deleteUser,
  getAllMovies, createMovie, updateMovie, deleteMovie
} from '../controllers/adminController.js'
import { protect } from '../middleware/authMiddleware.js'
import { adminOnly } from '../middleware/adminMiddleware.js'

const router = express.Router()

router.use(protect, adminOnly)  // All admin routes: must be logged in + admin role

router.get('/users', getAllUsers)
router.patch('/users/:id/ban', banUser)
router.delete('/users/:id', deleteUser)

router.get('/movies', getAllMovies)
router.post('/movies', createMovie)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)

export default router