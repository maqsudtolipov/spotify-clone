import { useForm } from 'react-hook-form';
import styles from './AuthForm.module.scss';
import AuthContainer from './AuthContainer.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { signUp } from '../userThunks.ts';
import AuthForm from './form/AuthForm.tsx';
import Input from '../../../ui/Input/Input.tsx';

interface FormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isArtist: boolean;
}

const SignUp = () => {
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

  const handleFormSubmit = (input: FormInput) => dispatch(signUp(input));

  return (
    <AuthContainer>
      <AuthForm
        buttonText="Sign Up"
        isLoading={status === 'pending'}
        link={{ text: 'Login here', to: '/login' }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          type="text"
          placeholder="Enter your name"
          register={register('name', {
            required: true,
            minLength: 3,
            maxLength: 24,
          })}
          error={errors.name}
          errorMessages={{
            required: 'This field is required',
            minLength: 'Name must be between 3 and 24 characters.',
            maxLength: 'Name must be between 3 and 24 characters.',
          }}
        />

        <Input
          type="email"
          placeholder="Enter your email"
          register={register('email', {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          error={errors.email}
          errorMessages={{
            required: 'This field is required',
            pattern: 'Please provide a valid email',
          }}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          register={register('password', {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
          error={errors.password}
          errorMessages={{
            required: 'This field is required',
            minLength: 'Password must be at least 8 characters',
            maxLength: 'Password cannot exceed 16 characters',
            pattern:
              'Password must include uppercase, lowercase, number, and special character',
          }}
        />

        <Input
          type="password"
          placeholder="Confirm your password"
          register={register('passwordConfirm', {
            required: true,
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          error={errors.passwordConfirm}
          errorMessages={{
            required: 'This field is required',
            validate: 'Passwords do not match',
          }}
        />

        <div className="flex items-center gap-1.5">
          <input
            className={styles.checkbox}
            type="checkbox"
            id="isArtist"
            {...register('isArtist')}
          />
          <label
            className="text-sm select-none cursor-pointer"
            htmlFor="isArtist"
          >
            Become artist
          </label>
        </div>
      </AuthForm>
    </AuthContainer>
  );
};

export default SignUp;
