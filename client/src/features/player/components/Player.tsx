import styles from './Player.module.scss';
import PlayerActions from './playerActions/PlayerActions.tsx';

const Player = () => {
  return (
    <div className={styles.player}>
      <div>song</div>
      <PlayerActions />
    </div>
  );
};

export default Player;
