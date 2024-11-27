import styles from './Cells.module.scss';
import TableCell from '../TableCell.tsx';
import { RiMoreFill } from 'react-icons/ri';

const ActionsCell = () => {
  return (
    <TableCell className={styles.actionsCell} minimize={true}>
      <RiMoreFill />
    </TableCell>
  );
};

export default ActionsCell;
