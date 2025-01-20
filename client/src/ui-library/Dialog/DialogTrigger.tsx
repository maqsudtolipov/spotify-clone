import { MouseEvent, ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';

interface DialogTriggerProps {
  children: ReactNode;
}

const DialogTrigger = ({ children }: DialogTriggerProps) => {
  const { toggleDialog } = useContext(DialogContext);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDialog();
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default DialogTrigger;
