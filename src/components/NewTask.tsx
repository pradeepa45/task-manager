"use client";

import { handleCreateTask } from "@/app/create";
import FormField from "./Form/Field";
import Label from "./Form/Label";
import { useRef } from "react";

export default function NewTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await handleCreateTask(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} className="new-task-form" action={handleSubmit}>
      <FormField>
        <Label name="title" label="Title" />
        <input name="title" required />
      </FormField>
      <FormField>
        <Label name="description" label="Description" />
        <textarea name="description" className="resize-none" />
      </FormField>
      <FormField>
        <Label name="status" label="status" />
        <select name="status" className="grow !p-2">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </FormField>
      <FormField>
        <Label name="due" label="Due date" />
        <input
          type="date"
          name="due"
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </FormField>
      <button type="submit">Add</button>
    </form>
  );
}
