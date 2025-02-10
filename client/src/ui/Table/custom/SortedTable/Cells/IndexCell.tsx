import styles from './IndexCell.module.scss';
import TableCell from '../../../TableCell.tsx';
import { ReactNode } from 'react';
import { RiPlayLargeFill } from 'react-icons/ri';

interface IndexCellProps {
  children: ReactNode;
}

const IndexCell = ({ children }: IndexCellProps) => {
  return (
    <TableCell className={styles.indexCell}>
      <span>{children}</span>
      <RiPlayLargeFill />
    </TableCell>
  );
};

export default IndexCell;
