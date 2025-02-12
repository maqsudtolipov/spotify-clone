import styles from './UploadSongDialog.module.scss';
import { RiPencilLine } from 'react-icons/ri';
import Input from '../../../../ui/Input/Input.tsx';
import Button from '../../../../ui/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
// @ts-ignore
import previewImg from '../../../../public/img-preview.png';
import { uploadSong } from '../../artistThunks.ts';

const UploadSongForm = () => {
  const status = useAppSelector((state) => state.artist.api.uploadSong.status);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({
    img: '',
    name: '',
    song: '',
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    let newErrors = { name: '', img: '', song: '' };

    const formData = new FormData(formRef.current);
    const name = formData.get('name') as string;
    const img = formData.get('img') as File;
    const song = formData.get('song') as File;

    if (name.length < 3 || name.length > 24) {
      newErrors.name = 'Song name must be between 3 and 24 characters.';
    }
    if (img && !['image/jpeg', 'image/png', 'image/webp'].includes(img.type)) {
      newErrors.img = 'Image must be in JPEG, PNG, or WEBP format.';
    }
    if (song && song.type !== 'audio/mpeg') {
      newErrors.song = 'Songs must in MP3 format.';
    }

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.img && !newErrors.song) {
      dispatch(uploadSong(formData));
    }
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!imgRef.current || !e.target.files) return;

    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      imgRef.current.src = URL.createObjectURL(file);
    }
  };

  return (
    <form
      ref={formRef}
      className={styles.dialogForm}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col gap-2">
        <div
          className={`${styles.imgContainer} ${errors.img ? styles.imgInvalid : ''}`}
        >
          <label htmlFor="img" className={styles.previewImg}>
            <img ref={imgRef} src={previewImg} alt="Img preview" />
            <div className={styles.overlay}>
              <RiPencilLine />
              <span>Choose image</span>
            </div>
          </label>
          <Input
            type="file"
            name="img"
            placeholder="Song cover img"
            onChange={handleChangeImg}
          />
        </div>
        {errors.img && <p className={styles.error}>{errors.img}</p>}
      </div>
      <div className={styles.inputsContainer}>
        <Input
          label="Song name"
          type="text"
          name="name"
          isValid={!errors.name}
          placeholder="Song name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <Input
          label="Song file"
          type="file"
          name="song"
          isValid={!errors.song}
          placeholder="Song file"
        />
        {errors.song && <p className={styles.error}>{errors.song}</p>}

        <Button type="submit">
          {status === 'pending' ? 'Uploading' : 'Upload'}
        </Button>
      </div>

      <p className={styles.warn}>
        * Please ensure your files are not copyrighted. Do not upload personal
        or inappropriate images.
      </p>
    </form>
  );
};

export default UploadSongForm;
