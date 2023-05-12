import { Dispatch, SetStateAction } from "react";
import { TypeTask } from "./types/TypeTask";

type TypeHandleSortTasksProps = {
  sortBy: "priority" | "taskName" | "dueDate" | "completionDate";
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};
export const handleSortTasks = ({
  sortBy,
  sortOrder,
  setSortOrder,
  tasks,
  setTasks,
}: TypeHandleSortTasksProps) => {
  setSortOrder(sortOrder === "asc" ? "desc" : "asc");

  setTasks(
    [...tasks].sort((a, b) => {
      if (sortBy === "priority") {
        return sortOrder === "asc"
          ? a.priority - b.priority
          : b.priority - a.priority;
      } else if (sortBy === "taskName") {
        return sortOrder === "asc"
          ? a.taskName.localeCompare(b.taskName)
          : b.taskName.localeCompare(a.taskName);
      } else if (sortBy === "dueDate") {
        const dueDateA = a.dueDate || 0;
        const dueDateB = b.dueDate || 0;
        return sortOrder === "asc"
          ? new Date(dueDateA).getTime() - new Date(dueDateB).getTime()
          : new Date(dueDateB).getTime() - new Date(dueDateA).getTime();
      } else if (sortBy === "completionDate") {
        const completionDateA = a.completionDate || 0;
        const completionDateB = b.completionDate || 0;
        return sortOrder === "asc"
          ? new Date(completionDateA).getTime() -
              new Date(completionDateB).getTime()
          : new Date(completionDateB).getTime() -
              new Date(completionDateA).getTime();
      } else {
        return 0;
      }
    })
  );
};
