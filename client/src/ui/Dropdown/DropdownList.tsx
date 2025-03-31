import styles from './DropdownList.module.scss';
import { forwardRef, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

interface DropdownListProps {
  position?: 'bottom-left' | 'bottom-right';
  removeOutsideClick?: boolean;
  children: ReactNode;
}

const DropdownList = forwardRef<HTMLDivElement | HTMLUListElement | null, DropdownListProps>(
  (
    {
      position = 'bottom-left',
      removeOutsideClick = false,
      children,
    }: DropdownListProps,
    ref,
  ) => {
    const context = useContext(DropdownContext);
    if (!context) {
      throw new Error('DropdownList should be used within the Dropdown');
    }

    const { isOpen, closeDropdown } = context;

    const { ref: outsideRef } = useOutsideClick(
      closeDropdown,
      removeOutsideClick,
    );

    if (!isOpen) return null;

    return (
      <ul
        ref={ref || outsideRef}
        className={`${styles.listContainer} ${styles[position]}`}
      >
        {children}
      </ul>
    );
  },
);

export default DropdownList;
