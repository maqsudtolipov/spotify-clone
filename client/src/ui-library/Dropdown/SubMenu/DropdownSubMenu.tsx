import styles from './DropdownSubMenu.module.scss';
import { DropdownContext } from '../Dropdown.tsx';
import { ReactNode, useContext } from 'react';

interface SubDropdownListProps {
  name: string;
  children: ReactNode;
}

const DropdownSubMenu = ({ name, children }: SubDropdownListProps) => {
  const { openSub } = useContext(DropdownContext);

  return name === openSub ? (
    <div className={styles.subDropdown}>
      <ul className={styles.subDropdownList}>{children}</ul>
    </div>
  ) : null;
};

export default DropdownSubMenu;
