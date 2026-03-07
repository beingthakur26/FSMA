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
const addToHistory = async (req, res) => {
  const { movieId, title, poster, mediaType } = req.body
  try {
    // Remove old entry if exists, then re-add (keep it fresh at the top)
    await WatchHistory.findOneAndDelete({ userId: req.user._id, movieId })
    const entry = await WatchHistory.create({
      userId: req.user._id,
      movieId,
      title,
      poster,
      mediaType,
    })
    res.status(201).json(entry)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { 
    getHistory, 
    addToHistory 
}
