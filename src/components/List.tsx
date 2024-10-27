"use client";

import { Suspense } from "react";

import useFetch from "@/hooks/useFetch";
import Card from "./Card";
import Pagination from "./Pagination";
import Loading from "./Loading";

export default function TaskList() {
  const { data, loading, error, meta, handleNextPage, handlePreviousPage } =
    useFetch();

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  return (
    <div className="flex flex-col lg:px-0 px-6">
      <Suspense fallback={<Loading />}>
        <div className="task-list">
          {!loading && data ? (
            data?.map((todo, index) => (
              <Card task={todo} key={todo.id} order={index} />
            ))
          ) : (
            <Loading />
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
