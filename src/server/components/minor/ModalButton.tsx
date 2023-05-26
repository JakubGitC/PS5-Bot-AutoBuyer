import clsx from "clsx";
import { MouseEvent } from "react";

type TypeModalButtonProps = {
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | undefined;
  text: string;
};

const ModalButton = ({
  className,
  type,
  onClick,
  text,
}: TypeModalButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        "rounded border border-Alice-Blue px-6 py-2 uppercase text-Alice-Blue duration-300 hover:bg-Alice-Blue/[.10]"
      )}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ModalButton;
