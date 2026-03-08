import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              🎬 <span className="text-blue-500">Cine</span>Verse
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover movies, TV shows, and people. Your personal entertainment hub.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Browse</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/movies" className="hover:text-white transition">Movies</Link></li>
              <li><Link to="/tv" className="hover:text-white transition">TV Shows</Link></li>
              <li><Link to="/people" className="hover:text-white transition">People</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/favorites" className="hover:text-white transition">Favorites</Link></li>
              <li><Link to="/watchlist" className="hover:text-white transition">Watchlist</Link></li>
              <li><Link to="/history" className="hover:text-white transition">Watch History</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} CineVerse. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              TMDB API
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}