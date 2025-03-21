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
import FullSpinner from './ui/statusScreens/FullSpinner.tsx';

const AppRoutes = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user?.data?.id);
  const { status } = useAppSelector((state) => state.user.api.getCurrent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // NOTE: Auth checks
    // 1. (!isAuth) runs for auto login when user returns back to app
    // 2. (isAuth && !userId) runs for fetching user data after login
    if (!isAuth || (isAuth && !userId)) dispatch(getCurrent());
  }, [isAuth, userId, dispatch]);

  if ((status === 'idle' || status === 'pending')) { // this had also (& !auth)
    return <FullSpinner />;
  }

  return (
    <Routes>
      {isAuth && userId && (
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
