import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextInterface {
  publishConfirmOpen: boolean;
  setPublishConfirmOpen: (val: boolean) => void;
  saveConfirmOpen: boolean;
  setSaveConfirmOpen: (val: boolean) => void;
  tauntOpen: boolean;
  setTauntOpen: (val: boolean) => void;
}

const ModalContext = createContext({} as ModalContextInterface);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);
  const [tauntOpen, setTauntOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        publishConfirmOpen,
        setPublishConfirmOpen,
        saveConfirmOpen,
        setSaveConfirmOpen,
        tauntOpen,
        setTauntOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export default ModalProvider;
export { useModal };
