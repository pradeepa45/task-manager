"use client";

import useFetch from "@/hooks/useFetch";
import clsx from "clsx";
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
      updateUrlParams({ sort: param }, "add");
    }
  }

  return (
    <button
      className={clsx(
        "py-2 px-0 rounded flex whitespace-nowrap gap-2 items-center ",
        "bg-background text-foreground"
      )}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        defaultChecked={active}
        className="accent-accent"
      />
      <span className="capitalize">
        {param === "due" ? "due date" : "status"}
      </span>
    </button>
  );
}

export default memo(Sort);
