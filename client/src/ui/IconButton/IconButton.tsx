import styles from './IconButton.module.scss';
import { ReactNode } from 'react';

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
