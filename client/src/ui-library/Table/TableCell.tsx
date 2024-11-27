import { ReactNode } from 'react';

interface TableCellProps {
  children: ReactNode;
}

const TableCell = ({ children }: TableCellProps) => {
  return <td>{children}</td>;
};

export default TableCell;
