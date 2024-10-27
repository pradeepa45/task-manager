import clsx from "clsx";
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
  const shouldShowPagination = totalPages > 1;
  return (
    <div className={clsx("pagination-bar", !shouldShowPagination && "!hidden")}>
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
