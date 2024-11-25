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
      <main className="bg-gradient-to-b from-sky-500/[0.5] to-neutral-900 rounded-lg overflow-hidden">
        {children}
        <Footer />
      </main>

      <div className="p-4">Player</div>
    </div>
  );
};

export default Layout;
