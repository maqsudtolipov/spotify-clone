import styles from './QueueHeader.module.scss';
import { RiCloseLargeFill } from 'react-icons/ri';
import IconButton from '../../../../ui/IconButton/IconButton.tsx';
import { useAppSelector } from '../../../../redux/hooks.ts';

interface QueueHeaderProps {
  onClick?: () => void;
}

const QueueHeader = ({ onClick }: QueueHeaderProps) => {
  const name = useAppSelector((state) => state.queue.currentListName);

  return (
    <header className={styles.header}>
      <span>Queue {name ? `from ${name}` : ''} </span>

      <IconButton onClick={onClick}>
        <RiCloseLargeFill />
      </IconButton>
    </header>
  );
};

export default QueueHeader;
