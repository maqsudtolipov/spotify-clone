import styles from './Input.module.scss';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: string;
  name?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  isValid?: boolean;
  onChange?: (arg0: any) => any;
  errorMessages?: Record<string, string>
}

const Input = ({
  type,
  name,
  defaultValue,
  label,
  placeholder,
  isValid,
  error,
  register,
  errorMessages,
  onChange,
}: InputProps) => {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor="">
          {label}
        </label>
      )}
      <input
        id={name}
        className={`${styles.input} ${type === 'file' ? styles.inputFile : ''} ${isValid ? '' : styles.inputInvalid} ${error ? styles.inputInvalid : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        {...register}
      />

      {error && (
        <p className={styles.error}>
          {errorMessages?.[error.type] || 'Invalid input'}
        </p>
      )}
    </div>
  );
};

export default Input;
