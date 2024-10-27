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
        color = "text-fuchsia-100 border-fuchsia-500 bg-fuchsia-600";
      else color = "border-lime-500 bg-lime-600 text-lime-100";
    } else if (status === "completed") {
      if (isOverdue)
        color = "text-emerald-100 border-emerald-500 bg-emerald-600";
      else color = "text-sky-200 border-sky-500 bg-sky-500";
    } else {
      if (isOverdue) color = "text-red-100 border-red-400 bg-red-400";
      else color = "text-orange-100 border-orange-300 bg-orange-300";
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
      if (isOverdue) style = "border-amber-500 bg-amber-600 text-amber-50";
      else style = "border-cyan-500 bg-cyan-500 text-cyan-100";
    } else if (status === "completed") {
      if (isOverdue) style = "border-teal-600 bg-teal-600 text-teal-200";
      else style = "border-emerald-600 bg-emerald-600 text-emerald-200";
    } else {
      if (isOverdue) style = "border-orange-600 bg-orange-600 text-orange-200";
      else style = "border-amber-500 bg-amber-500 text-amber-200";
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
