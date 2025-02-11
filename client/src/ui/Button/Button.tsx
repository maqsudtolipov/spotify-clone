import styles from './Button.module.scss';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
