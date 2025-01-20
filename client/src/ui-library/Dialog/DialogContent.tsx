import { ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
  const { isOpen } = useContext(DialogContext);

  return isOpen ? <div>{children}</div> : null;
};

export default DialogContent;
