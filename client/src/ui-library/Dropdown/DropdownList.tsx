import styles from './Dropdown.module.scss';
import { ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

interface DropdownListProps {
  position?: 'bottom-left' | 'bottom-right';
  children: ReactNode;
}

const DropdownList = ({
  position = 'bottom-left',
  children,
  ...rest
}: DropdownListProps) => {
  const { isOpen, closeDropdown } = useContext(DropdownContext);
  const ref = useOutsideClick(closeDropdown);

  return isOpen ? (
    <ul
      ref={ref}
      className={`${styles.listContainer} ${styles[position]}`}
      {...rest}
    >
      {children}
    </ul>
  ) : null;
};

export default DropdownList;
