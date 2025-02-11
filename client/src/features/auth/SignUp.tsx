import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { RiLoaderFill } from 'react-icons/ri';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { useState } from 'react';
import { signUp } from './userThunks.ts';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const validateInput = (data: FormInput) => {
  const validInputs: string[] = [];
  const errorMessages: string[] = [];

  // 1. Validate name
  if (data.name.length < 3 || data.name.length > 24) errorMessages.push('Name must be 3–24 characters.');
  else validInputs.push('name');

  // 2. Validate email
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errorMessages.push('Please provide a valid email address.')
  else validInputs.push('email');

  // 3. Validate password
  if (data.password.length < 8 || data.password.length > 16) errorMessages.push('Password must be 8–16 characters.');
  else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    data.password,
  )) {
    errorMessages.push('Password must include an uppercase letter, a lowercase letter, a number, and a special character.');
  }
  else validInputs.push('password');

  // 4. Validate confirmPassword
  if (data.password !== data.passwordConfirm) errorMessages.push('Passwords do not match.')
  else validInputs.push('passwordConfirm');
  
  return { validInputs, errorMessages };
}

const Login = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const {status} = useAppSelector(state => state.user.api.signUp);
  const dispatch = useAppDispatch();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [validInputs, setValidInputs] = useState<string[]>([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const handleFormSubmit = async (input: FormInput) => {
    if (validateInput(input).errorMessages.length === 0) {
      setErrorMessages([])
      setValidInputs(['name', 'email', 'password', 'passwordConfirm']);
      dispatch(signUp(input));
    } else {
      setValidInputs(validateInput(input).validInputs);
      setErrorMessages(validateInput(input).errorMessages);
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
              className={`${styles.input} ${validInputs.includes('name') ? styles.inputValid : ''}`}
              type="text"
              placeholder="Enter your name"
              required={true}
              {...register('name')}
            />
          </div>

          <div>
            <input
              className={`${styles.input} ${validInputs.includes('email') ? styles.inputValid : ''}`}
              type="email"
              placeholder="Enter your email"
              required={true}
              {...register('email')}
            />
          </div>

          <div>
            <input
              className={`${styles.input} ${(validInputs.includes('password') && validInputs.includes('passwordConfirm')) ? styles.inputValid : ''}`}
              type="password"
              placeholder="Enter your password"
              required={true}
              {...register('password')}
            />
          </div>

          <div>
            <input
              className={`${styles.input} ${(validInputs.includes('password') && validInputs.includes('passwordConfirm')) ? styles.inputValid : ''}`}
              type="password"
              placeholder="Confirm your password"
              required={true}
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
