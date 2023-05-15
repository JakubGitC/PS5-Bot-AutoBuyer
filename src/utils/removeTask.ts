import axios from "axios";
import { SERVER_URL } from "../../config";
import { TypeTask } from "./types/TypeTask";

export const removeTask = (
  databaseConnection: boolean,
  tasks: TypeTask[],
  id?: string
): TypeTask[] => {
  if (databaseConnection) {
    axios.delete(`${SERVER_URL}/api/tasks/${id}`).catch((e) => {
      console.error(e);
    });
  }
  return tasks.filter((el) => el.id !== id);
};
