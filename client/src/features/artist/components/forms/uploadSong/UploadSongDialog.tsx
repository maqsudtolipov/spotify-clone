import Dialog from '../../../../../ui/Dialog/Dialog.tsx';
import DialogContent from '../../../../../ui/Dialog/DialogContent.tsx';
import DialogTrigger from '../../../../../ui/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../../../../ui/Button/TransparentButton.tsx';
import UploadSongForm from './UploadSongForm.tsx';

const UploadSongDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <TransparentButton text="Upload Song" />
      </DialogTrigger>
      <DialogContent>
        <UploadSongForm />
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
