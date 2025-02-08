import styles from './PlayHeader.module.scss';
import { ReactNode } from 'react';

interface PlayHeaderProps {
  children?: ReactNode;
}

const PlayHeader = ({ children }: PlayHeaderProps) => {
  return <div className={styles.playerHeader}>{children}</div>;
};

export default PlayHeader;
