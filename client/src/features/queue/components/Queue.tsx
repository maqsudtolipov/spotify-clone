import styles from './Queue.module.scss';
import QueueHeader from './header/QueueHeader.tsx';
import QueueList from './QueueList.tsx';

interface QueueProps {
  isQueueOpen: boolean;
}

const Queue = ({ isQueueOpen }: QueueProps) => {
  return (
    <div
      className={`${styles.queue} ${!isQueueOpen ? styles.queueHidden : ''}`}
    >
      <QueueHeader />
      <QueueList />
    </div>
  );
};

export default Queue;
