import User from '../models/User.js';

// GET /api/watchlist
export const getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('watchlist');
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/watchlist
// Body: { movieId, title, poster, mediaType }
export const addToWatchlist = async (req, res) => {
    try {
        const { movieId, title, poster, mediaType } = req.body;

        if (!movieId) return res.status(400).json({ message: 'movieId is required' });

        const user = await User.findById(req.user._id);

        // Prevent duplicates
        const exists = user.watchlist.some((item) => item.movieId === String(movieId));
        if (exists) {
            return res.status(409).json({ message: 'Already in watchlist' });
        }

        user.watchlist.push({ movieId: String(movieId), title, poster, mediaType });
        await user.save();

        res.status(201).json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/watchlist/:movieId
export const removeFromWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        const before = user.watchlist.length;
        user.watchlist = user.watchlist.filter(
            (item) => item.movieId !== req.params.movieId
        );

        if (user.watchlist.length === before) {
            return res.status(404).json({ message: 'Item not found in watchlist' });
        }

        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/watchlist  — clear entire watchlist
export const clearWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.watchlist = [];
        await user.save();
        res.json({ message: 'Watchlist cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};