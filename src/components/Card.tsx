"use client";

import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import {
  Edit01Icon,
  Delete01Icon,
  TickDouble01Icon,
  Calendar04Icon,
  Clock04Icon,
} from "hugeicons-react";

import { createClient } from "@/utils/supabase/client";
import EditableInput from "./Editable/Input";
import Tag from "./Tag";
import { createdAt, getPrettyDate } from "@/utils/functions/formatter";
import { Task } from "@/types/common";
import clsx from "clsx";

export default function Card({ task, order }: { task: Task; order: number }) {
  const supabase = createClient();

  const [editMode, setMode] = useState(false);
  const [currentTask, setCurrent] = useState(task);

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setCurrent({
      ...currentTask,
      [name]: value,
    });
  };

  const handleDeleteRequest: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item? This action cannot be undone."
    );
    if (isConfirmed) {
      try {
        await supabase.from("todos").delete().eq("id", task.id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleEditRequest: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!editMode) {
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
    <div className={clsx("card", `delay-[${(order + 1) * 1000}ms]`)}>
      <form method="POST">
        <div>
          <div className="card-header">
            <EditableInput
              name="title"
              value={currentTask.title}
              onChange={handleInputChange}
              readOnly={!editMode}
              className="font-lg font-bold"
            />
            <div className="buttons-list">
              <button
                className="edit-button"
                onClick={(event) => handleEditRequest(event)}
              >
                {editMode ? (
                  <TickDouble01Icon size={24} />
                ) : (
                  <Edit01Icon size={24} />
                )}
              </button>
              <button
                type="submit"
                className="delete-button"
                onClick={handleDeleteRequest}
              >
                <Delete01Icon size={24} />
              </button>
            </div>
          </div>
          <div className="tags">
            <Tag
              type="status"
              status={currentTask.status}
              due={currentTask.due}
            />
            <Tag type="due" status={currentTask.status} due={currentTask.due} />
          </div>
        </div>
        <div className="card-body">
          <input name="id" value={currentTask.id} readOnly className="hidden" />
          <textarea
            name="description"
            value={currentTask.description}
            readOnly={!editMode}
            onChange={handleInputChange}
          />
          <div className="flex gap-2 justify-between">
            {editMode ? (
              <div className="flex items-center gap-2 justify-center">
                <EditableInput
                  type="date"
                  name="due"
                  value={currentTask.due}
                  onChange={handleInputChange}
                  readOnly={!editMode}
                />
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleInputChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 justify-center">
                <Calendar04Icon size={20} />
                <span className="leading-2 inline-flex items-center gap-1">
                  <>Due on</>
                  <span className="due-date">
                    {getPrettyDate(currentTask.due)}
                  </span>
                </span>
              </div>
            )}
            {!editMode && (
              <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
                <Clock04Icon size={16} />
                <em>created</em>
                <em>{createdAt(currentTask.created_at)}</em>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
