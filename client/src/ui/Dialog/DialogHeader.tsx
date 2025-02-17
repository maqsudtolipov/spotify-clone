import styles from './DialogHeader.module.scss';
import IconButton from '../IconButton/IconButton.tsx';
import { RiCloseLargeFill } from 'react-icons/ri';
import { useContext } from 'react';
import { DialogContext } from './Dialog.tsx';

interface DialogHeaderProps {
  title: string;
}

const DialogHeader = ({ title }: DialogHeaderProps) => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogHeader should be used within the Dialog');
  }

  const { closeDialog } = context;

  return (
    <div className={styles.dialogHeader}>
      <span>{title}</span>
      <IconButton onClick={closeDialog}>
        <RiCloseLargeFill />
      </IconButton>
    </div>
  );
};

export default DialogHeader;
