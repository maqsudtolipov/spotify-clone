import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import styles from './Playlist.module.scss';

interface Data {
  image: string;
  name: string;
  description: string;
  username: string;
  userImage: string;
  saves: number;
  songs: number;
}

interface ArtistHeaderProps {
  color: string;
}

const PlaylistHeader = ({ color }: ArtistHeaderProps) => {
  const [playlist, setPlaylist] = useState<Data>();

  useEffect(() => {
    const data = {
      image: faker.image.urlLoremFlickr({
        height: 240,
        width: 240,
        category: 'nature',
      }),
      name: `${faker.word.adjective()} ${faker.word.noun()}`,
      description: faker.lorem.lines(2),
      username: faker.lorem.words(2),
      userImage: faker.image.urlLoremFlickr({
        height: 24,
        width: 24,
        category: 'cat',
      }),
      saves: faker.number.int({ min: 20, max: 100 }),
      songs: faker.number.int({ min: 1, max: 20 }),
    };

    setPlaylist(data);
  }, []);

  return (
    <header
      className={styles.playlistHeader}
      style={{
        background: `linear-gradient(${color}, ${color}), linear-gradient(#171717, #171717)`,
      }}
    >
      {playlist && (
        <>
          <img
            className={styles.headerImage}
            src={playlist.image}
            alt={playlist.name}
          />
          <div>
            <span>Playlist</span>
            <h1 className={styles.playlistName}>{playlist.name}</h1>
            <p className={styles.playlistDescription}>
              {playlist.description} {playlist.description}{' '}
              {playlist.description}
            </p>
            <div className={styles.playlistStatistics}>
              <div className={styles.playlistUser}>
                <img src={playlist.userImage} alt={playlist.username} />
                <span>{playlist.username}</span>
              </div>
              <span>
                • {playlist.saves} saves • {playlist.songs} songs
              </span>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default PlaylistHeader;
