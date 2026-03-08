import WatchHistory from '../models/WatchHistory.js'

// GET /api/history
const getHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ 
        userId: req.user._id 
    })
      .sort({ watchedAt: -1 })
      .limit(50)
    res.json(history)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/history
// POST /api/history
const addToHistory = async (req, res) => {
  const { movieId, title, poster, mediaType } = req.body;

  try {
    const entry = await WatchHistory.findOneAndUpdate(
      {
        userId: req.user._id,
        movieId: movieId,
      },
      {
        title,
        poster,
        mediaType,
        watchedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json(entry);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { 
    getHistory, 
    addToHistory 
}
