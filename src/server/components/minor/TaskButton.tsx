import clsx from "clsx";

type TypeTaskButtonProps = {
  icon: string;
  message: string;
  onClick: () => void;
  isEditable?: boolean;
  done?: boolean;
};

const TaskButton = ({
  icon,
  message,
  onClick,
  isEditable,
  done,
}: TypeTaskButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        (isEditable && "blur-sm") || (done && "opacity-0"),
        "my-1 flex w-[28%] items-center justify-center rounded border border-Navy text-center text-xs font-bold uppercase text-Navy duration-300 hover:bg-Navy/[.10] sm:justify-start"
      )}
      disabled={isEditable || done}
    >
      <img
        className="mr-1 hidden sm:block sm:h-full"
        src={icon}
        alt="Action icon"
      />
      {message}
    </button>
  );
};

export default TaskButton;
