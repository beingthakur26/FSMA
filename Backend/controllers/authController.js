import User from '../models/User.js'
import jwt from 'jsonwebtoken'


// TOKEN GENERATOR
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })


// COOKIE OPTIONS  (ADDED)
const cookieOptions = {
  httpOnly: true,
  secure: false, // change to true in production
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
}


// POST /api/auth/signup
const signup = async (req, res) => {

  const { name, email, password } = req.body

  try {

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = await User.create({ name, email, password })

    const token = generateToken(user._id)   // (ADDED)

    res.cookie("token", token, cookieOptions)  // (ADDED)

    res.status(201).json({                     // (MODIFIED)
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }
}


// POST /api/auth/login
const login = async (req, res) => {

  const { email, password } = req.body

  try {

    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'Account banned' })
    }

    const token = generateToken(user._id)  // (ADDED)

    res.cookie("token", token, cookieOptions)  // (ADDED)

    res.json({                                // (MODIFIED)
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }
}


// GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user)
}

// POST /api/auth/logout
const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}


export {
  signup,
  login,
  getMe,
  logout
}