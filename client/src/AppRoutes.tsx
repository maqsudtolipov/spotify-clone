import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
import Home from './features/home/Home.tsx';
import Login from './features/user/components/Login.tsx';
import { useAppDispatch, useAppSelector } from './redux/hooks.ts';
import { useEffect } from 'react';
import { getCurrent } from './features/user/userThunks.ts';
import SignUp from './features/user/components/SignUp.tsx';
import UserProfile from './features/userPage/components/UserProfile.tsx';
import Playlist from './features/playlist/components/Playlist.tsx';
import Search from './features/search/components/Search.tsx';
import Artist from './features/artist/components/Artist.tsx';
import FullSpinner from './ui/spinner/FullSpinner.tsx';

const AppRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { status } = useAppSelector((state) => state.user.api.getCurrent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) dispatch(getCurrent());
  }, [dispatch, isAuth]);

  if ((status === 'idle' || status === 'pending') && !isAuth) {
    return <FullSpinner />;
  }

  return (
    <Routes>
      {isAuth && (
        <>
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
                <Artist />
              </Layout>
            }
          />
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
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
