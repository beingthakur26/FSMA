import dns from 'node:dns'
dns.setServers(['8.8.8.8', '1.1.1.1'])

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'   // ✅ ADDED

import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import watchlistRoutes from './routes/watchlistRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config()
connectDB()

const app = express()

// ✅ CORS configuration
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }))

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // will set this after frontend deploys
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json())

app.use(cookieParser())   // ✅ ADDED (REQUIRED FOR COOKIE AUTH)

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/watchlist', watchlistRoutes);
app.use("/api/auth", profileRoutes);

app.get('/', (req, res) => res.send('FSMA API Running'))

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)