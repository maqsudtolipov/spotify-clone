import { ReactNode } from 'react';

interface TableCellProps {
  className?: string;
  alightRight?: boolean;
  minimize?: boolean;
  children: ReactNode;
}

const TableCell = ({
  className,
  alightRight,
  minimize,
  children,
  ...rest
}: TableCellProps) => {
  return (
    <td
      className={`${className ? className : ''} ${alightRight ? 'text-right' : ''} ${minimize ? 'w-1' : ''}`}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableCell;
