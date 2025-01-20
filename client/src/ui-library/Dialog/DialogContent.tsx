import { ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';
import { createPortal } from 'react-dom';

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
  const { isOpen } = useContext(DialogContext);

  return isOpen ? createPortal(<div>{children}</div>, document.body) : null;
};

export default DialogContent;
