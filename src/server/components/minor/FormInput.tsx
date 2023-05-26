import clsx from "clsx";
import { ChangeEventHandler } from "react";

type FormInputProps = {
  textLabel?: string;
  placeholder?: string;
  name: string;
  type: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  min?: string;
  max?: string;
};
const FormInput = ({
  textLabel,
  placeholder,
  name,
  type,
  value,
  onChange,
  min,
  max,
}: FormInputProps) => {
  return (
    <label
      htmlFor={name}
      className={clsx(
        placeholder ? "order-1 w-full" : "order-2",
        textLabel ? placeholder && "sm:w-[70%]" : placeholder && "sm:w-full",
        "flex flex-col pl-1 text-xs font-bold text-Navy sm:pl-2"
      )}
    >
      {textLabel && <span className="ml-2">{textLabel}</span>}
      <input
        className="h-10 w-full appearance-none rounded border-2 border-Wild-Blue-Yonder bg-Wild-Blue-Yonder px-2 py-1 text-sm font-medium leading-tight text-Navy placeholder-Navy shadow-[3px_4px_0px_0px_rgba(10,25,47)] focus:border-Navy focus:bg-Alice-Blue focus:outline-none"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </label>
  );
};

export default FormInput;
