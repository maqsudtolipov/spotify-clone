import styles from './Typography.module.scss';
import { ReactNode } from 'react';

interface Heading2Props {
  children: ReactNode;
}

const Heading2 = ({ children }: Heading2Props) => {
  return <h2 className={styles.heading2}>{children}</h2>;
};

export default Heading2;
