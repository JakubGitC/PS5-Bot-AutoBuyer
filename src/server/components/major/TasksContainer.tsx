import { Dispatch, SetStateAction, useState } from "react";
import { TypeDatabaseConnection } from "../../utils/types/TypeDatabaseConnection";
import { TypeTask } from "../../utils/types/TypeTask";
import ContainerTab from "../minor/ContainerTab";
import TaskFilter from "../minor/TasksFilter";
import Task from "./Task";

type TypeTasksContainerProps = {
  tasks: TypeTask[];
  setTasks: Dispatch<SetStateAction<TypeTask[]>>;
};

const TasksContainer = ({
  tasks,
  setTasks,
  databaseConnection,
}: TypeTasksContainerProps & TypeDatabaseConnection) => {
  const [isDoneTask, setIsDoneTask] = useState<boolean>(true);
  return (
    <div className="my-5 flex w-full flex-col items-center sm:my-10">
      <div className="flex w-full justify-around text-center">
        <ContainerTab
          title={"To-Do Tasks"}
          active={isDoneTask}
          onClick={() => setIsDoneTask(true)}
        />
        <ContainerTab
          title={"Done Tasks"}
          active={!isDoneTask}
          onClick={() => setIsDoneTask(false)}
        />
      </div>
      <TaskFilter tasks={tasks} setTasks={setTasks} isDoneTask={isDoneTask} />
      <div className="w-full">
        {isDoneTask ? (
          <>
            {tasks.map((el) => {
              if (!el.done) {
                return (
                  <Task
                    databaseConnection={databaseConnection}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={el.id}
                    id={el.id}
                    priority={el.priority}
                    taskName={el.taskName}
                    dueDate={el.dueDate}
                    done={el.done}
                  />
                );
              }
            })}
          </>
        ) : (
          <>
            {tasks.map((el) => {
              if (el.done) {
                return (
                  <Task
                    databaseConnection={databaseConnection}
                    tasks={tasks}
                    setTasks={setTasks}
                    key={el.id}
                    id={el.id}
                    priority={el.priority}
                    taskName={el.taskName}
                    completionDate={el.completionDate}
                    done={el.done}
                  />
                );
              }
            })}
          </>
        )}
      </div>
      <div className="z-10 h-[6vh] w-full rounded-b-xl bg-Alice-Blue shadow-[3px_4px_0px_0px_rgba(204,214,246)]" />
    </div>
  );
};

export default TasksContainer;
