import styles from './Input.module.scss';

interface InputProps {
  type: string;
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  isValid?: boolean;
  onChange?: (arg0: any) => any;
}

const Input = ({
  type,
  name,
  defaultValue,
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
        id={name}
        className={`${styles.input} ${type === 'file' ? styles.inputFile : ''} ${isValid ? '' : styles.inputInvalid}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
