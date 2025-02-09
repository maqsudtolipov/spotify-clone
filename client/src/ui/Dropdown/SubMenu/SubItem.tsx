import { ReactNode, useContext } from 'react';
import styles from './SubItem.module.scss';
import { DropdownContext } from '../Dropdown.tsx';

interface DropdownSubItemProps {
  children: ReactNode;
}

const SubItem = ({ children }: DropdownSubItemProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('SubItem should be used within the Dropdown');
  }
  const { closeDropdown } = context;

  return (
    <li className={styles.subMenuItem} onClick={closeDropdown}>
      {children}
    </li>
  );
};

export default SubItem;
