export default function GenreFilter({ genres, selectedId, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition border ${
          selectedId === null
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelect(genre.id)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition border ${
            selectedId === genre.id
              ? "bg-blue-600 border-blue-600 text-white"
              : "bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}