import { ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';
import { createPortal } from 'react-dom';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
  const { isOpen, closeDialog } = useContext(DialogContext);
  const ref = useOutsideClick(closeDialog);

  return isOpen
    ? createPortal(<div ref={ref}>{children}</div>, document.body)
    : null;
};

export default DialogContent;
