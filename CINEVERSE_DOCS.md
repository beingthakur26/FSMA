# 🎬 CineVerse — Full Stack Movie Discovery Platform

> A production-level full-stack web application for discovering movies, TV shows, and people. Built with React, Redux Toolkit, Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
CINEVERSE/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB Atlas connection
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT protect middleware
│   │   └── adminMiddleware.js       # Admin role check
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, role, isBanned)
│   │   ├── Movie.js                 # Admin-managed movie schema
│   │   ├── Favorite.js              # User favorites schema
│   │   ├── History.js               # Watch history schema
│   │   └── Watchlist.js             # Watchlist schema
│   ├── routes/
│   │   ├── auth.js                  # Register, Login, Logout, Profile
│   │   ├── favorites.js             # Get, Add, Remove favorites
│   │   ├── history.js               # Get, Add, Remove, Clear history
│   │   ├── watchlist.js             # Get, Add, Remove watchlist
│   │   └── admin.js                 # Movies CRUD, Users management, Stats
│   ├── .env                         # Environment variables (never commit)
│   ├── server.js                    # Express app entry point
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── placeholder.jpg          # Fallback image for missing posters
    │   └── _redirects               # Render SPA routing fix
    ├── src/
    │   ├── assets/                  # Static files (logos, icons, fonts)
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx       # Responsive navbar with hamburger + dropdown
    │   │   │   ├── Footer.jsx       # Site footer with links
    │   │   │   ├── Loader.jsx       # Spinner animation
    │   │   │   ├── SkeletonCard.jsx # Loading skeleton placeholder
    │   │   │   ├── MovieCard.jsx    # Reusable movie/TV card with badges
    │   │   │   ├── GenreFilter.jsx  # Horizontal genre pill filter bar
    │   │   │   └── ErrorBoundary.jsx# React error boundary (no white crashes)
    │   │   ├── modals/
    │   │   │   └── TrailerModal.jsx # YouTube trailer embed modal
    │   │   └── search/
    │   │       └── SearchBar.jsx    # Debounced search input with clear button
    │   ├── context/
    │   │   └── ThemeContext.jsx     # Dark/Light mode toggle with persistence
    │   ├── hooks/
    │   │   ├── useDebounce.js       # Debounce hook for search
    │   │   ├── useInfiniteScroll.js # IntersectionObserver infinite scroll hook
    │   │   └── useAuth.js           # Centralized auth logic hook
    │   ├── pages/
    │   │   ├── Home.jsx             # Hero banner + trending + popular rows
    │   │   ├── Movies.jsx           # Movies grid with genre filter + infinite scroll
    │   │   ├── TVShows.jsx          # TV shows grid with genre filter + infinite scroll
    │   │   ├── MovieDetail.jsx      # Full movie detail + trailer + favorites + watchlist
    │   │   ├── TVDetail.jsx         # Full TV detail + trailer + favorites + watchlist
    │   │   ├── People.jsx           # People grid + person detail modal + filmography
    │   │   ├── SearchResults.jsx    # Real-time debounced search results
    │   │   ├── Favorites.jsx        # User's saved favorites
    │   │   ├── Watchlist.jsx        # User's watchlist
    │   │   ├── WatchHistory.jsx     # Auto-saved watch history
    │   │   ├── Profile.jsx          # Edit name, email, password + stats
    │   │   ├── Login.jsx            # JWT login page
    │   │   ├── Signup.jsx           # Registration page
    │   │   └── NotFound.jsx         # 404 page
    │   ├── admin/
    │   │   ├── AdminLayout.jsx      # Admin sidebar layout
    │   │   ├── Dashboard.jsx        # Stats overview (users, movies, favorites, history)
    │   │   ├── ManageMovies.jsx     # Movie table with search, add, edit, delete
    │   │   ├── AddEditMovie.jsx     # Movie form modal
    │   │   └── ManageUsers.jsx      # User table with ban and delete
    │   ├── redux/
    │   │   ├── store.js             # Redux store configuration
    │   │   └── slices/
    │   │       ├── authSlice.js     # Auth state (login, register, logout, profile)
    │   │       ├── movieSlice.js    # Movie/TV data (trending, popular, paginated, details)
    │   │       ├── searchSlice.js   # Search query and results state
    │   │       ├── favoritesSlice.js# Favorites CRUD state
    │   │       ├── watchHistorySlice.js # History state
    │   │       ├── watchlistSlice.js# Watchlist state
    │   │       └── adminSlice.js    # Admin movies + users state
    │   ├── services/
    │   │   ├── api.js               # Axios instance with JWT interceptor + 401 handler
    │   │   ├── tmdb.js              # All TMDB API calls
    │   │   ├── authService.js       # Auth + profile API calls
    │   │   ├── favoritesService.js  # Favorites API calls
    │   │   ├── historyService.js    # History API calls
    │   │   ├── watchlistService.js  # Watchlist API calls
    │   │   └── adminService.js      # Admin API calls
    │   ├── utils/
    │   │   ├── protectedRoute.jsx   # Auth guard — redirects to /login
    │   │   └── AdminRoute.jsx       # Admin guard — redirects to / if not admin
    │   ├── App.jsx                  # All routes defined here
    │   ├── main.jsx                 # App entry point with all providers
    │   └── index.css                # Tailwind directives + scrollbar-hide utility
    ├── .env                         # TMDB API key + backend URL (never commit)
    ├── vite.config.js
    └── package.json
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Axios | HTTP requests with interceptors |
| Tailwind CSS | Utility-first styling |
| TMDB API | Movie, TV, and people data |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| CORS | Cross-origin request handling |

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/cineverse.git
cd cineverse
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env file with variables above
npm run dev
# Backend runs on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd frontend
npm install
# Create .env file with variables above
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔑 API Routes Reference

### Auth — `/api/auth`
| Method | Route | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Create new account | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| POST | `/api/auth/logout` | Logout | Yes |
| GET | `/api/auth/profile` | Get current user profile | Yes |
| PUT | `/api/auth/profile` | Update name, email, or password | Yes |

### Favorites — `/api/favorites`
| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/api/favorites` | Get user's favorites | Yes |
| POST | `/api/favorites` | Add movie to favorites | Yes |
| DELETE | `/api/favorites/:movieId` | Remove from favorites | Yes |

### Watch History — `/api/history`
| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/api/history` | Get user's history | Yes |
| POST | `/api/history` | Save to history | Yes |
| DELETE | `/api/history` | Clear all history | Yes |
| DELETE | `/api/history/:movieId` | Remove single item | Yes |

### Watchlist — `/api/watchlist`
| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/api/watchlist` | Get user's watchlist | Yes |
| POST | `/api/watchlist` | Add to watchlist | Yes |
| DELETE | `/api/watchlist/:movieId` | Remove from watchlist | Yes |

### Admin — `/api/admin` (Admin role required)
| Method | Route | Description |
|---|---|---|
| GET | `/api/admin/stats` | Get platform statistics |
| GET | `/api/admin/movies` | Get all custom movies |
| POST | `/api/admin/movies` | Add a new movie |
| PUT | `/api/admin/movies/:id` | Update movie |
| DELETE | `/api/admin/movies/:id` | Delete movie |
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/:userId/ban` | Ban or unban user |
| DELETE | `/api/admin/users/:userId` | Delete user |

---

## ✨ Features

### User Features
- **Browse** trending, popular movies and TV shows on the Home page
- **Search** movies, TV shows, and people in real-time with debouncing
- **Movie Detail** — view full info, budget, revenue, genres, trailer
- **TV Detail** — view seasons, episodes, network, status, trailer
- **People** — browse popular actors/directors, view their full filmography
- **Trailer Modal** — watch trailers directly inside the app via YouTube embed
- **Favorites** — save and manage favorite movies/shows (backend persisted)
- **Watchlist** — bookmark movies/shows to watch later (backend persisted)
- **Watch History** — auto-saved every time a detail page is visited
- **Infinite Scroll** — automatic loading on Movies, TV, and People pages
- **Genre Filters** — filter Movies and TV Shows by genre
- **Profile Page** — edit name, email, password; view account stats
- **Dark/Light mode** — toggle with persistence via localStorage

### Admin Features
- **Dashboard** — platform stats (users, movies, favorites, history counts)
- **Manage Movies** — full CRUD with search filter
- **Manage Users** — view, ban/unban, delete users
- **Role-based access** — admin routes protected from regular users

### Technical Features
- JWT authentication with automatic token attachment via Axios interceptor
- Auto logout on 401 responses
- React Error Boundary — no white screen crashes
- Skeleton loading UI during data fetches
- Placeholder image fallback for missing posters
- "Trailer unavailable" message instead of crashing
- `_redirects` file for Render SPA routing support
- Duplicate prevention in paginated infinite scroll results

---

## 🔐 Authentication Flow

```
User submits login form
  → authService.loginUser() sends POST /api/auth/login
  → Backend validates credentials, returns { token, user }
  → Token saved to localStorage
  → Axios interceptor attaches token to all future requests
  → Redux auth state updated with user object
  → User redirected to Home page

On page refresh:
  → Token read from localStorage into Redux initial state
  → ProtectedRoute checks token existence
  → User stays logged in without re-authenticating

On 401 response (token expired):
  → Axios response interceptor fires
  → localStorage cleared
  → User redirected to /login automatically
```

---

## 🗂 Redux State Shape

```js
{
  auth: {
    user: { _id, name, email, role, createdAt },
    token: "jwt_token_string",
    loading: false,
    error: null
  },
  movies: {
    trending: [],
    popular: [],
    moviesList: [],       // paginated movies page
    moviesPage: 1,
    moviesTotalPages: 1,
    tvList: [],           // paginated TV page
    tvPage: 1,
    tvTotalPages: 1,
    selectedMovie: {},    // detail page data
    trailerKey: "ytKey",  // YouTube video key
    loading: false,
    detailLoading: false,
    error: null
  },
  search: {
    query: "",
    results: [],
    loading: false,
    error: null
  },
  favorites: {
    items: [],
    loading: false,
    error: null
  },
  history: {
    items: [],
    loading: false,
    error: null
  },
  watchlist: {
    items: [],
    loading: false,
    error: null
  },
  admin: {
    movies: [],
    users: [],
    stats: { totalUsers, totalMovies, totalFavorites, totalHistory },
    loading: false,
    error: null
  }
}
```

---

## 📡 TMDB API Endpoints Used

| Endpoint | Usage |
|---|---|
| `/trending/all/day` | Home page hero banner + trending row |
| `/movie/popular` | Popular movies row + Movies page |
| `/tv/popular` | TV Shows page |
| `/movie/:id` | Movie detail page |
| `/movie/:id/videos` | Trailer key for movie |
| `/tv/:id` | TV detail page |
| `/tv/:id/videos` | Trailer key for TV show |
| `/search/multi` | Search movies, TV, people |
| `/genre/movie/list` | Movie genre filter pills |
| `/genre/tv/list` | TV genre filter pills |
| `/discover/movie` | Filter movies by genre |
| `/discover/tv` | Filter TV shows by genre |
| `/person/popular` | People page grid |
| `/person/:id` | Person detail modal |
| `/person/:id/movie_credits` | Person filmography |

---

## 🌐 Deployment (Render)

### Backend
1. Push to GitHub
2. Render → New Web Service → connect repo
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add all environment variables in Render dashboard
6. MongoDB Atlas → Network Access → Allow `0.0.0.0/0`

### Frontend
1. Push to GitHub
2. Render → New Static Site → connect repo
3. Build Command: `npm install && npm run build`
4. Publish Directory: `dist`
5. Add environment variables in Render dashboard
6. `public/_redirects` file must contain: `/*  /index.html  200`

---

## 🧱 MongoDB Schemas

### User
```js
{
  name:      String (required),
  email:     String (required, unique),
  password:  String (required, hashed),
  role:      String (enum: ["user", "admin"], default: "user"),
  isBanned:  Boolean (default: false),
  createdAt: Date
}
```

### Movie (Admin managed)
```js
{
  title:       String (required),
  poster:      String,
  description: String,
  movieId:     String,
  releaseDate: Date,
  trailerUrl:  String,
  genre:       String,
  category:    String
}
```

### Favorite / Watchlist / History (same shape)
```js
{
  user:         ObjectId (ref: User),
  movieId:      String,
  title:        String,
  poster:       String,
  rating:       Number,
  release_date: String,
  media_type:   String (movie | tv),
  watchedAt:    String (History only)
}
```

---

## 👤 How to Create Admin Account

After registering a normal user, go to your MongoDB Atlas dashboard:

1. Open your database → `users` collection
2. Find your user document
3. Edit → change `"role": "user"` to `"role": "admin"`
4. Save

Now login with that account — the Admin link will appear in the Navbar.

---

## 🔗 Key Dependencies

### Backend
```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x",
  "cors": "^2.x",
  "dotenv": "^16.x"
}
```

### Frontend
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "axios": "^1.x",
  "tailwindcss": "^3.x"
}
```

---

## ⚠️ Important Notes

- Never commit `.env` files — they contain secrets
- Render free tier sleeps after 15 min inactivity — first request takes 30-60s
- Use UptimeRobot (free) to ping backend every 10 min to prevent sleep
- TMDB API key is public-facing (in Vite env) — rate limit is 40 req/10s
- JWT tokens currently have no expiry set — add `expiresIn: "7d"` in production
- MongoDB Atlas free tier has 512MB storage limit

---

*Built with ❤️ using React, Redux Toolkit, Node.js, Express, MongoDB, and TMDB API*
