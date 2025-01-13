import styles from './PlayHeader.module.scss';
import { MouseEventHandler } from 'react';

interface FollowButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FollowButton = ({ text, onClick }: FollowButtonProps) => {
  return (
    <button className={styles.followButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default FollowButton;
