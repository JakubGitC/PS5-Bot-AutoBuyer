import clsx from "clsx";
import { format } from "date-fns";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { handleChangeFormInputs } from "../../utils/handleChangeFormInputs";
import { handleClickOutside } from "../../utils/handleClickOutside";
import { handlePriority } from "../../utils/handlePriority";
import { removeTask } from "../../utils/removeTask";
import { setTaskAsCompleted } from "../../utils/setTaskAsCompleted";
import { setTaskAsEditable } from "../../utils/setTaskAsEditable";
import { setTaskAsIncomplete } from "../../utils/setTaskAsIncomplete";
import { TypeDatabaseConnection } from "../../utils/types/TypeDatabaseConnection";
import { EditTaskData } from "../../utils/types/TypeEditTask";
import { TypeTask } from "../../utils/types/TypeTask";
import DisplayPriority from "../minor/DisplayPriority";
import FormInput from "../minor/FormInput";
import TaskButton from "../minor/TaskButton";

import completed from "../../assets/completed.svg";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import undo from "../../assets/undo.svg";

type TypeTaskProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};

const Task = ({
  databaseConnection,
  tasks,
  setTasks,
  id,
  priority,
  taskName,
  dueDate,
  completionDate,
  done,
}: TypeTask & TypeTaskProps & TypeDatabaseConnection) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isClickedDelay, setIsClickedDelay] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<EditTaskData>({
    taskName: taskName,
    dueDate: dueDate,
    priority: priority,
  });

  const refElement = useRef<HTMLDivElement>(null);

  const handleChangeFormInputsUseCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChangeFormInputs({ e, data: editTask, setData: setEditTask });
    },
    [editTask]
  );

  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside({ refElement, setIsClicked }),
      true
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside({ refElement, setIsClicked }),
        true
      );
    };
  }, []);

  useEffect(() => {
    if (isClicked !== isClickedDelay && !isClicked) {
      setTimeout(() => {
        setIsClickedDelay(!isClickedDelay);
      }, 300);
    } else if (isClicked !== isClickedDelay && isClicked) {
      setIsClickedDelay(!isClickedDelay);
    }

    if (!isClicked) {
      setIsEditable(false);
      setEditTask({
        taskName: taskName,
        dueDate: dueDate,
        priority: priority,
      });
    }
  }, [isClicked]);

  return (
    <div>
      <div
        className={clsx(
          isClickedDelay ? "block" : "hidden",
          "fixed inset-0 z-30 bg-Navy bg-opacity-50 backdrop-blur"
        )}
      />
      <div
        ref={refElement}
        className={clsx(
          isClickedDelay
            ? "z-50 scale-[1.03] lg:scale-110"
            : "cursor-pointer shadow-[3px_4px_0px_0px_rgba(204,214,246)]",
          "relative h-16 w-full duration-150 sm:h-24"
        )}
      >
        <div
          onClick={() => setIsClicked(true)}
          className={clsx(
            isClickedDelay
              ? "z-40 rounded-lg bg-Periwinkle-Crayola"
              : "z-20 bg-Alice-Blue",
            "absolute left-0 top-0 flex h-full w-full items-center pr-2 duration-150"
          )}
        >
          <div
            className={clsx(
              isEditable && "cursor-pointer",
              "h-2/4 w-[15%] sm:h-2/3 sm:w-[13%]"
            )}
            onClick={
              isEditable
                ? () => handlePriority({ data: editTask, setData: setEditTask })
                : undefined
            }
          >
            <DisplayPriority
              priority={isEditable ? editTask.priority : priority}
            />
          </div>
          <div className={clsx(isEditable ? "w-[47%] sm:w-[70%]" : "w-[70%]")}>
            {isEditable ? (
              <FormInput
                name={"taskName"}
                type={"text"}
                placeholder="Your task Name"
                value={editTask.taskName}
                onChange={handleChangeFormInputsUseCallback}
              />
            ) : (
              <p className="wra ml-2 break-all text-sm sm:text-base sm:font-bold">
                {taskName}
              </p>
            )}
          </div>
          <div
            className={clsx(
              isEditable ? "w-[40%] sm:w-fit" : "w-[15%]",
              "text-center"
            )}
          >
            {isEditable ? (
              <FormInput
                name={"dueDate"}
                type={"date"}
                value={editTask.dueDate}
                onChange={handleChangeFormInputsUseCallback}
                min={format(new Date(), "yyyy-MM-dd")}
                max="2025-12-31"
              />
            ) : (
              <>
                <div>
                  <p className="text-xs font-bold">{done ? "Done:" : "Due:"}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm">
                    {done
                      ? `${format(new Date(completionDate!), "d LLL yyyy")}`
                      : `${format(new Date(dueDate!), "d LLL yyyy")}`}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={clsx(
            isClicked ? "translate-y-20 sm:translate-y-32" : "translate-y-0",
            isClickedDelay ? "z-30" : "z-10",
            "absolute left-[16.66%] flex h-1/2 w-2/3 justify-around rounded-lg bg-Periwinkle-Crayola duration-300"
          )}
        >
          {done ? (
            <TaskButton
              icon={undo}
              onClick={() =>
                setTasks(setTaskAsIncomplete(databaseConnection, tasks, id))
              }
              message={"Undo"}
              isEditable={isEditable}
            />
          ) : (
            <TaskButton
              icon={completed}
              onClick={() =>
                setTasks(setTaskAsCompleted(databaseConnection, tasks, id))
              }
              message={"Done"}
              isEditable={isEditable}
            />
          )}
          <TaskButton
            icon={edit}
            onClick={() =>
              setTasks(
                setTaskAsEditable(
                  databaseConnection,
                  isClicked,
                  isEditable,
                  setIsEditable,
                  editTask,
                  tasks,
                  id
                )
              )
            }
            message={isEditable ? "Save" : "Edit"}
            done={done}
          />
          <TaskButton
            icon={remove}
            onClick={() => setTasks(removeTask(databaseConnection, tasks, id))}
            message={"Remove"}
            isEditable={isEditable}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
