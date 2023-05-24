import highPriority from "../../assets/high-priority.svg";
import lowPriority from "../../assets/low-priority.svg";
import mediumPriority from "../../assets/medium-priority.svg";

type TypeDisplayPriorityProps = {
  priority: number;
};

const DisplayPriority = ({ priority }: TypeDisplayPriorityProps) => {
  const icon: string[] = [lowPriority, mediumPriority, highPriority];

  return (
    <img
      className="mx-auto my-auto h-full w-auto"
      src={icon[priority - 1]}
      alt="Priority icon"
    />
  );
};

export default DisplayPriority;
