import styles from './ArtistHeader.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useAppSelector } from '../../../redux/hooks.ts';
import { selectArtist } from '../artistSlice.ts';

const ArtistHeader = () => {
  const artist = useAppSelector(selectArtist);
  if (!artist) return null;

  const { name, color, followersCount } = artist;
  const background = {
    background: `linear-gradient(${color}, ${color}), linear-gradient(#171717, #171717)`,
  };

  return (
    <header className={styles.artistHeader} style={background}>
      <div className={styles.artistVerified}>
        <RiVerifiedBadgeFill />
        <span>Verified Artist</span>
      </div>
      <h1 className={styles.artistName}>{name}</h1>
      <span>{followersCount} listeners</span>
    </header>
  );
};

export default ArtistHeader;
