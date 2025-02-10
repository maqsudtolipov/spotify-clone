import styles from './LikeCell.module.scss';
import { RiHeartFill } from 'react-icons/ri';
import TableCell from '../../../TableCell.tsx';

interface LikeCellProps {
  isLiked: boolean;
  onClick?: () => void;
}

const LikeCell = ({ isLiked, onClick }: LikeCellProps) => {
  return (
    <TableCell
      className={`${styles.likeCell} ${isLiked ? styles.likeCellHighlighted : ''}`}
      minimize={true}
      onClick={onClick}
    >
      <RiHeartFill />
    </TableCell>
  );
};

export default LikeCell;
