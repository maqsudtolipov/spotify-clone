import styles from './AppRoutes.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layout/Nav/Nav.jsx';
import Library from './layout/Library/Library.jsx';

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
              <main>Main</main>
              <div>Player</div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
