import clsx from "clsx";

import { getVerbalStatus, timeAgo } from "@/utils/functions/formatter";

export default function Tag({
  type,
  due,
  status,
}: {
  type: "due" | "status";
  due: string;
  status: string;
}) {
  const isOverdue = new Date(due) < new Date();
  if (type == "due") {
    let color;
    if (status === "in_progress") {
      if (isOverdue)
        color = "bg-fuchsia-100 border-fuchsia-500 text-fuchsia-600";
      else color = "border-lime-500 text-lime-600 bg-lime-100";
    } else if (status === "completed") {
      if (isOverdue)
        color = "bg-emerald-100 border-emerald-500 text-emerald-600";
      else color = "bg-sky-200 border-sky-500 text-sky-500";
    } else {
      if (isOverdue) color = "bg-red-100 border-red-400 text-red-400";
      else color = "bg-orange-100 border-orange-300 text-orange-300";
    }
    return (
      <div
        className={clsx(
          color,
          "tag",
          status === "completed" ? "line-through" : undefined
        )}
        id="due-tag"
      >
        due {timeAgo(due)}
      </div>
    );
  } else {
    let style;
    if (status === "in_progress") {
      if (isOverdue) style = "border-amber-500 text-amber-500 bg-amber-100";
      else style = "border-cyan-500 text-cyan-500 bg-cyan-100";
    } else if (status === "completed") {
      if (isOverdue) style = "border-teal-600 text-teal-600 bg-teal-200";
      else style = "border-emerald-600 text-emerald-600 bg-emerald-200";
    } else {
      if (isOverdue) style = "border-orange-600 text-orange-600 bg-orange-200";
      else style = "border-amber-500 text-amber-500 bg-amber-200";
    }
    return (
      <div
        className={clsx(
          style,
          "tag",
          status === "completed" ? "line-through" : undefined
        )}
        id="status-tag"
      >
        {getVerbalStatus(status)}
      </div>
    );
  }
}
