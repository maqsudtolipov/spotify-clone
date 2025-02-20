import styles from './Queue.module.scss';
import QueueHeader from './header/QueueHeader.tsx';
import { RiArrowLeftWideLine } from 'react-icons/ri';
import QueueList from './list/QueueList.tsx';
import { useState } from 'react';

interface QueueProps {}

const Queue = ({}: QueueProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const containerClass = isOpen
    ? `${styles.container} ${styles.containerOpen}`
    : `${styles.container} ${styles.containerClosed}`;

  return (
    <div className={containerClass}>
      {!isOpen && (
        <div className={styles.toggleArea} onClick={() => handleOpen()}>
          <RiArrowLeftWideLine />
        </div>
      )}

      <div className={styles.queue}>
        <QueueHeader onClick={handleClose} />
        <QueueList />
      </div>
    </div>
  );
};

export default Queue;
