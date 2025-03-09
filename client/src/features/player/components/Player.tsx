import styles from './Player.module.scss';
import PlayerActions from './playerActions/PlayerActions.tsx';
import SongInfo from './songInfo/SongInfo.tsx';

const Player = () => {
  return (
    <div className={styles.player}>
      <SongInfo />
      <PlayerActions />
    </div>
  );
};

export default Player;
