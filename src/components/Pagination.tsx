import { ArrowLeft02Icon, ArrowRight02Icon } from "hugeicons-react";
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
    <div className="pagination-bar">
      <button onClick={onPrevious} disabled={currentPage === 1}>
        <ArrowLeft02Icon size={24} />
      </button>
      <span className="page-number">{currentPage}</span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        <ArrowRight02Icon size={24} />
      </button>
    </div>
  );
}
