import styles from './Queue.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';

const QueueHeader = () => {
  return (
    <header className={styles.header}>
      <span>Queue</span>
      <RiCloseLargeFill />
    </header>
  );
};

export default QueueHeader;
