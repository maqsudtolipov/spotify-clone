import styles from './Avatar.module.scss';

const Avatar = ({ children }) => {
  return <div className={styles.avatar}>{children}</div>;
};

const AvatarFallback = ({ children }) => {
  return <span className={styles.fallback}>{children}</span>;
};

export default Avatar;
export { AvatarFallback };
