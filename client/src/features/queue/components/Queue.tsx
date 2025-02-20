import styles from './Queue.module.scss';
import QueueHeader from './header/QueueHeader.tsx';
import { RiArrowLeftWideLine } from 'react-icons/ri';
import QueueList from './list/QueueList.tsx';

interface QueueProps {
  isQueueOpen: boolean;
}

const Queue = ({  }: QueueProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.toggleArea}>
        <RiArrowLeftWideLine />
      </div>
      <div className={styles.queue}>
        <QueueHeader />
        <QueueList />
      </div>
    </div>
  );
};

export default Queue;
