import axios from "axios";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { EditTaskData } from "./types/TypeEditTask";
import { TypeTask } from "./types/TypeTask";

export const setTaskAsEditable = (
  databaseConnection: boolean,
  isClicked: boolean,
  isEditable: boolean,
  setIsEditable: Dispatch<SetStateAction<boolean>>,
  editTaskData: EditTaskData,
  tasks: TypeTask[],
  id?: string
): TypeTask[] => {
  setIsEditable(!isEditable);
  if (databaseConnection) {
    if (isEditable && isClicked) {
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        return tasks;
      }
      axios
        .put(`${SERVER_URL}/api/tasks/${id}`, {
          id: task.id,
          priority: editTaskData.priority,
          taskName: editTaskData.taskName,
          dueDate: format(new Date(editTaskData.dueDate!), "d LLL yyyy"),
          completionDate: task.completionDate,
          done: task.done,
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
  return tasks.map((el) =>
    el.id === id && isEditable && isClicked
      ? {
          ...el,
          priority: editTaskData.priority,
          taskName: editTaskData.taskName,
          dueDate: format(new Date(editTaskData.dueDate!), "d LLL yyyy"),
        }
      : el
  );
};
