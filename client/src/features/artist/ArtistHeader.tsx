import styles from './Artist.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks.ts';

const ArtistHeader = () => {
  const { color, name } = useAppSelector((state) => state.artist.data);

  return (
    <header
      className={styles.artistHeader}
      style={{
        background: `linear-gradient(${color}, ${color}), linear-gradient(#171717, #171717)`,
      }}
    >
      <div className={styles.artistVerified}>
        <RiVerifiedBadgeFill />
        <span>Verified Artist</span>
      </div>
      <h1 className={styles.artistName}>{name}</h1>
      <span>1234 listeners</span>
    </header>
  );
};

export default ArtistHeader;
