import React, { FormEvent, forwardRef, useContext, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { uploadSong } from './artistThunks.ts';
import Dialog from '../../ui-library/Dialog/Dialog.tsx';
import DialogTrigger from '../../ui-library/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../components/PlayHeader/TransparentButton.tsx';
import DialogContent from '../../ui-library/Dialog/DialogContent.tsx';
import styles from './UploadSongDialog.module.scss';
import Input from '../../ui-library/Input/Input.tsx';
import Button from '../../ui-library/Button/Button';
import { RiEditLine } from 'react-icons/ri';
import DropdownItem from '../../ui-library/Dropdown/DropdownItem.tsx';

const EditSongDialog = forwardRef<
  HTMLUListElement | HTMLDivElement | HTMLFormElement
>(({}, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const id = useAppSelector((state) => state.user?.data?.id);
  const status = useAppSelector((state) => state.artist.api.uploadSong.status);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (formRef.current) {
      e.preventDefault();

      // const formData = new FormData(formRef.current);
      // dispatch(updateSong({ id, formData }));
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine}>Edit</DropdownItem>
      </DialogTrigger>
      <DialogContent>
        <form
          ref={ref}
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
});

export default EditSongDialog;
