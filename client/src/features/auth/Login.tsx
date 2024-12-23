import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import AuthContainer from './AuthContainer.tsx';
import axios from '../../api/axios';
import { useState } from 'react';
import { RiLoaderFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [status, setStatus] = useState<string>('idle');
  const navigate = useNavigate();

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

  const handleFormSubmit = async (formInput: FormInput) => {
    try {
      setStatus('pending');

      const { data } = await axios.post(
        'http://localhost:3000/api/auth/login',
        formInput,
      );

      setStatus('fulfilled');
      navigate('/');
    } catch (e) {
      setStatus('rejected');
    }
  };

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
