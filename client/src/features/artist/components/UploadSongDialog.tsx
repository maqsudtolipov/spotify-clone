import styles from './UploadSongDialog.module.scss';
import Dialog from '../../../ui/Dialog/Dialog.tsx';
import DialogContent from '../../../ui/Dialog/DialogContent.tsx';
import DialogTrigger from '../../../ui/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import Input from '../../../ui/Input/Input.tsx';
import Button from '../../../ui/Button/Button.tsx';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { uploadSong } from '../artistThunks.ts';

const UploadSongDialog = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const id = useAppSelector((state) => state.user?.data?.id);
  const status = useAppSelector((state) => state.artist.api.uploadSong.status);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      dispatch(uploadSong(formData));
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TransparentButton text="Upload Song" onClick={() => {}} />
      </DialogTrigger>
      <DialogContent>
        <form
          ref={formRef}
          className={styles.dialogForm}
          onSubmit={handleFormSubmit}
        >
          <Input
            type="file"
            name="img"
            label="Cover Image"
            placeholder="Song cover img"
          />
          <Input
            type="file"
            name="song"
            label="Song file"
            placeholder="Song file"
          />
          <Input
            type="text"
            name="name"
            label="Song Name"
            placeholder="Song name"
          />
          <Button type="submit">
            {status === 'pending' ? 'Uploading' : 'Upload'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
