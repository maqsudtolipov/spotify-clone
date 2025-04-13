import { MouseEvent, ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';

interface DialogTriggerProps {
  children: ReactNode;
}

const DialogTrigger = ({ children }: DialogTriggerProps) => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogTrigger should be used within the Dialog');
  }

  const { toggleDialog } = context;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDialog();
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default DialogTrigger;
