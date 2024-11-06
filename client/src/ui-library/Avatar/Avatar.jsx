import styles from './Avatar.module.scss';

const Avatar = ({ children, ...rest }) => {
  return (
    <div className={styles.avatar} {...rest}>
      {children}
    </div>
  );
};

const AvatarFallback = ({ children, ...rest }) => {
  return (
    <span className={styles.fallback} {...rest}>
      {children}
    </span>
  );
};

export default Avatar;
export { AvatarFallback };
