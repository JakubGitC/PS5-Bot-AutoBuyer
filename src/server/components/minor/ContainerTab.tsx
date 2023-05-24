import clsx from "clsx";

type TypeContainerTabProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const ContainerTab = ({ title, active, onClick }: TypeContainerTabProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        active
          ? "bg-gradient-to-t from-Alice-Blue to-Wild-Blue-Yonder"
          : "bg-Alice-Blue",
        "w-1/2 cursor-pointer rounded-t-xl bg-Alice-Blue py-3 shadow-[3px_4px_0px_0px_rgba(204,214,246)] duration-300"
      )}
    >
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
};

export default ContainerTab;
