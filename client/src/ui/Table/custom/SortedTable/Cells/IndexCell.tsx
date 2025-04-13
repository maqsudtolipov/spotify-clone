import styles from './IndexCell.module.scss';
import TableCell from '../../../TableCell.tsx';
import { ReactNode } from 'react';
import { RiPlayLargeFill } from 'react-icons/ri';

interface IndexCellProps {
  children: ReactNode;
  onClick?: () => void;
}

const IndexCell = ({ children, onClick }: IndexCellProps) => {
  return (
    <TableCell className={styles.indexCell} onClick={onClick}>
      <span>{children}</span>
      <RiPlayLargeFill />
    </TableCell>
  );
};

export default IndexCell;
