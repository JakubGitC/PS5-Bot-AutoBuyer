import { ChangeEvent } from "react";

type HandleChangeFormInputsProps<T> = {
  e: ChangeEvent<HTMLInputElement>;
  data: T;
  setData: (data: T) => void;
};
export const handleChangeFormInputs = <T>({
  e,
  data,
  setData,
}: HandleChangeFormInputsProps<T>) => {
  setData({
    ...data,
    [e.target.name]: e.target.value,
  });
};
