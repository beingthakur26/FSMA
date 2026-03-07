import Favorite from '../models/Favorite.js'

// GET /api/favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ 
        userId: req.user._id 
    }).sort({ 
        addedAt: -1 
    })
    res.json(favorites)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/favorites
const addFavorite = async (req, res) => {
  const { movieId, title, poster, mediaType } = req.body
  try {
    const existing = await Favorite.findOne({ 
        userId: req.user._id, 
        movieId 
    })
    if (existing) {
      return res.status(400).json({ message: 'Already in favorites' })
    }
    const favorite = await Favorite.create({
      userId: req.user._id,
      movieId,
      title,
      poster,
      mediaType,
    })
    res.status(201).json(favorite)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/favorites/:movieId
const removeFavorite = async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user._id,
      movieId: req.params.movieId,
    })
    res.json({ message: 'Removed from favorites' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export { 
    getFavorites, 
    addFavorite, 
    removeFavorite 
}
