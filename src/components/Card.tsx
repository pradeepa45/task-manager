"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";

import { createClient } from "@/utils/supabase/client";
import EditableInput from "./Editable/Input";
import Tag from "./Tag";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "in_progress" | "completed" | "pending";
  due: string;
}

export default function Card({ task }: { task: Task }) {
  const supabase = createClient();

  const [editMode, setMode] = useState(false);
  const [currentTask, setCurrent] = useState(task);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCurrent({
      ...currentTask,
      [name]: value,
    });
  };

  const handleDeleteRequest: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await supabase.from("todos").delete().eq("id", task.id);
  };

  const handleEditRequest: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    if (!editMode) {
      event.preventDefault();
      setMode(true);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({
          title: currentTask.title,
          description: currentTask.description,
          status: currentTask.status,
          due: currentTask.due,
        })
        .eq("id", task.id)
        .select();
      if (!error) {
        setCurrent(data[0]);
        setMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex p-4 text-foreground rounded lg:justify-between lg:flex-row flex-col border border-foreground">
      <form
        className="flex justify-between grow lg:flex-row flex-col lg:gap-4"
        method="POST"
      >
        <div className="flex flex-col grow gap-1 max-w-screen-md">
          <EditableInput
            name="id"
            value={currentTask.id}
            readOnly
            className="hidden"
          />
          <EditableInput
            name="title"
            value={currentTask.title}
            onChange={handleInputChange}
            readOnly={!editMode}
            className="text-foreground font-lg font-bold"
          />

          <textarea
            name="description"
            value={currentTask.description}
            readOnly={!editMode}
            className="text-foreground grow lg:h-14 lg:overflow-scroll lg:line-clamp-2 lg:text-ellipsis resize-none h-32"
            onChange={handleInputChange}
          />
          <div className="flex gap-2 mt-1">
            {editMode ? (
              <EditableInput
                type="date"
                name="due"
                value={currentTask.due}
                onChange={handleInputChange}
                readOnly={!editMode}
              />
            ) : (
              <Tag
                type="status"
                status={currentTask.status}
                due={currentTask.due}
              />
            )}
            {editMode ? (
              <select
                name="status"
                className=""
                value={currentTask.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <Tag
                type="due"
                status={currentTask.status}
                due={currentTask.due}
              />
            )}
          </div>
        </div>
        <div className="flex lg:flex-col gap-2 lg:justify-end flex-row lg:my-0 mt-4">
          <button
            className="border-violet-500 text-violet-500 px-6 py-2 rounded border bg-transparent hover:bg-violet-500 hover:text-white"
            onClick={(event) => handleEditRequest(event)}
          >
            {editMode ? "Save" : "Edit"}
          </button>
          <button
            type="submit"
            className="border border-rose-400 bg-transparent text-rose-400 px-6 py-2 rounded hover:bg-rose-400 hover:text-white"
            onClick={handleDeleteRequest}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
