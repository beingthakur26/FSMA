export default function SkeletonCard() {
  return (
    <div className="min-w-[160px] max-w-[160px] animate-pulse">
      <div className="bg-gray-800 rounded-xl h-[240px] w-full mb-2" />
      <div className="bg-gray-800 h-3 rounded w-3/4 mb-1" />
      <div className="bg-gray-800 h-3 rounded w-1/2" />
    </div>
  );
}