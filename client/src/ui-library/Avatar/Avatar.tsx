import styles from './Avatar.module.scss';
import { ReactNode } from 'react';

interface AvatarProps {
  children?: ReactNode;
}

const Avatar = ({ children }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <span className={styles.fallback}>{children}</span>
    </div>
  );
};

interface AvatarFallbackProps {
  children?: ReactNode;
}

const AvatarFallback = ({ children }: AvatarFallbackProps) => {
  return <span className={styles.fallback}>{children}</span>;
};

export { Avatar, AvatarFallback };
