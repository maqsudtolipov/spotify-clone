import styles from './NavForm.module.scss';
import { RiCloseLargeLine, RiSearchLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks.ts';
import { changeQuery } from '../../searchSlice.ts';
import { useNavigate } from 'react-router-dom';

const NavForm = () => {
  // useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showBtn, setShowBtn] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const handleFormSubmit = (formData) => {
    if (formData.input.length >= 1) {
      navigate('/search');
      dispatch(changeQuery(formData.input));
    }
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
