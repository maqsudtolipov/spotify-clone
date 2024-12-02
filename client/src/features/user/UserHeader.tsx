import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import styles from './User.module.scss';

interface Data {
  img: string;
  name: string;
  followers: number;
  followings: number;
}

const UserHeader = () => {
  const [user, setUser] = useState<Data>();

  const color =
    '#' +
    ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') +
    '4d';

  useEffect(() => {
    const data = {
      img: faker.image.urlLoremFlickr({
        height: 240,
        width: 240,
        category: 'nature',
      }),
      name: faker.person.fullName(),
      followers: faker.number.int(30),
      followings: faker.number.int(30),
    };

    setUser(data);
  }, []);

  return (
    <header
      className={styles.playlistHeader}
      style={{
        background: `linear-gradient(${color}, ${color}), linear-gradient(#171717, #171717)`,
      }}
    >
      {user && (
        <>
          <img className={styles.headerImage} src={user.img} alt={user.name} />
          <div>
            <span>User</span>
            <h1 className={styles.playlistName}>{user.name}</h1>
            <div className={styles.playlistStatistics}>
              <span>
                {user.followers} followers • {user.followings} followings
              </span>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default UserHeader;
