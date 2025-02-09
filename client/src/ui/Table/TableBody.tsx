import styles from './Table.module.scss';
import { ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps) => {
  return <tbody className={styles.tableBody}>{children}</tbody>;
};

export default TableBody;
