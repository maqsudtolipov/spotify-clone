import { useForm } from 'react-hook-form';
import AuthContainer from './authContainer/AuthContainer.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { login } from '../userThunks.ts';
import AuthForm from './form/AuthForm.tsx';
import Input from '../../../ui/Input/Input.tsx';

interface FormInput {
  email: string;
  password: string;
}

const Login = () => {
  const { status } = useAppSelector((state) => state.user.api.login);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({ defaultValues: { email: '', password: '' } });

  const handleFormSubmit = (input: FormInput) => dispatch(login(input));

  return (
    <AuthContainer>
      <AuthForm
        buttonText="Login"
        isLoading={status === 'pending'}
        link={{ text: 'Sign Up here', to: '/signup' }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
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
      </AuthForm>
    </AuthContainer>
  );
};

export default Login;
