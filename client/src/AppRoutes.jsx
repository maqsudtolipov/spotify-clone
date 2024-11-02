import styles from './AppRoutes.module.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layout/Nav/Nav.jsx';
import Library from './layout/Library/Library.jsx';
import Tabs from './ui-library/Tabs/Tabs.jsx';
import TabsList from './ui-library/Tabs/TabsList.jsx';
import Tab from './ui-library/Tabs/Tab.jsx';

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
                <Tabs defaultValue="songs">
                  <TabsList>
                    <Tab value="artists">All</Tab>
                    <Tab value="artists">Artists</Tab>
                    <Tab value="artists">Playlists</Tab>
                    <Tab value="artists">Songs</Tab>
                  </TabsList>
                </Tabs>
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
