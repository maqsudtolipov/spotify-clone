import styles from './AppRoutes.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layout/Nav/Nav.jsx';
import Library from './layout/Library/Library.jsx';
import Tabs from './ui-library/Tabs/Tabs.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.app}>
              <Nav />
              <Library />
              <main className="bg-gradient-to-b from-purple-500/[0.2] to-neutral-900 rounded-lg p-4">
                <Tabs defaultValue="songs"></Tabs>
              </main>
              <div className="p-4">Player</div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
