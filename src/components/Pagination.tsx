import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <div className="flex gap-6 mt-6 items-center justify-center">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-fit"
      >
        Previous
      </button>
      <span>page {currentPage}</span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="w-fit"
      >
        Next
      </button>
    </div>
  );
}
