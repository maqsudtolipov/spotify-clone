import styles from './Input.module.scss';

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
}

const Input = ({ type, name, label, placeholder, ...rest }: InputProps) => {
  return (
    <div>
      {label && (
        <label className={styles.label} htmlFor="">
          {label}
        </label>
      )}
      <input
        className={styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
