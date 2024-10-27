"use client";

import { useSearchParams } from "next/navigation";
import { BaseSyntheticEvent, memo, useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import { getPrettyDate, getVerbalStatus } from "@/utils/functions/formatter";
import { FilterOption } from "@/types/common";
import useFetch from "@/hooks/useFetch";

function Filter({ column }: { column: string }) {
  const searchParams = useSearchParams();
  const { updateUrlParams } = useFetch();
  const filterBy = searchParams.get("filterBy");
  const value = searchParams.get("value");
  const supabase = createClient();

  const [currentFilter, setFilter] = useState({
    by: filterBy,
    value: value || "-",
  });
  const [active] = useState(currentFilter?.by === column);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDistinctColumnValues = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.rpc(
          "get_distinct_column_values",
          { col: column, tbl: "todos" }
        );
        if (error) {
          console.error("Error fetching distinct values:", error);
          return;
        }
        if (data)
          setFilterOptions([
            ...data,
            {
              value: "-",
            },
          ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDistinctColumnValues();
  }, [column, supabase]);

  const handleClick = (e: BaseSyntheticEvent) => {
    const { value } = e?.target;
    setFilter({
      ...currentFilter,
      value,
    });
    if (value === "-") {
      updateUrlParams(["filterBy", "value"], "remove");
    } else {
      updateUrlParams({ filterBy: column, value: value }, "add", true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="filter-wrapper">
      <strong>{column === "due" ? "due date" : "status"}</strong>
      <select
        className={
          active
            ? "bg-rose-400 border-rose-400"
            : "border-background bg-transparent"
        }
        defaultValue={active ? currentFilter.value : "-"}
        onChange={handleClick}
      >
        {filterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {column === "due"
              ? getPrettyDate(option.value)
              : getVerbalStatus(option.value)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(Filter);
