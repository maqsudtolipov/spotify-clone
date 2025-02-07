import { ReactNode } from 'react';
import styles from './DropdownSubMenu.module.scss';

interface DropdownSubItemProps {
  onClick?: () => void;
  children: ReactNode;
}

const DropdownSubItem = ({ onClick, children }: DropdownSubItemProps) => {
  return (
    <li className={styles.subDropdownItem} onClick={onClick}>
      {children}
    </li>
  );
};

export default DropdownSubItem;
