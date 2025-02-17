import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import styles from '../../../artist/components/forms/Forms.module.scss';
import { ChangeEvent, useRef, useState } from 'react';
import { RiPencilLine } from 'react-icons/ri';
import Input from '../../../../ui/Input/Input.tsx';

// NOTE: similar to EditSong form
const EditPlaylistForm = () => {
  // const status = useAppSelector(
  //   (state) => state.playlist.api.editPlaylist.status,
  // );
  const playlist = useAppSelector((state) => state.playlist.data);
  const dispatch = useAppDispatch();

  if (!playlist) return null;

  const [errors, setErrors] = useState({ img: '', name: '', description: '' });
  const formRef = useRef<HTMLFormElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  console.log(playlist);


  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!imgRef.current || !e.target.files) return;

    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      imgRef.current.src = URL.createObjectURL(file);
    }
  };

  return (
    <form className={styles.dialogForm}>
      <div className="flex flex-col gap-2">
        <div
          className={`${styles.imgContainer} ${errors.img ? styles.imgInvalid : ''}`}
        >
          <label htmlFor="img" className={styles.previewImg}>
            <img ref={imgRef} src={playlist.img.url} alt="Img preview" />
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
      <div>b</div>
      <p className={styles.warn}>
        * Please ensure your files are not copyrighted. Do not upload personal
        or inappropriate images.
      </p>
    </form>
  );
};

export default EditPlaylistForm;
