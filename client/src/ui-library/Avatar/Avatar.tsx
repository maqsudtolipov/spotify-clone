import styles from './Avatar.module.scss';
import { ReactNode } from 'react';

interface AvatarProps {
  children?: ReactNode;
}

const Avatar = ({ children, ...rest }: AvatarProps) => {
  return (
    <div className={styles.avatar} {...rest}>
      {children}
    </div>
  );
};

interface AvatarFallbackProps {
  children?: ReactNode;
}

const AvatarFallback = ({ children, ...rest }: AvatarFallbackProps) => {
  return (
    <span className={styles.fallback} {...rest}>
      {children}
    </span>
  );
};

export default Avatar;
export { AvatarFallback };
