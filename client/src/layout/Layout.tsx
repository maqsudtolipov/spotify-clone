import { ReactNode, useState } from 'react';
import styles from '../AppRoutes.module.scss';
import Nav from './Nav/Nav';
import Library from '../features/library/Library';
import Footer from './Footer/Footer.tsx';
import Queue from '../features/queue/Queue.tsx';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isQueueOpen, setIsQueueOpen] = useState<boolean>(false);

  return (
    <div className={styles.app}>
      <Nav />
      <Library />
      <main className="bg-neutral-900 rounded-lg overflow-hidden overflow-y-scroll">
        {children}
        <Footer />
      </main>
      <Queue isQueueOpen={isQueueOpen} />
      <div style={{ gridColumn: '1/-1', gridRow: '3/4', padding: '16px' }}>
        Player
      </div>
      <div
        style={{
          gridColumn: '1/-1',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#aaa'
        }}
      >
        <button className="btn" onClick={() => setIsQueueOpen((prev) => !prev)}>
          Toggle queue panel
        </button>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '8px',
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/artist">Artist</Link>
          <Link to="/playlist">Playlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
