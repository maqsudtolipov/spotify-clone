import { ReactNode } from 'react';

interface TableCellProps {
  className?: string;
  children: ReactNode;
}

const TableCell = ({ className, children, ...rest }: TableCellProps) => {
  return (
    <td className={className} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
