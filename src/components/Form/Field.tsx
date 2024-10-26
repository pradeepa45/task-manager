import clsx from "clsx";
import React from "react";

export default function FormField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(className, "flex flex-col mb-2")}>{children}</div>
  );
}
