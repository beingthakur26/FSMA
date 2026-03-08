import { useEffect } from "react";

export default function TrailerModal({ trailerKey, onClose }) {

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-lg"
        >
          ✕
        </button>

        {/* Trailer or unavailable message */}
        {trailerKey ? (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allowFullScreen
              allow="autoplay; encrypted-media"
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <p className="text-5xl mb-4">🎬</p>
              <p className="text-white font-semibold text-lg">Trailer Unavailable</p>
              <p className="text-gray-400 text-sm mt-1">
                Trailer for this movie is currently unavailable.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}