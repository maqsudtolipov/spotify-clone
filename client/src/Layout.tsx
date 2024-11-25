import { ReactNode } from 'react';
import styles from './AppRoutes.module.scss';
import Nav from './layout/Nav/Nav';
import Library from './features/library/Library';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.app}>
      <Nav />
      <Library />
      {children}
    </div>
  );
};

export default Layout;
