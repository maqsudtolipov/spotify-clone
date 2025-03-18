import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { signUp } from '../userThunks.ts';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isArtist: boolean;
}

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { status } = useAppSelector((state) => state.user.api.signUp);
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      isArtist: false,
    },
  });

  const handleFormSubmit = async (input: FormInput) => {
    dispatch(signUp(input));
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <AuthContainer>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => handleFormSubmit(data))}
      >
        <p className={styles.title}>Spotify</p>

        <div>
          <input
            className={`${styles.input} ${errors['name'] ? styles.inputInvalid : ''}`}
            type="text"
            placeholder="Enter your name"
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 24,
            })}
          />

          {errors?.name?.type === 'required' && (
            <p className={styles.error}>This field is required</p>
          )}
          {(errors?.name?.type === 'minLength' ||
            errors?.name?.type === 'maxLength') && (
            <p className={styles.error}>
              Name must be between 3 and 24 characters.
            </p>
          )}
        </div>

        <div>
          <input
            className={`${styles.input} ${errors['email'] ? styles.inputInvalid : ''}`}
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: true,
              pattern: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
            })}
          />

          {errors?.email?.type === 'required' && (
            <p className={styles.error}>This field is required</p>
          )}
          {errors?.email?.type === 'pattern' && (
            <p className={styles.error}>Please provide valid email</p>
          )}
        </div>

        <div>
          <input
            className={`${styles.input} ${errors['password'] ? styles.inputInvalid : ''}`}
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: true,
              minLength: 8,
              maxLength: 16,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />

          {errors?.password?.type === 'required' && (
            <p className={styles.error}>This field is required</p>
          )}

          {(errors?.password?.type === 'minLength' ||
            errors?.password?.type === 'maxLength') && (
            <p className={styles.error}>
              Password must be between 8 and 16 characters.
            </p>
          )}

          {errors?.password?.type === 'pattern' && (
            <p className={styles.error}>
              Password must include an uppercase letter, lowercase letter,
              number, and special character ($, !, %, &, *).
            </p>
          )}
        </div>

        <div>
          <input
            className={`${styles.input} ${errors['passwordConfirm'] ? styles.inputInvalid : ''}`}
            type="password"
            placeholder="Confirm your password"
            {...register('passwordConfirm', {
              required: true,
              validate: (value: string) => {
                if (watch('password') !== value) return false;
              },
            })}
          />
          {errors?.passwordConfirm?.type === 'required' && (
            <p className={styles.error}>This field is required</p>
          )}
          {errors?.passwordConfirm?.type === 'validate' && (
            <p className={styles.error}>Passwords do not match</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <div>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="isArtist"
              {...register('isArtist')}
            />
          </div>
          <div>
            <label
              className="text-sm select-none cursor-pointer"
              htmlFor="isArtist"
            >
              Become artist
            </label>
          </div>
        </div>

        <button className={styles.button} type="submit">
          {status === 'pending' && <RiLoaderFill />}
          Sign Up
        </button>

        <Link className={styles.link} to="/login">
          Login here
        </Link>
      </form>
    </AuthContainer>
  );
};

export default Login;
