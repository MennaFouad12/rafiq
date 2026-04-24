"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="hidden md:flex items-center justify-between mt-10 text-sm text-gray-500">
      
      {/* Info */}
      <p>
        Showing {(currentPage - 1) * limit + 1} -{" "}
        {Math.min(currentPage * limit, totalCount)} of {totalCount}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          {"<"}
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-primary text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}