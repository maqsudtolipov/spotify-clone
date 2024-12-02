import styles from './Queue.module.scss';
import QueueHeader from './QueueHeader.tsx';

const Queue = () => {
  return (
    <div className={styles.queue}>
      <QueueHeader />
      <p>Queue</p>
    </div>
  );
};

export default Queue;
