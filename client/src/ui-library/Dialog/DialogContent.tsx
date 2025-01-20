import { ReactNode, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';
import { createPortal } from 'react-dom';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';
import styles from './Dialog.module.scss';
import IconButton from '../IconButton/IconButton';
import { RiCloseLargeFill } from 'react-icons/ri';

interface DialogContentProps {
  children: ReactNode;
}

const DialogContent = ({ children }: DialogContentProps) => {
  const { isOpen, closeDialog } = useContext(DialogContext);
  const ref = useOutsideClick(closeDialog);

  const handleClose = (e: Event) => {
    if (e.target !== e.currentTarget) return;
    closeDialog();
  };

  return isOpen
    ? createPortal(
        <div
          ref={ref}
          className={styles.dialogBackground}
          onClick={handleClose}
        >
          <div className={styles.dialog}>
            <div className={styles.dialogHeader}>
              <span>Upload a new song</span>
              <IconButton onClick={closeDialog}>
                <RiCloseLargeFill />
              </IconButton>
            </div>

            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default DialogContent;
