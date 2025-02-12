import styles from './UploadSongDialog.module.scss';
import Dialog from '../../../ui/Dialog/Dialog.tsx';
import DialogContent from '../../../ui/Dialog/DialogContent.tsx';
import DialogTrigger from '../../../ui/Dialog/DialogTrigger.tsx';
import TransparentButton from '../../../ui/Button/TransparentButton.tsx';
import Input from '../../../ui/Input/Input.tsx';
import Button from '../../../ui/Button/Button.tsx';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { useAppSelector } from '../../../redux/hooks.ts';

// @ts-ignore
import previewImg from '../../../public/img-preview.png';

const UploadSongDialog = () => {
  const status = useAppSelector((state) => state.artist.api.uploadSong.status);

  const formRef = useRef<HTMLFormElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current && imgRef.current) {
      // const formData = new FormData(formRef.current);
      // dispatch(uploadSong(formData));
    }
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!imgRef.current || !e.target.files) return;
    imgRef.current.src = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TransparentButton text="Upload Song" />
      </DialogTrigger>
      <DialogContent>
        <form
          ref={formRef}
          className={styles.dialogForm}
          onSubmit={handleFormSubmit}
        >
          <div className={styles.imgContainer}>
            <label htmlFor="img">
              <img
                ref={imgRef}
                className={styles.previewImg}
                src={previewImg}
                alt="Img preview"
              />
            </label>
            <Input
              type="file"
              name="img"
              placeholder="Song cover img"
              onChange={handleChangeImg}
            />
          </div>
          <div>
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
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadSongDialog;
