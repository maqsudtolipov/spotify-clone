import styles from './Artist.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

const ArtistHeader = () => {
  const randomHexColor =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  return (
    <div
      className={styles.artistHeader}
      style={{
        background: `linear-gradient(${randomHexColor}, ${randomHexColor}), linear-gradient(#171717, #171717)`,
      }}
    >
      <div className={styles.artistVerified}>
        <RiVerifiedBadgeFill />
        <span>Verified Artist</span>
      </div>
      <h1 className={styles.artistName}>Full Gates</h1>
      <span>1,234 listeners</span>
    </div>
  );
};

export default ArtistHeader;
