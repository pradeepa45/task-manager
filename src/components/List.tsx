"use client";

import { Suspense } from "react";

import useFetch from "@/hooks/useFetch";
import Card from "./Card";
import Pagination from "./Pagination";

export default function TaskList() {
  const { data, loading, error, meta, handleNextPage, handlePreviousPage } =
    useFetch();

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  return (
    <div className="flex flex-col">
      <Suspense fallback={<p>Loading</p>}>
        <div className="task-list">
          {!loading && data ? (
            data?.map((todo) => <Card task={todo} key={todo.id} />)
          ) : (
            <>Loading</>
          )}
        </div>
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
        />
      </Suspense>
    </div>
  );
}
