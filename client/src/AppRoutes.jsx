import { Route, Routes } from 'react-router-dom';
import Layout from './Layout.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <main className="bg-gradient-to-b from-sky-500/[0.5] to-neutral-900 rounded-lg p-4 overflow-hidden"></main>
            <div className="p-4">Player</div>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
