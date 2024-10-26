import { handleCreateTask } from "@/app/create";
import FormField from "./Form/Field";
import Label from "./Form/Label";

export default function NewTaskForm() {
  return (
    <form
      className="flex flex-col gap-2 py-4 lg:mb-10"
      action={handleCreateTask}
    >
      <FormField>
        <Label name="title" label="Title" />
        <input name="title" className=" border border-foreground" required />
      </FormField>
      <FormField>
        <Label name="description" label="Description" />
        <textarea
          name="description"
          className=" border border-foreground resize-none"
        />
      </FormField>
      <FormField>
        <Label name="status" label="status" />
        <select name="status" className="grow !p-2  border border-foreground">
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
          className=" border border-foreground"
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </FormField>
      <button type="submit">Add</button>
    </form>
  );
}
