import styles from './UploadSongDialog.module.scss';
import Dialog from '../../ui-library/Dialog/Dialog.tsx';
import DialogContent from '../../ui-library/Dialog/DialogContent.tsx';
import DialogTrigger from '../../ui-library/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';
import Input from '../../ui-library/Input/Input.tsx';
import Button from '../../ui-library/Button/Button';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { uploadSong } from './artistThunks.ts';

const UploadSongDialog = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const id = useAppSelector((state) => state.user?.data?.id);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (formRef.current) {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      dispatch(uploadSong({ id, formData }));
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
          <Input type="file" name="img" placeholder="Song cover img"></Input>
          <Input type="file" name="song" placeholder="Song file"></Input>
          <Input type="text" name="name" placeholder="Song name"></Input>
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
