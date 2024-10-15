import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './layout/Nav/Nav.jsx';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
