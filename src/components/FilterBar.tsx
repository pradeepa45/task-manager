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
    <div className="flex gap-4 mb-4 flex-col">
      <details className="flex gap-2 flex-col">
        <summary className="border-b border-foreground">Sort</summary>
        <div className="py-4 flex flex-col gap-4">
          <Sort param="due" />
          <Sort param="status" />
        </div>
      </details>
      <details className="flex gap-3 flex-col">
        <summary className="border-b border-foreground">Filter</summary>
        <div className="py-4 flex flex-col gap-4">
          <Filter column="due" />
          <Filter column="status" />
        </div>
      </details>
      <button onClick={handleReset} disabled={!isResetButtonEnabled()}>
        Reset filters
      </button>
    </div>
  );
}
