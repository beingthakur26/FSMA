import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: String,
        required: true
    },   // TMDB movie ID
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
    addedAt: {
        type: Date,
        default: Date.now
    },
})

// Prevent duplicate favorites
favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

export default Favorite