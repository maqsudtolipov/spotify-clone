import styles from './TransparentButton.module.scss';
import { MouseEventHandler } from 'react';

interface FollowButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TransparentButton = ({ text, onClick }: FollowButtonProps) => {
  return (
    <button className={styles.transparentButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default TransparentButton;
