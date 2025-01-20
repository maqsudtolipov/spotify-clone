import { createContext, ReactNode, useState } from 'react';

interface DialogContextValue {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
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

  const contextValue = {
    isOpen,
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <div>{children}</div>
    </DialogContext.Provider>
  );
};

export default Dialog;
