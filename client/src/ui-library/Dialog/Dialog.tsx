import { createContext, ReactNode, useState } from 'react';

interface DialogContextValue {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue>(
  {} as DialogContextValue,
);

interface DialogProps {
  children: ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const toggleDialog = () => setIsOpen((prev) => !prev);

  const contextValue = {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <div>{children}</div>
    </DialogContext.Provider>
  );
};

export default Dialog;
