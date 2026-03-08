import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    watchlist: [
        {
            movieId:    { type: String, required: true },   // TMDB id
            title:      { type: String },
            poster:     { type: String },
            mediaType:  { type: String, enum: ['movie', 'tv'], default: 'movie' },
            addedAt:    { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true })

// Hash passsword befor saving it
userSchema.pre("save", async function() {

  if(!this.isModified("password")) return 

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})

// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {

  return await bcrypt.compare(enteredPassword, this.password)

}

const User = mongoose.model('User', userSchema)

export default User