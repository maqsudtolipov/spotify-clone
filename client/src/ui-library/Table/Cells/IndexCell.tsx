import styles from './Cells.module.scss';
import TableCell from '../TableCell.tsx';
import { ReactNode } from 'react';

interface IndexCellProps {
  children: ReactNode;
}

const IndexCell = ({ children }: IndexCellProps) => {
  return <TableCell className={styles.indexCell}>{children}</TableCell>;
};

export default IndexCell;
