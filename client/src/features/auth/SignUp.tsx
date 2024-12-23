import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useState } from 'react';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const validateInput = (data: FormInput) => {
  const errorMessages: string[] = [];

  // 1. Validate name
  if (data.name.length < 3 || data.name.length > 24) errorMessages.push('Name must be 3–24 characters.');
  if (!data.name) errorMessages.push('Please provide your name.');

  // 2. Validate email
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errorMessages.push('Please provide a valid email address.');

  // 3. Validate password
  if (data.name.length < 8 || data.name.length > 16) errorMessages.push('Password must be 8–16 characters.');
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    data.password,
  )) {
    errorMessages.push('Password must include an uppercase letter, a lowercase letter, a number, and a special character.');
  }

  // 4. Validate confirmPassword
  if (data.password !== data.passwordConfirm) errorMessages.push('Passwords do not match.');
  
  return errorMessages;
}

const Login = () => {
  const { isAuth, status } = useAppSelector((state) => state.user);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  // const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleFormSubmit = async (input: FormInput) => {
    if (validateInput(input).length === 0) {
      // dispatch(login(input));
      setErrorMessages([])
    } else {
      setErrorMessages(validateInput(input));
    }
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

          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your name"
              minLength={3}
              maxLength={24}
              {...register('name')}
            />
          </div>

          <div>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
          </div>

          <div>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter your password"
              minLength={8}
              maxLength={16}
              {...register('password')}
            />
          </div>

          <div>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm your password"
              minLength={8}
              maxLength={16}
              {...register('passwordConfirm')}
            />
          </div>

          <div>
            {errorMessages.map((message) => (
              <p className={styles.message}>- {message}</p>
            ))}
          </div>

          <button className={styles.button} type="submit">
            {status === 'pending' && <RiLoaderFill />}
            Sign Up
          </button>
        </form>
      </AuthContainer>
    );
};

export default Login;
