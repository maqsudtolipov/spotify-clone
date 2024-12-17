import styles from './Cells.module.scss';
import { RiHeartFill } from 'react-icons/ri';
import TableCell from '../TableCell.tsx';

interface LikeCellProps {
  isLiked: boolean;
}

const LikeCell = ({ isLiked }: LikeCellProps) => {
  return (
    <TableCell
      className={`${styles.likeCell} ${isLiked ? styles.likeCellHighlighted : ''}`}
      minimize={true}
    >
      <RiHeartFill />
    </TableCell>
  );
};

export default LikeCell;
