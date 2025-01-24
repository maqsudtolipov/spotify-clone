import styles from './Dropdown.module.scss';
import { forwardRef, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

interface DropdownListProps {
  position?: 'bottom-left' | 'bottom-right';
  children: ReactNode;
}

// FIXME: not a good method
const DropdownList = forwardRef<HTMLUListElement, DropdownListProps>(
  ({ position = 'bottom-left', children, ...rest }, ref) => {
    const { isOpen, closeDropdown } = useContext(DropdownContext);
    const { ref: hookRef } = useOutsideClick(closeDropdown);

    return isOpen ? (
      <ul
        ref={ref || hookRef}
        className={`${styles.listContainer} ${styles[position]}`}
        {...rest}
      >
        {children}
      </ul>
    ) : null;
  }
);

export default DropdownList;
