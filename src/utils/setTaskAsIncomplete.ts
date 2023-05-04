import axios from "axios";
import { format } from "date-fns";
import { SERVER_URL } from "../../config";
import { TypeTask } from "./types/TypeTask";

export const setTaskAsIncomplete = (
  databaseConnection: boolean,
  tasks: TypeTask[],
  id?: string
): TypeTask[] => {
  if (databaseConnection) {
    axios
      .patch(
        `${SERVER_URL}/api/tasks/${id}/${format(new Date(), "d LLL yyyy")}`
      )
      .catch((e) => {
        console.error(e);
      });
  }
  return tasks.map((el) =>
    el.id === id
      ? {
          ...el,
          done: false,
        }
      : el
  );
};
