import styles from '../Forms.module.scss';
import Input from '../../../../../ui/Input/Input.tsx';
import Button from '../../../../../ui/Button/Button.tsx';
import { RiPencilLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks.ts';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { updateSong } from '../../../artistThunks.ts';
import { selectArtistSongs } from '../../../artistSlice.ts';

interface EditSongFormProps {
  id: string;
}

const validateForm = (formData: FormData) => {
  const name = formData.get('name') as string;
  const img = formData.get('img') as File;
  const songFile = formData.get('song') as File;
  const errors = { name: '', img: '', song: '' };

  if (name.length < 3 || name.length > 24) {
    errors.name = 'Song name must be between 3 and 24 characters.';
  }
  if (
    img &&
    img.size &&
    !['image/jpeg', 'image/png', 'image/webp'].includes(img.type)
  ) {
    errors.img = 'Image must be in JPEG, PNG, or WEBP format.';
  }
  if (songFile && songFile.size && songFile.type !== 'audio/mpeg') {
    errors.song = 'Song must be in MP3 format.';
  }

  return errors;
};

const EditSongForm = ({ id }: EditSongFormProps) => {
  const status = useAppSelector((state) => state.artist.api.uploadSong.status);
  const songs = useAppSelector(selectArtistSongs);
  const song = songs?.find((s) => s.id === id);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({ img: '', name: '', song: '' });
  const formRef = useRef<HTMLFormElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  if (!song) return null;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.img && !newErrors.song) {
      dispatch(updateSong({ id, formData }));
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
            <img ref={imgRef} src={song.img.url} alt="Img preview" />
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
          defaultValue={song.name}
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
          {status === 'pending' ? 'Updating' : 'Update'}
        </Button>
      </div>

      <p className={styles.warn}>
        * Please ensure your files are not copyrighted. Do not upload personal
        or inappropriate images.
      </p>
    </form>
  );
};

export default EditSongForm;
