import { useState, useEffect } from "react";

const emptyForm = {
  title: "",
  poster: "",
  description: "",
  movieId: "",
  releaseDate: "",
  trailerUrl: "",
  genre: "",
  category: "",
};

export default function AddEditMovie({ movie, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title || "",
        poster: movie.poster || "",
        description: movie.description || "",
        movieId: movie.movieId || "",
        releaseDate: movie.releaseDate?.slice(0, 10) || "",
        trailerUrl: movie.trailerUrl || "",
        genre: movie.genre || "",
        category: movie.category || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [movie]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields = [
    { name: "title", label: "Movie Title", type: "text", placeholder: "Inception" },
    { name: "movieId", label: "TMDB Movie ID", type: "text", placeholder: "27205" },
    { name: "poster", label: "Poster Image URL", type: "text", placeholder: "https://..." },
    { name: "releaseDate", label: "Release Date", type: "date" },
    { name: "trailerUrl", label: "Trailer YouTube Link", type: "text", placeholder: "https://youtube.com/watch?v=..." },
    { name: "genre", label: "Genre", type: "text", placeholder: "Action, Sci-Fi" },
    { name: "category", label: "Category", type: "text", placeholder: "Movie / TV Show" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {movie ? "✏️ Edit Movie" : "➕ Add Movie"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm text-gray-400 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={name === "title"}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-600 text-sm"
              />
            </div>
          ))}

          {/* Description textarea */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Movie description..."
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-600 text-sm resize-none"
            />
          </div>

          {/* Trailer preview */}
          {form.trailerUrl && (
            <div className="bg-gray-800 rounded-lg p-3 text-xs text-gray-400">
              🎬 Trailer URL set — will display via YouTube embed
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-bold py-2.5 rounded-xl transition text-sm"
            >
              {loading ? "Saving..." : movie ? "Update Movie" : "Add Movie"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}