import styles from './Queue.module.scss';
import QueueHeader from './header/QueueHeader.tsx';
import { RiArrowLeftWideLine } from 'react-icons/ri';
import QueueList from './list/QueueList.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { closeQueue, openQueue } from '../queueSlice.ts';

interface QueueProps {}

const Queue = ({}: QueueProps) => {
  const isOpen = useAppSelector((state) => state.queue.isOpen);
  const dispatch = useAppDispatch();
  // const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    dispatch(openQueue());
  };
  const handleClose = () => {
    dispatch(closeQueue());
  };

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
