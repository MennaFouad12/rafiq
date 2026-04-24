export default function ProjectCardSkeleton () {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm animate-pulse">
      <div className="h-4 w-16 bg-gray-200 rounded mb-4" />

      <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200" />
          <div>
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="h-6 w-14 bg-gray-200 rounded" />
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
};