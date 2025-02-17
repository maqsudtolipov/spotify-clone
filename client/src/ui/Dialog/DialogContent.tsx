import { forwardRef, MouseEvent, ReactNode, Ref, useContext } from 'react';
import { DialogContext } from './Dialog.tsx';
import { createPortal } from 'react-dom';
import styles from './DialogContent.module.scss';
import DialogHeader from './DialogHeader.tsx';

interface DialogContentProps {
  title: string;
  ref?: Ref<HTMLDivElement>;
  children: ReactNode;
}

const DialogContent = forwardRef(
  ({ title, children }: DialogContentProps, ref) => {
    const context = useContext(DialogContext);
    if (!context) {
      throw new Error('DialogContent should be used within the Dialog');
    }

    const { isOpen, closeDialog } = context;

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      closeDialog();
    };

    return isOpen
      ? createPortal(
          <div
            ref={ref && ref}
            className={styles.dialogBackground}
            onClick={handleClose}
          >
            <div className={styles.dialog}>
              <DialogHeader title={title} />
              {children}
            </div>
          </div>,
          document.body,
        )
      : null;
  },
);

export default DialogContent;
