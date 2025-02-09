import { ReactNode } from 'react';

interface TableCellProps {
  className?: string;
  alignRight?: boolean;
  minimize?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const TableCell = ({
  className,
  alignRight,
  minimize,
  children,
  ...rest
}: TableCellProps) => {
  return (
    <td
      className={`${className ? className : ''} ${alignRight ? 'text-right' : ''} ${minimize ? 'w-1' : ''}`}
      {...rest}
    >
      {children}
    </td>
  );
};

export default TableCell;
