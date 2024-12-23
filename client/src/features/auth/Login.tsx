import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import AuthContainer from './AuthContainer.tsx';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const watchedPassword = watch('password');
  const validatePassword = (password: string) => {
    // if (password.length < 8) return 'Minimum 8 characters.';
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  };

  const watchedEmail = watch('email');
  const validateEmail = (email: string) => {
    return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <AuthContainer>
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => console.log(data))}
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
              minLength: {
                value: 4,
                message: 'Min length 4',
              },
            })}
          />
          <p className={styles.message}>{validatePassword(watchedPassword)}</p>
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </AuthContainer>
  );
};

export default Login;
