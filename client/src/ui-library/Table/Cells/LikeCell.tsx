import styles from './Cells.module.scss';
import { RiHeartLine } from 'react-icons/ri';
import TableCell from '../TableCell.tsx';

const LikeCell = () => {
  return (
    <TableCell className={styles.likeCell} minimize={true}>
      <RiHeartLine />
    </TableCell>
  );
};

export default LikeCell;
