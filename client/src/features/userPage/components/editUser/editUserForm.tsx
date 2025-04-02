import styles from '../../../artist/components/forms/Forms.module.scss';
import Input from '../../../../ui/Input/Input.tsx';
import Button from '../../../../ui/Button/Button.tsx';
import { RiPencilLine } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { updateMe } from '../../../user/userThunks.ts';

const validateForm = (formData: FormData) => {
  const img = formData.get('img') as File;
  const name = formData.get('name') as string;
  const errors = { name: '', img: '' };

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

  return errors;
};

const EditUserForm = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({ img: '', name: '' });
  const formRef = useRef<HTMLFormElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (!errors.name && !errors.img) {
      dispatch(updateMe(formData));

      console.log('EDIT FORM VALUES');
      for (const [key, value] of formData) {
        console.log('»', key, value);
      }
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
        {errors.img && <p className={styles.error}>{errors.img}</p>}
      </div>
      <div>
        <Input
          label="Name"
          type="text"
          name="name"
          isValid={!errors.name}
          placeholder="Name"
          defaultValue={user.name}
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

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
