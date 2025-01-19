import ArtistTable from './ArtistTable.tsx';
import ArtistHeader from './ArtistHeader.tsx';
import PlayHeader from '../../components/PlayHeader/PlayHeader.tsx';
import GradientBackground from '../../components/GradientBackground/GradientBackground.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { getArtist } from './artistThunks.ts';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';

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
        <PlayHeader />
        <div className="p-5 pt-0">
          <ArtistTable />
        </div>
      </GradientBackground>
    </>
  );
};

export default Artist;
