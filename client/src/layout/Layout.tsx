import { ReactNode } from 'react';
import styles from '../AppRoutes.module.scss';
import Nav from './Nav/Nav';
import Library from '../features/library/Library';
import Footer from './Footer/Footer.tsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.app}>
      <Nav />
      <Library />
      <main className="bg-neutral-900 rounded-lg overflow-hidden overflow-y-scroll">
        {children}
        <Footer />
      </main>

      <div className="p-4">Player</div>
    </div>
  );
};

export default Layout;
