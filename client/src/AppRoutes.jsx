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
              <main className="bg-gradient-to-b from-purple-500/[0.2] to-neutral-900 rounded-lg p-4 overflow-hidden">
                <Tabs defaultValue="all">
                  <TabsList>
                    <Tab value="all">All</Tab>
                    <Tab value="artists">Artists</Tab>
                    <Tab value="playlsits">Playlists</Tab>
                    <Tab value="songs">Songs</Tab>
                  </TabsList>
                </Tabs>

                <Tabs defaultValue="one">
                  <TabsList>
                    <Tab value="one">One</Tab>
                    <Tab value="two">Two</Tab>
                    <Tab value="three">Three</Tab>
                    <Tab value="four">Four</Tab>
                    <Tab value="five">Five</Tab>
                    <Tab value="six">Six</Tab>
                    <Tab value="seven">Seven</Tab>
                    <Tab value="eight">Eight</Tab>
                    <Tab value="nine">Nine</Tab>
                    <Tab value="ten">Ten</Tab>
                    <Tab value="eleven">Eleven</Tab>
                    <Tab value="twelve">Twelve</Tab>
                    <Tab value="thirteen">Thirteen</Tab>
                    <Tab value="sixteen">Sixteen</Tab>
                    <Tab value="seventeen">Seventeen</Tab>
                    <Tab value="eighteen">Eighteen</Tab>
                    <Tab value="nineteen">Nineteen</Tab>
                    <Tab value="tenteen">Tenteen</Tab>
                    <Tab value="eleventeen">Eleventeen</Tab>
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
