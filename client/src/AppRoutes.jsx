import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Search from './Pages/Search.tsx';
import Playlist from './Pages/Playlist.tsx';
import Artist from './Pages/Artist.tsx';
import Profile from './Pages/Profile.tsx';
import NotFound from './Pages/NotFound.tsx';
import Login from './Pages/Login.tsx';
import SignUp from './Pages/SignUp.tsx';
import ForgotPassword from './Pages/ForgotPassword.tsx';
import ResetPassword from './Pages/ResetPassword.tsx';
import Home from './Pages/Home.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/playlist"
        element={
          <Layout>
            <Playlist />
          </Layout>
        }
      />
      <Route
        path="/artist"
        element={
          <Layout>
            <Artist />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Layout>
            <ForgotPassword />
          </Layout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Layout>
            <ResetPassword />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
