import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {

  // 1️⃣ Get token from cookie OR Authorization header
  const token =
    req.cookies?.token ||
    req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, no token'
    })
  }

  try {

    // 2️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 3️⃣ Get user from database
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      })
    }

    // 4️⃣ Check if user banned
    if (user.isBanned) {
      return res.status(403).json({
        message: 'Your account has been banned'
      })
    }

    // 5️⃣ Attach user to request
    req.user = user

    next()

  } catch (error) {

    return res.status(401).json({
      message: 'Token invalid or expired'
    })

  }
}