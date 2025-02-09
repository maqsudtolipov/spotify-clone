import styles from './Table.module.scss';
import { ReactNode } from 'react';

interface TableHeader {
  children: ReactNode;
}

const TableHeader = ({ children }: TableHeader) => {
  return <thead className={styles.tableHeader}>{children}</thead>;
};

export default TableHeader;
