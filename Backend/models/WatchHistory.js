import mongoose from 'mongoose'

const watchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  poster: {
    type: String
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  watchedAt: {
    type: Date,
    default: Date.now
  },
})

const WatchHistory = mongoose.model('WatchHistory', watchHistorySchema)

export default WatchHistory