import styles from './UploadSongDialog.module.scss';
import Dialog from '../../ui-library/Dialog/Dialog.tsx';
import DialogContent from '../../ui-library/Dialog/DialogContent.tsx';
import DialogTrigger from '../../ui-library/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';

const UploadSongDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <TransparentButton text="Upload Song" onClick={() => {}} />
      </DialogTrigger>
      <DialogContent>df</DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
