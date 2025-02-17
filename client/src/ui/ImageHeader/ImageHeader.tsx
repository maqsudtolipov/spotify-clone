import styles from './ImageHeader.module.scss';
import { meta } from 'eslint-plugin-react/lib/rules/jsx-props-no-spread-multi';
import { Playlist } from '../../features/playlist/playlistSlice.ts';
import { Link } from 'react-router-dom';
import secondsToHourAndMins from '../../features/playlist/helpers/secondsToHourAndMins.ts';
import description = meta.docs.description;

interface ImageHeaderProps {
  data: Playlist;
  type: 'playlist' | 'user';
}

// TODO: Refactor if needed
const ImageHeader = ({ data, type }: ImageHeaderProps) => {
  const gradient = {
    background: `linear-gradient(${data.color}, ${data.color}), linear-gradient(#171717, #171717)`,
  };

  return (
    <header className={styles.header} style={gradient}>
      <img
        className={`${styles.img} ${type === 'user' ? styles.imgRounded : ''}`}
        src={data.img.url}
        alt={data.name}
      />

      <div>
        <span className={styles.type}>
          {type === 'playlist' ? 'Playlist' : 'User'}
        </span>
        <h1 className={styles.name}>{data.name}</h1>

        {description && (
          <p className={styles.description}>{data.description}</p>
        )}

        <div className={styles.statistics}>
          {data.user && (
            <Link
              to={`/${data.user.role}/${data.user.id}`}
              className={styles.user}
            >
              <img src={data.user.img.url} alt={data.user.name} />
              <span>{data.user.name}</span>
            </Link>
          )}

          {/* TODO: normalize */}
          {data.statistics && (
            <span>
              {`${data.user ? '• ' : ''}${data.statistics
                .map((data) => `${data.value} ${data.name}`)
                .join(' • ')}`}
            </span>
          )}

          {type === 'playlist' &&
            `•  ${data.length} songs, ${secondsToHourAndMins(data.duration)}`}
        </div>
      </div>
    </header>
  );
};

export default ImageHeader;
