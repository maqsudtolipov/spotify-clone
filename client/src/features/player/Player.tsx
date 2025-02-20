import styles from './Player.module.scss';
import PlayerActions from './PlayerActions.tsx';

const Player = () => {
  return (
    <div className={styles.player}>
      <div>song</div>
      <PlayerActions />
      <div>volume</div>
    </div>
  );
};

export default Player;
