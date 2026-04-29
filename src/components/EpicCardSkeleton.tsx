"use client";

export default function EpicCardSkeleton() {
  return (
    <div className="p-5 rounded-xl bg-white shadow-sm border border-gray-200 animate-pulse">
      
    
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>

      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

    
      <div className="flex justify-between items-center mt-6">
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  );
}