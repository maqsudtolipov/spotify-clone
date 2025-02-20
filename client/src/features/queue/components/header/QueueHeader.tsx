import styles from '../Queue.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import IconButton from '../../../../ui/IconButton/IconButton.tsx';

interface QueueHeaderProps {
  onClick?: () => void;
}

const QueueHeader = ({ onClick }: QueueHeaderProps) => {
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
