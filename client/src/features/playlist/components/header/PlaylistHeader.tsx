import { Playlist } from '../../playlistTypes.ts';
import secondsToHourAndMins from '../../helpers/secondsToHourAndMins.ts';
import styles from '../../../../ui/ImageHeader/ImageHeader.module.scss';
import { Link } from 'react-router-dom';

interface ImageHeaderProps {
  data: Playlist;
  bgColor: string;
  textColor: string;
}

const PlaylistHeader = ({ data, bgColor, textColor }: ImageHeaderProps) => {
  const gradient = {
    background: `linear-gradient(${bgColor}, ${bgColor}), linear-gradient(#171717, #171717)`,
  };

  return (
    <header className={styles.header} style={gradient}>
      <img className={`${styles.img}`} src={data.img.url} alt={data.name} />

      <div>
        <span className={styles.type}>Playlist</span>
        <h1 className={styles.name} style={{ color: textColor }}>
          {data.name}
        </h1>

        {data.description && (
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

          {`• ${data.length} songs, ${secondsToHourAndMins(data.duration)}`}
        </div>
      </div>
    </header>
  );
};

export default PlaylistHeader;
