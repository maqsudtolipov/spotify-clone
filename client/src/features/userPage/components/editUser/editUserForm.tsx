import styles from '../../../artist/components/forms/Forms.module.scss';
import Input from '../../../../ui/Input/Input.tsx';
import Button from '../../../../ui/Button/Button.tsx';
import { RiPencilLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../redux/hooks.ts';
import { ChangeEvent, useRef } from 'react';

const EditUserForm = () => {
  const user = useAppSelector((state) => state.user.data);

  const imgRef = useRef(null);

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
          className={`${styles.imgContainer} `} //${errors.img ? styles.imgInvalid : ''}
        >
          <label htmlFor="img" className={styles.previewImg}>
            <img ref={imgRef} src={user.img.url} alt="Img preview" />
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
        {/*{errors.img && <p className={styles.error}>{errors.img}</p>}*/}
      </div>
      <div>
        <Input type="text" name="name" placeholder="User name" />
        <Button type="submit">
          Update
          {/*{status === 'pending' ? 'Updating' : 'Update'}*/}
        </Button>
      </div>

      <p className={styles.warn}>
        * Please ensure your files are not copyrighted. Do not upload personal
        or inappropriate images.
      </p>
    </form>
  );
};

export default EditUserForm;
