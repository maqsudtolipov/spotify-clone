import styles from './UploadSongDialog.module.scss';
import Dialog from '../../ui-library/Dialog/Dialog.tsx';
import DialogContent from '../../ui-library/Dialog/DialogContent.tsx';
import DialogTrigger from '../../ui-library/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';
import Input from '../../ui-library/Input/Input.tsx';
import Button from '../../ui-library/Button/Button';

const UploadSongDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <TransparentButton text="Upload Song" onClick={() => {}} />
      </DialogTrigger>
      <DialogContent>
        <form action="" className={styles.dialogForm}>
          <Input type="file" placeholder="Song cover img"></Input>
          <Input type="file" placeholder="Song file"></Input>
          <Input type="text" placeholder="Song name"></Input>
          <Button>Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
