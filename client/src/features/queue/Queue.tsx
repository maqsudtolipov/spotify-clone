import styles from './Queue.module.scss';
import QueueHeader from './QueueHeader.tsx';
import QueueList from './QueueList.tsx';

interface QueueProps {
  isQueueOpen: boolean;
}

const Queue = ({ isQueueOpen }: QueueProps) => {
  // useEffect(() => {
  //   console.log('hit effect');
  //   if (!isOpen) {
  //     setTimeout(() => setIsOpen(true), 3000);
  //     console.log('hit interval');
  //   }
  // }, [isOpen]);
  //
  // const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`${styles.queue} ${!isQueueOpen ? styles.queueHidden : ''}`}
    >
      {/*<QueueHeader onClick={handleToggle} />*/}
      <QueueHeader />
      <QueueList />
    </div>
  );
};

export default Queue;
