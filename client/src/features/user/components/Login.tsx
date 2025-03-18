import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { login } from '../userThunks.ts';
import Input from '../../../ui/Input/Input.tsx';

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

          <Input
            type="email"
            placeholder="Enter your email"
            register={register('email', { required: true })}
            error={errors.email}
            errorMessages={{ required: 'This field is required' }}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            register={register('password', { required: true })}
            error={errors.password}
            errorMessages={{ required: 'This field is required' }}
          />

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
