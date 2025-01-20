import { createContext, ReactNode, useState } from 'react';

interface DialogContextValue {
  isOpen: boolean;
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
  const closeDropdown = () => setIsOpen(false);

  const contextValue = {
    isOpen,
    openDialog,
    closeDropdown,
  };

  return (
    <DialogContext.Provider value={contextValue}>
      <div>{children}</div>
    </DialogContext.Provider>
  );
};

export default Dialog;
