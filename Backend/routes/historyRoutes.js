import express from 'express'
import { getHistory, addToHistory } from '../controllers/historyController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)
router.get('/', getHistory)
router.post('/', addToHistory)

export default router