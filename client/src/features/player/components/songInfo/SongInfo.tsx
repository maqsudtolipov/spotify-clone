import styles from './SongInfo.module.scss';
import { useAppSelector } from '../../../../redux/hooks.ts';
import { RiHeartLine } from 'react-icons/ri';

const SongInfo = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  console.log(song);

  return (
    <div className={styles.songInfo}>
      <img src={song.img.url} alt={`${song.name} cover`} />
      <div className={styles.textContainer}>
        <div>
          <p className={styles.name}>{song.name}</p>
          <p className={styles.artist}>{song.artist.name}</p>
        </div>
      </div>
      <button className={styles.likeBtn}>
        <RiHeartLine />
      </button>
    </div>
  );
};

export default SongInfo;
