import styles from './Button.module.scss';
import { ReactNode } from 'react';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  children: ReactNode;
}

const Button = ({ type, children }: ButtonProps) => {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
};

export default Button;
