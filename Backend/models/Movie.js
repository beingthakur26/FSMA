import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    poster: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: 'Description not available'
    },
    tmdbId: {
        type: String,
        default: ''
    },
    releaseDate: {
        type: String,
        default: ''
    },
    trailer: {
        type: String,
        default: ''
    }, // YouTube link
    genre: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        default: 'movie'
    },
}, { timestamps: true })

const Movie = mongoose.model('Movie', movieSchema)

export default Movie