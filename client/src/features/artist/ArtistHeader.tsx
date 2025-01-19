import styles from './Artist.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getArtist } from './artistThunks.ts';
import { useParams } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen.tsx';

const ArtistHeader = () => {
  const { id } = useParams();
  const data = useAppSelector((state) => state.artist.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtist(id));
  }, [id]);

  if (!data) return <LoadingScreen />;

  return (
    <header
      className={styles.artistHeader}
      style={{
        background: `linear-gradient(${data.color}, ${data.color}), linear-gradient(#171717, #171717)`,
      }}
    >
      <div className={styles.artistVerified}>
        <RiVerifiedBadgeFill />
        <span>Verified Artist</span>
      </div>
      <h1 className={styles.artistName}>{data.name}</h1>
      <span>1234 listeners</span>
    </header>
  );
};

export default ArtistHeader;
