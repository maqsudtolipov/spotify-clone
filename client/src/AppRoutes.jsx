import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>Main page</Layout>} />
    </Routes>
  );
};

export default AppRoutes;
