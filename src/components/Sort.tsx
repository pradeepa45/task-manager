"use client";

import useFetch from "@/hooks/useFetch";
import { ArrangeByLettersAZIcon, SortByDown02Icon } from "hugeicons-react";
import { useSearchParams } from "next/navigation";
import { memo, useState } from "react";

function Sort({ param }: { param: string }) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [active] = useState(sort === param);
  const { updateUrlParams } = useFetch();

  function handleClick() {
    if (active) {
      updateUrlParams(["sort", "page"], "remove");
    } else {
      updateUrlParams({ sort: param }, "add", true);
    }
  }

  return (
    <button className="sort-button" onClick={handleClick}>
      <input type="checkbox" defaultChecked={active} />
      <span>
        {param === "due" ? <SortByDown02Icon /> : <ArrangeByLettersAZIcon />}
      </span>
      <span className="capitalize">
        {param === "due" ? "due date" : "status"}
      </span>
    </button>
  );
}

export default memo(Sort);
