import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ArtistPage from './pages/ArtistPage.tsx';
import NotFound from './pages/helper/NotFound.tsx';
import Login from './pages/auth/Login.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import HomePage from './pages/HomePage.tsx';
import PlaylistPage from './pages/PlaylistPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/playlist"
        element={
          <Layout>
            <PlaylistPage />
          </Layout>
        }
      />
      <Route
        path="/artist"
        element={
          <Layout>
            <ArtistPage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProfilePage />
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
