import styles from './DialogHeader.module.scss';
import IconButton from '../IconButton/IconButton.tsx';
import { RiCloseLargeFill } from 'react-icons/ri';
import { useContext } from 'react';
import { DialogContext } from './Dialog.tsx';

const DialogHeader = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogHeader should be used within the Dialog');
  }

  const { closeDialog } = context;

  return (
    <div className={styles.dialogHeader}>
      <span>Upload a new song</span>
      <IconButton onClick={closeDialog}>
        <RiCloseLargeFill />
      </IconButton>
    </div>
  );
};

export default DialogHeader;
