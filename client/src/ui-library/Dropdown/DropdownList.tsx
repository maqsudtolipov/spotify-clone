import styles from './Dropdown.module.scss';
import { forwardRef, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownListProps {
  position?: 'bottom-left' | 'bottom-right';
  children: ReactNode;
}

const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>(
  ({ position = 'bottom-left', children, ...rest }, ref) => {
    const { isOpen } = useContext(DropdownContext);

    return isOpen ? (
      <ul
        ref={ref}
        className={`${styles.listContainer} ${styles[position]}`}
        {...rest}
      >
        {children}
      </ul>
    ) : null;
  }
);

export default DropdownList;
