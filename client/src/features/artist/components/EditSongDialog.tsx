import React, { FormEvent, forwardRef, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { updateSong } from '../artistThunks.ts';
import Dialog from '../../../ui/Dialog/Dialog.tsx';
import DialogTrigger from '../../../ui/Dialog/DialogTrigger.tsx';
import DialogContent from '../../../ui/Dialog/DialogContent.tsx';
import styles from './uploadSong/UploadSongForm.module.scss';
import Input from '../../../ui/Input/Input.tsx';
import Button from '../../../ui/Button/Button.tsx';
import { RiEditLine } from 'react-icons/ri';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';

const EditSongDialog = forwardRef<
  HTMLUListElement | HTMLDivElement | HTMLFormElement,
  { id: string }
>(({ id }, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  // const id = useAppSelector((state) => state.user?.data?.id);
  const status = useAppSelector((state) => state.artist.api.updateSong.status);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('update triggered');
    if (ref?.current) {
      const formData = new FormData(ref.current);
      dispatch(updateSong({ id, formData }));
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DropdownItem PreIcon={RiEditLine} closeOnClick={false}>
          Edit
        </DropdownItem>
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
            {status === 'pending' ? 'Updating' : 'Update'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default EditSongDialog;
