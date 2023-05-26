import sort from "../../assets/sort.svg";

type TypeTaskButtonProps = {
  onClick: () => void;
  text: string;
};

const TaskFilterButton = ({ onClick, text }: TypeTaskButtonProps) => {
  return (
    <div onClick={onClick} className="flex items-center">
      <p className="cursor-pointer">{text}</p>
      <img src={sort} alt="Sort arrow" className="h-5 cursor-pointer" />
    </div>
  );
};

export default TaskFilterButton;
