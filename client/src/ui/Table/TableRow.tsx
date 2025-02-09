import styles from './Table.module.scss';
import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return <tr className={styles.tableRow}>{children}</tr>;
};

export default TableRow;
