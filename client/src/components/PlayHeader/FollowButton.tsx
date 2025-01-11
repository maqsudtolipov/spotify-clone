import styles from './PlayHeader.module.scss';

interface FollowButtonProps {
  text: string;
}

const FollowButton = ({ text }: FollowButtonProps) => {
  return <button className={styles.followButton}>{text}</button>;
};

export default FollowButton;
