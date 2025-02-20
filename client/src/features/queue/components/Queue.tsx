import styles from './Queue.module.scss';
import QueueHeader from './header/QueueHeader.tsx';
import { RiArrowLeftWideLine } from 'react-icons/ri';

interface QueueProps {
  isQueueOpen: boolean;
}

const Queue = ({ isQueueOpen }: QueueProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.toggleArea}>
        <RiArrowLeftWideLine />
      </div>
      <div className={styles.queue}>
        <QueueHeader />
        {/*<QueueList />*/}
      </div>
    </div>
  );
};

export default Queue;
