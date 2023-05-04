import axios from "axios";
import { format } from "date-fns";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { SERVER_URL } from "../../config";
import { TypeTask } from "./types/TypeTask";

type TypeHandleSubmitProps = {
  task: TypeTask;
  setTask: Dispatch<SetStateAction<TypeTask>>;
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  databaseConnection: boolean;
};

export const handleSubmit =
  ({
    task,
    setTask,
    tasks,
    setTasks,
    setIsModalOpen,
    setModalMessage,
    databaseConnection,
  }: TypeHandleSubmitProps) =>
  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.taskName || !task.dueDate) {
      setModalMessage(
        "One or more fields are empty. Please fill in all fields to add a task."
      );
      setIsModalOpen(true);
      return;
    }

    const dataRegexp = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegexp.test(task.dueDate)) {
      console.log(new Date().toLocaleDateString());
      setModalMessage(
        "The date field contains an invalid value. Please correct this field to add a task."
      );
      setIsModalOpen(true);
      return;
    }
    if (databaseConnection) {
      axios.post(`${SERVER_URL}/api/tasks`, task).catch((e) => {
        console.error(e);
      });
    }

    setTasks([...tasks, task]);
    setTask({
      id: uuidv4(),
      priority: 1,
      taskName: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      completionDate: "",
      done: false,
    });
  };
