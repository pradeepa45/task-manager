import TaskList from "@/components/List";
import Filters from "@/components/FilterBar";
import NewTaskForm from "@/components/NewTask";

export default async function Home() {
  return (
    <div className=" flex lg:flex-row flex-col">
      <main className="flex md:flex-row md:items-start gap-8 md:justify-between flex-col items-center basis-full">
        <aside>
          <h1>Task Manager</h1>
          <details className="flex gap-2 flex-col" open>
            <summary className="border-b border-foreground">
              Add a new task
            </summary>
            <section className="flex flex-col">
              <NewTaskForm />
            </section>
          </details>
          <Filters />
        </aside>
        <section className="flex flex-col xl:pt-20 lg:basis-full w-full lg:justify-start">
          <TaskList />
        </section>
      </main>
    </div>
  );
}
