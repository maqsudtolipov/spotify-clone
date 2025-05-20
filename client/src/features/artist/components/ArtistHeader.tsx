import styles from './ArtistHeader.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useAppSelector } from '../../../redux/hooks.ts';
import { selectArtist } from '../artistSlice.ts';

interface AristHeaderProps {
  bgColor: string;
  textColor: string;
}

const ArtistHeader = ({ bgColor, textColor }: AristHeaderProps) => {
  const artist = useAppSelector(selectArtist);
  if (!artist) return null;

  const { name, followersCount } = artist;
  const background = {
    background: `linear-gradient(${bgColor}, ${bgColor}), linear-gradient(#171717, #171717)`,
  };

  return (
    <header className={styles.artistHeader} style={background}>
      <div className={styles.artistVerified}>
        <RiVerifiedBadgeFill />
        <span>Verified Artist</span>
      </div>
      <h1 className={styles.artistName} style={{ color: textColor }}>
        {name}
      </h1>
      <span>{followersCount} listeners</span>
    </header>
  );
};

export default ArtistHeader;
