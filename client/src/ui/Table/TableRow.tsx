import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({children }: TableRowProps) => {
  return <tr className='select-none'>{children}</tr>;
};

export default TableRow;
