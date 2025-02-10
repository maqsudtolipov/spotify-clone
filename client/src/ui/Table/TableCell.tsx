import { ReactNode } from 'react';

interface TableCellProps {
  children: ReactNode;
  className?: string;
  alignRight?: boolean;
  minimize?: boolean;
  onClick?: () => void;
}

const TableCell = ({
  className,
  alignRight,
  minimize,
  children,
}: TableCellProps) => {
  return (
    <td
      className={`${className} ${alignRight ? 'text-right' : ''} ${minimize ? 'w-1' : ''}`}
    >
      {children}
    </td>
  );
};

export default TableCell;
