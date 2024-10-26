import { getPrettyDate, getVerbalStatus } from "@/utils/functions/formatter";

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
      if (isOverdue) color = "bg-amber-500";
      else color = "bg-lime-400";
    } else if (status === "completed") {
      if (isOverdue) color = "bg-emerald-400";
      else color = "bg-sky-400";
    } else {
      if (isOverdue) color = "bg-red-400";
      else color = "bg-orange-300";
    }
    return (
      <div className={`${color} text-white rounded py-1 px-2`}>
        Due on {getPrettyDate(due)}
      </div>
    );
  } else {
    let color;
    if (status === "in_progress") {
      if (isOverdue) color = "bg-amber-500";
      else color = "bg-cyan-500";
    } else if (status === "completed") {
      if (isOverdue) color = "bg-teal-600";
      else color = "bg-neutral-400";
    } else {
      if (isOverdue) color = "bg-orange-800";
      else color = "bg-amber-200";
    }
    return (
      <div className={`${color} text-neutral-50 rounded py-1 px-2`}>
        {getVerbalStatus(status)}
      </div>
    );
  }
}
