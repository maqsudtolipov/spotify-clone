import styles from './Table.module.scss';
import { ReactNode } from 'react';

interface TableCellProps {
  position?: 'left' | 'right';
  children: ReactNode;
}

const TableCell = ({ position, children }: TableCellProps) => {
  return (
    <td
      className={`${styles.tableCell} ${position === 'right' ? styles.right : ''}`}
    >
      {children}
    </td>
  );
};

export default TableCell;
