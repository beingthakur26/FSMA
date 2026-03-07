import express from 'express'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)  // All routes require login
router.get('/', getFavorites)
router.post('/', addFavorite)
router.delete('/:movieId', removeFavorite)

export default router