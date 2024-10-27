"use client";

import { useSearchParams } from "next/navigation";
import Filter from "./Filter";
import Sort from "./Sort";

export default function Filters() {
  const searchParams = useSearchParams();
  const filterBy = searchParams.get("filterBy");
  const value = searchParams.get("value");
  const sort = searchParams.get("sort");

  function handleReset() {
    window.location.href = "/";
  }
  function isResetButtonEnabled() {
    return (filterBy && value) || sort;
  }

  return (
    <div className="filter-bar">
      <details open={sort ? true : false}>
        <summary>Sort</summary>
        <div className="filters">
          <Sort param="due" />
          <Sort param="status" />
        </div>
      </details>
      <details open={filterBy && value ? true : false}>
        <summary>Filter</summary>
        <div className="filters">
          <Filter column="due" />
          <Filter column="status" />
        </div>
      </details>
      <button
        onClick={handleReset}
        disabled={!isResetButtonEnabled()}
        className="reset-button"
      >
        Reset filters
      </button>
    </div>
  );
}
