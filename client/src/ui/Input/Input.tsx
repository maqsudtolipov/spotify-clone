import styles from './Input.module.scss';

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  isValid?: boolean;
  onChange?: (arg0: any) => any;
}

const Input = ({
  type,
  name,
  label,
  placeholder,
  isValid,
  onChange,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor="">
          {label}
        </label>
      )}
      <input
        className={`${styles.input} ${type === 'file' ? styles.inputFile : ''} ${isValid ? '' : styles.inputInvalid}`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
