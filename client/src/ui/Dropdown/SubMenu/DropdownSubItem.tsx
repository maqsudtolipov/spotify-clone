import { ReactNode, useContext } from 'react';
import styles from './DropdownSubMenu.module.scss';
import { DropdownContext } from '../Dropdown.tsx';

interface DropdownSubItemProps {
  children: ReactNode;
}

const DropdownSubItem = ({ children }: DropdownSubItemProps) => {
  const { closeDropdown } = useContext(DropdownContext);

  return (
    <li className={styles.subDropdownItem} onClick={closeDropdown}>
      {children}
    </li>
  );
};

export default DropdownSubItem;
