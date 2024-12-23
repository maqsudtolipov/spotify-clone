import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { login } from './userThunks.ts';

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchedPassword = watch('password');
  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };

  const watchedEmail = watch('email');
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFormSubmit = async (input: FormInput) => {
    dispatch(login(input));
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <AuthContainer>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      >
        <p className={styles.title}>Spotify</p>
        <div className={styles.container}>
          <input
            className={`${styles.input} ${validateEmail(watchedEmail) ? styles.inputValid : ''}`}
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
          />
        </div>

        <div className={styles.container}>
          <input
            className={`${styles.input} ${validatePassword(watchedPassword) ? styles.inputValid : ''}`}
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          <p className={styles.message}>
            {!validatePassword(watchedPassword) &&
              'Min 8 chars with uppercase, lowercase, number, and special ($, !, %, &, *).'}
          </p>
        </div>

        <button className={styles.button} type="submit">
          {status === 'pending' && <RiLoaderFill />}
          Login
        </button>
      </form>
    </AuthContainer>
  );
};

export default Login;
