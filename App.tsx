import { useState } from "react";
import background from "./assets/bg.svg";
import MainPanel from "./components/major/MainPanel";
import TasksContainer from "./components/major/TasksContainer";
import { TypeTask } from "./utils/types/TypeTask";

const App = () => {
  const [tasks, setTasks] = useState<TypeTask[]>([]);
  const [databaseConnection, setDatabaseConnection] = useState<boolean>(true);

  return (
    <div className="mx-auto flex w-[90vw] flex-col sm:w-[95vw] lg:w-2/3 xl:w-1/2">
      <img id="background" src={background} alt="Background" />
      <MainPanel
        tasks={tasks}
        setTasks={setTasks}
        databaseConnection={databaseConnection}
        setDatabaseConnection={setDatabaseConnection}
      />
      <TasksContainer
        tasks={tasks}
        setTasks={setTasks}
        databaseConnection={databaseConnection}
        setDatabaseConnection={setDatabaseConnection}
      />
    </div>
  );
};

export default App;
