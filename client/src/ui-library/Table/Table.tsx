import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => {
  return <table>{children}</table>;
};

export default Table;
