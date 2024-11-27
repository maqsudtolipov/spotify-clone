import styles from './Table.module.scss';
import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  return (
    <table className={styles.table}>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
