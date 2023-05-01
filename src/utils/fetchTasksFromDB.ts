import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "../../config";
import { TypeTask } from "./types/TypeTask";

type fetchTasksFromDBProps = {
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  setDatabaseConnection: Dispatch<SetStateAction<boolean>>;
};
export const fetchTasksFromDB = async ({
  setTasks,
  setIsModalOpen,
  setModalMessage,
  setDatabaseConnection,
}: fetchTasksFromDBProps) => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/tasks`);
    setTasks(res.data.tasks);
  } catch {
    setIsModalOpen(true);
    setModalMessage(
      "You don't have a connection to the database. The application is running in offline mode. Your tasks will not be saved to the server. Integration is intentionally disabled due to the possibility of adding offensive content by users."
    );
    if (setDatabaseConnection) {
      setDatabaseConnection(false);
    }
  }
};
