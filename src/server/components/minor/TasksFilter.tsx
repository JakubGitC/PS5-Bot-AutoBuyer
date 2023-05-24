import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { handleSortTasks } from "../../utils/handleSortTasks";
import { TypeTask } from "../../utils/types/TypeTask";
import TaskFilterButton from "./TaskFilterButton";

type TypeTaskFilterProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
  isDoneTask: boolean;
};

const TaskFilter = ({ tasks, setTasks, isDoneTask }: TypeTaskFilterProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSortTasksUseCallback = useCallback(
    (sortBy: "priority" | "taskName" | "dueDate" | "completionDate") =>
      handleSortTasks({
        sortBy,
        sortOrder,
        setSortOrder,
        tasks,
        setTasks,
      }),
    [sortOrder, tasks]
  );

  return (
    <div className="flex h-8 w-full justify-around bg-Alice-Blue text-[10px] font-bold text-Space-Cadet shadow-[3px_4px_0px_0px_rgba(204,214,246)] sm:text-xs">
      <TaskFilterButton
        onClick={() => handleSortTasksUseCallback("priority")}
        text={"Priority"}
      />
      <TaskFilterButton
        onClick={() => handleSortTasksUseCallback("taskName")}
        text={"Task name"}
      />
      <TaskFilterButton
        onClick={() =>
          handleSortTasksUseCallback(isDoneTask ? "dueDate" : "completionDate")
        }
        text={"Date"}
      />
    </div>
  );
};

export default TaskFilter;
