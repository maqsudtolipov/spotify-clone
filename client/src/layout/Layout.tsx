import { ReactNode } from 'react';
import styles from './Layout.module.scss';
import Nav from './Nav/Nav';
import Library from '../features/library/components/Library';
import Footer from './Footer/Footer.tsx';
import Queue from '../features/queue/components/Queue.tsx';
import Player from '../features/player/components/Player.tsx';

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
      <Queue />
      <Player />
    </div>
  );
};

export default Layout;
