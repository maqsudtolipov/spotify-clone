import styles from './Artist.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

interface Data {
  name: string;
  listeners: string;
}

interface ArtistHeaderProps {
  color: string;
}

const ArtistHeader = ({ color }: ArtistHeaderProps) => {
  const [artist, setArtist] = useState<Data>();

  useEffect(() => {
    const data = {
      name: faker.person.fullName(),
      listeners: faker.number
        .int({ min: 1000, max: 20000 })
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    };

    setArtist(data);
  }, []);

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
      <h1 className={styles.artistName}>{artist?.name}</h1>
      <span>{artist?.listeners} listeners</span>
    </header>
  );
};

export default ArtistHeader;
