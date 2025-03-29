import { Playlist } from '../../playlistTypes.ts';
import secondsToHourAndMins from '../../helpers/secondsToHourAndMins.ts';
import styles from '../../../../ui/ImageHeader/ImageHeader.module.scss';

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
          {`• ${data.length} songs, ${secondsToHourAndMins(data.duration)}`}
        </div>
      </div>
    </header>
  );
};

export default PlaylistHeader;
