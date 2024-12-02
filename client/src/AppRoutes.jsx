import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Search from './pages/Search.tsx';
import ArtistPage from './pages/ArtistPage.tsx';
import Profile from './pages/Profile.tsx';
import NotFound from './pages/NotFound.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import Home from './pages/Home.tsx';
import PlaylistPage from './pages/PlaylistPage.tsx';
import UserPage from './pages/UserPage.tsx';

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
        path="/user"
        element={
          <Layout>
            <UserPage />
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
