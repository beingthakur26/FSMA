import express from 'express';
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
} from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All watchlist routes require login
router.use(protect);

router.get('/',getWatchlist);        // GET    /api/watchlist
router.post('/',addToWatchlist);      // POST   /api/watchlist
router.delete('/clear',clearWatchlist);      // DELETE /api/watchlist/clear  ← must be before /:movieId
router.delete('/:movieId',removeFromWatchlist); // DELETE /api/watchlist/:movieId

export default router;