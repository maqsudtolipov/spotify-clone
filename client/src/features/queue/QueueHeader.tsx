import styles from './Queue.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import IconButton from '../../ui-library/IconButton/IconButton';
import { ReactEventHandler } from 'react';

const QueueHeader = ({ onClick }: { onClick: ReactEventHandler }) => {
  return (
    <header className={styles.header}>
      <span>Queue</span>

      <IconButton onClick={onClick}>
        <RiCloseLargeFill />
      </IconButton>
    </header>
  );
};

export default QueueHeader;
