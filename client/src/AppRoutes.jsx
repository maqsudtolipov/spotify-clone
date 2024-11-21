import styles from './AppRoutes.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layout/Nav/Nav.jsx';
import Library from './features/library/Library.jsx';

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
              <main className="bg-gradient-to-b from-sky-500/[0.5] to-neutral-900 rounded-lg p-4 overflow-hidden"></main>
              <div className="p-4">Player</div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
