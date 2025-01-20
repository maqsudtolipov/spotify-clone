import styles from './Input.module.scss';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
}

const Input = ({ type, name, placeholder, ...rest }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
