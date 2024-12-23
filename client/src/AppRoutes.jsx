import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ArtistPage from './pages/ArtistPage.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import HomePage from './pages/HomePage.tsx';
import PlaylistPage from './pages/PlaylistPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import Login from './features/auth/Login.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { useEffect } from 'react';
import { getCurrent } from './features/auth/userThunks.ts';

const AppRoutes = () => {
  const { isAuth, status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) dispatch(getCurrent());
  }, [isAuth, dispatch]);

  return (
    <Routes>
      {status === 'fulfilled' && isAuth && (
        <>
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
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {status === 'rejected' && !isAuth && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {(status === 'idle' || status === 'pending') && !isAuth && (
        <Route path="*" element={<h1>Trying to login</h1>} />
      )}
    </Routes>
  );
};

export default AppRoutes;
