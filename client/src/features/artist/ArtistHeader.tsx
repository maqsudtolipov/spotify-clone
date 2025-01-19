import styles from './Artist.module.scss';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useAppDispatch } from '../../app/hooks.ts';
import { getArtist } from './artistThunks.ts';

interface Data {
  name: string;
  listeners: string;
}

interface ArtistHeaderProps {
  color: string;
}

const ArtistHeader = ({ color }: ArtistHeaderProps) => {
  const [artist, setArtist] = useState<Data>();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(getArtist('678cb2f1152ba9b15bb3af40'));
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
