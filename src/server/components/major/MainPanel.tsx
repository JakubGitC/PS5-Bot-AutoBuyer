import { format } from "date-fns";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchTasksFromDB } from "../../utils/fetchTasksFromDB";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
import { handlePriority } from "../../utils/handlePriority";
import { handleSubmit } from "../../utils/handleSubmit";
import { TypeDatabaseConnection } from "../../utils/types/TypeDatabaseConnection";
import { TypeTask } from "../../utils/types/TypeTask";
import DisplayPriority from "../minor/DisplayPriority";
import FormInput from "../minor/FormInput";
import FormModal from "../minor/FormModal";

import addButton from "../../assets/add.svg";

type TypeMainPanelProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};
const MainPanel = ({
  tasks,
  setTasks,
  databaseConnection,
  setDatabaseConnection,
}: TypeMainPanelProps & TypeDatabaseConnection) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [task, setTask] = useState<TypeTask>({
    id: uuidv4(),
    priority: 1,
    taskName: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    completionDate: "",
    done: false,
  });

  const handleChangeFormInputsUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeFormInputs({ e, data: task, setData: setTask });
    },
    [task]
  );

  useEffect(() => {
    if (setDatabaseConnection) {
      (async () => {
        await fetchTasksFromDB({
          setTasks,
          setIsModalOpen,
          setModalMessage,
          setDatabaseConnection,
        });
      })();
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      {isModalOpen && (
        <FormModal
          title={"Error"}
          message={modalMessage}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="my-2 sm:my-5">
        <h1 className="text-3xl font-bold uppercase text-Alice-Blue sm:text-4xl">
          To-Do app
        </h1>
      </div>
      <form
        onSubmit={handleSubmit({
          task,
          setTask,
          tasks,
          setTasks,
          setIsModalOpen,
          setModalMessage,
          databaseConnection,
        })}
        className="left-0 top-0 z-30 w-full rounded-xl bg-gradient-to-br from-Alice-Blue to-Periwinkle-Crayola p-3 shadow-[3px_4px_0px_0px_rgba(168,178,209)] sm:p-5"
      >
        <div className="mb-1 flex h-full w-full flex-wrap items-center justify-center sm:mb-3 sm:flex-row sm:flex-nowrap">
          <div className="order-3 ml-3 mt-3 sm:order-1 sm:mr-2 sm:mt-0">
            <label className="ml-2 flex text-xs font-bold text-Navy">
              Priority
            </label>
            <div
              className="h-10 w-auto cursor-pointer"
              onClick={() => handlePriority({ data: task, setData: setTask })}
            >
              <DisplayPriority priority={task.priority} />
            </div>
          </div>
          <FormInput
            name={"taskName"}
            type={"text"}
            textLabel={"Task name"}
            placeholder={"Your task Name"}
            value={task.taskName}
            onChange={handleChangeFormInputsUseCallback}
          />
          <FormInput
            name={"dueDate"}
            type={"date"}
            textLabel={"Date"}
            value={task.dueDate}
            onChange={handleChangeFormInputsUseCallback}
            min={format(new Date(), "yyyy-MM-dd")}
            max="2025-12-31"
          />
          <button
            type="submit"
            className="order-4 ml-3 w-[20%] translate-y-1.5 sm:w-[10%]"
          >
            <img className="w-[90%]" src={addButton} alt="Add button" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainPanel;
