import { ReactNode } from 'react';

interface TableCellProps {
  alightRight?: boolean;
  className?: string;
  children: ReactNode;
}

const TableCell = ({
  className,
  alightRight,
  children,
  ...rest
}: TableCellProps) => {
  return (
    <td className={`${className} ${alightRight ? 'text-right' : ''}`} {...rest}>
      {children}
    </td>
  );
};

export default TableCell;
