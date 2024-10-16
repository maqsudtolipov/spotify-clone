import styles from './NavForm.module.scss';
import { RiCloseFill, RiCloseLargeLine, RiSearchLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const NavForm = () => {
  const [showBtn, setShowBtn] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const handleFormSubmit = (data) => {
    console.log('form submitted:', data);
  };

  // Shows the close button when input is at least 3 characters
  useEffect(() => {
    watch((value) => {
      if (value?.input?.length >= 3) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, [watch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        type="text"
        placeholder="What do you want to play?"
        {...register('input')}
      />
      <RiSearchLine className={styles.searchIcon} />

      {showBtn && (
        <RiCloseLargeLine
          className={styles.closeIcon}
          role="button"
          onClick={() => reset()}
        />
      )}
    </form>
  );
};

export default NavForm;
