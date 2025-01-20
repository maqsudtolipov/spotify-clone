import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import PlayHeader from '../../components/PlayHeader/PlayHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from './artistThunks.ts';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';
import styles from '../../components/PlayHeader/PlayHeader.module.scss';
import PlayButton from '../../components/PlayHeader/PlayButton.tsx';
import FollowButton from '../../components/PlayHeader/FollowButton.tsx';
import HeaderActions from '../../components/PlayHeader/HeaderActions.tsx';

const Artist = () => {
  const { id } = useParams();
  const data = useAppSelector((state) => state.artist.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getArtist(id));
  }, [id]);

  if (!data) return <LoadingScreen />;

  return (
    <>
      <ArtistHeader />
      <GradientBackground color={data.color}>
        <div className={styles.playerHeader}>
          <PlayButton />
          <FollowButton />
          <HeaderActions />
        </div>
        <div className="p-5 pt-0">
          <ArtistTable />
        </div>
      </GradientBackground>
    </>
  );
};

export default Artist;
