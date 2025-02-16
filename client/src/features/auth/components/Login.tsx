import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { login } from '../userThunks.ts';

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { status } = useAppSelector((state) => state.user.api.login);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (input: FormInput) => {
    dispatch(login(input));
  };

  if (isAuth) return <Navigate to="/" />;
  else
    return (
      <AuthContainer>
        <form
          className={styles.form}
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        >
          <p className={styles.title}>Spotify</p>
          <div className={styles.container}>
            <input
              className={`${styles.input} ${errors['email'] ? styles.inputInvalid : ''}`}
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />

            {errors?.email?.type === 'required' && (
              <p className={styles.error}>This field is required</p>
            )}
          </div>

          <div className={styles.container}>
            <input
              className={`${styles.input} ${errors['password'] ? styles.inputInvalid : ''}`}
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            {errors?.email?.type === 'required' && (
              <p className={styles.error}>This field is required</p>
            )}
          </div>

          <button className={styles.button} type="submit">
            {status === 'pending' && <RiLoaderFill />}
            Login
          </button>

          <Link className={styles.link} to="/signup">
            Sign Up here
          </Link>
        </form>
      </AuthContainer>
    );
};

export default Login;
