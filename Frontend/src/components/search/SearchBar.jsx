import { useDispatch, useSelector } from "react-redux";
import { setQuery, clearSearch } from "../../redux/slices/searchSlice";

export default function SearchBar({ placeholder = "Search movies, TV shows, people..." }) {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    if (!value.trim()) dispatch(clearSearch());
  };

  const handleClear = () => dispatch(clearSearch());

  return (
    <div className="relative w-full">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
        🔍
      </span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl pl-11 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}