import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import SearchPage from './pages/SearchPage.tsx';
import ArtistPage from './pages/ArtistPage.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import HomePage from './pages/HomePage.tsx';
import Login from './features/auth/Login.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { useEffect } from 'react';
import { getCurrent } from './features/auth/userThunks.ts';
import SignUp from './features/auth/SignUp.tsx';
import UserProfile from './features/userPage/components/UserProfile.tsx';
import Playlist from './features/playlist/components/Playlist.tsx';

const AppRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { status } = useAppSelector((state) => state.user.api.getCurrent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) dispatch(getCurrent());
  }, [dispatch, isAuth]);

  return (
    <Routes>
      {isAuth && (
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
            path="/playlist/:id"
            element={
              <Layout>
                <Playlist />
              </Layout>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <Layout>
                <ArtistPage />
              </Layout>
            }
          />
          {/*<Route*/}
          {/*  path="/userPage"*/}
          {/*  element={*/}
          {/*    <Layout>*/}
          {/*      <UserPage />*/}
          {/*    </Layout>*/}
          {/*  }*/}
          {/*/>*/}
          <Route
            path="/user/:id"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {!isAuth && status === 'rejected' && (
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
