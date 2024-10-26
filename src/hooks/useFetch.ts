"use client";

import { ParamInput, Task } from "@/types/common";
import fetchSortFilterData from "@/utils/functions/fetch";
import taskUpdateSubscriber from "@/utils/supabase/subscriptions";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useFetch() {
  const urlSearchParams = useSearchParams();
  const pathname = usePathname();

  const filterBy = urlSearchParams.get("filterBy");
  const value = urlSearchParams.get("value");
  const sort = urlSearchParams.get("sort");
  const page = urlSearchParams.get("page");

  const [data, setData] = useState<Task[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({
    currentPage: parseInt(page || "1"),
    totalPages: 1,
    results: 1,
  });

  const updateUrlParams = (
    params: ParamInput,
    action: "add" | "remove" = "add"
  ) => {
    const newSearchParams = new URLSearchParams(urlSearchParams);
    if (Array.isArray(params)) {
      params.forEach((param) => {
        if (typeof param === "string") {
          if (action === "remove") {
            newSearchParams.delete(param);
          }
        } else {
          if (action === "add") {
            newSearchParams.set(param.key, param.value.toString());
          } else {
            newSearchParams.delete(param.key);
          }
        }
      });
    } else {
      Object.entries(params).forEach(([key, value]) => {
        if (action === "add") {
          newSearchParams.set(key, value.toString());
        } else {
          newSearchParams.delete(key);
        }
      });
    }
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    window.location.href = newUrl;
  };

  useEffect(() => {
    taskUpdateSubscriber(data, setData, setLoading, "updated-todos");
  }, [data]);

  useEffect(() => {
    const customFetch = async () => {
      await fetchSortFilterData(
        meta,
        setLoading,
        setData,
        setMeta,
        setError,
        filterBy ?? undefined,
        value ?? undefined,
        sort ?? undefined
      );
    };
    customFetch();
  }, [filterBy, value, sort]);

  const handleNextPage = () => {
    setMeta({
      ...meta,
      currentPage: meta.currentPage + 1,
    });
    updateUrlParams({ "page": meta.currentPage + 1 }, "add");
  };
  const handlePreviousPage = () => {
    setMeta({
      ...meta,
      currentPage: meta.currentPage - 1,
    });
    updateUrlParams({ "page": meta.currentPage - 1 }, "add");
  };
  return {
    data,
    loading,
    error,
    meta,
    updateUrlParams,
    handleNextPage,
    handlePreviousPage,
  };
}
