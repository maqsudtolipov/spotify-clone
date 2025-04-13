import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({children }: TableRowProps) => {
  return <tr>{children}</tr>;
};

export default TableRow;
