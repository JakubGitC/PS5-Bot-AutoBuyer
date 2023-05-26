import { Dispatch, SetStateAction, useCallback } from "react";
import ModalButton from "./ModalButton";

type TypeFormModalProps = {
  title: string;
  message: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const FormModal = ({ title, message, setIsModalOpen }: TypeFormModalProps) => {
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="z-50">
      <div className="fixed inset-0 bg-Navy bg-opacity-70 backdrop-blur" />
      <div className="fixed left-1/2 top-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 space-y-5 rounded-xl bg-Navy px-8 py-6 text-center text-white drop-shadow-lg sm:w-96">
        <h1 className="text-2xl font-semibold text-Alice-Blue">{title}</h1>
        <div className="border-b border-t border-Alice-Blue py-5">
          <p className="text-sm text-Alice-Blue sm:text-base">{message}</p>
        </div>
        <div className="flex justify-center sm:justify-end">
          <ModalButton onClick={handleCloseModal} text={"Close"} />
        </div>
      </div>
    </div>
  );
};

export default FormModal;
