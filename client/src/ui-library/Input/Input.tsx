import styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder?: string;
  // children: ReactNode;
}

const Input = ({ type, placeholder, children }: InputProps) => {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} />
  );
};

export default Input;
