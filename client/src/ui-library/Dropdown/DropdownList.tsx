import styles from './Dropdown.module.scss';
import { ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';
import useOutsideClick from '../../hooks/useOutsideClick.tsx';

interface DropdownListProps {
  children: ReactNode;
}

const DropdownList = ({ children }: DropdownListProps) => {
  const { isOpen, closeDropdown } = useContext(DropdownContext);
  const ref = useOutsideClick(closeDropdown);

  return isOpen ? (
    <ul ref={ref} className={styles.list}>
      {children}
    </ul>
  ) : null;
};

export default DropdownList;
