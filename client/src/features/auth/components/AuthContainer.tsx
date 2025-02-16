import styles from './AuthContainer.module.scss';
import { ReactNode } from 'react';

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer = ({children}: AuthContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default AuthContainer;