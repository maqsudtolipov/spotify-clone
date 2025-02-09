import { createContext, ReactNode, useState } from 'react';

interface DialogContextValue {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

interface DialogProps {
  children: ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const toggleDialog = () => setIsOpen((prev) => !prev);

  return (
    <DialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, toggleDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default Dialog;
