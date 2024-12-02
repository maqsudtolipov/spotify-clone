import styles from './Queue.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import IconButton from '../../ui-library/IconButton/IconButton';

const QueueHeader = () => {
  return (
    <header className={styles.header}>
      <span>Queue</span>

      <IconButton>
        <RiCloseLargeFill />
      </IconButton>
    </header>
  );
};

export default QueueHeader;
