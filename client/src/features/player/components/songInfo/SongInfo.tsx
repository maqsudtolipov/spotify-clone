import styles from './SongInfo.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks.ts';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { dislikeSong, likeSong } from '../../../user/userThunks.ts';

const isSongLiked = (id: string, likedSongs: string[]) => {
  return likedSongs.includes(id);
};

const SongInfo = () => {
  const song = useAppSelector((state) => state.queue.items[0]);
  const likedSongs =
    useAppSelector((state) => state.user?.data?.likedSongs?.songs) || [];
  const dispatch = useAppDispatch();

  const toggleLikeDislike = (e) => {
    e.currentTarget.blur();

    isSongLiked(song._id, likedSongs)
      ? dispatch(dislikeSong({ id: song._id }))
      : dispatch(likeSong({ id: song._id }));
  };

  if (!song) return <div></div>;

  return (
    <div className={styles.songInfo}>
      <img src={song.img.url} alt={`${song.name} cover`} />
      <div className={styles.textContainer}>
        <div>
          <p className={styles.name}>{song.name}</p>
          <p className={styles.artist}>{song.artist.name}</p>
        </div>
      </div>
      <button
        className={`${styles.likeBtn} ${isSongLiked(song._id, likedSongs) ? styles.likeBtnActive : ''}`}
        onClick={toggleLikeDislike}
      >
        {isSongLiked(song._id, likedSongs) ? <RiHeartFill /> : <RiHeartLine />}
      </button>
    </div>
  );
};

export default SongInfo;
