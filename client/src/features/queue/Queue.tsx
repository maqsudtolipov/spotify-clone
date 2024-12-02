import styles from './Queue.module.scss';
import QueueHeader from './QueueHeader.tsx';
import { useEffect, useState } from 'react';

const Queue = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // TODO: Auto open queue after closed after 3 seconds
  useEffect(() => {
    console.log('hit effect');
    if (!isOpen) {
      setTimeout(() => setIsOpen(true), 3000);
      console.log('hit interval');
    }
  }, [isOpen]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={`${styles.queue} ${!isOpen ? styles.queueHidden : ''}`}>
      <QueueHeader onClick={handleToggle} />
      <p>Queue</p>
    </div>
  );
};

export default Queue;
