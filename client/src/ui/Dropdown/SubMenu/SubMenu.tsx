import styles from './SubMenu.module.scss';
import { DropdownContext } from '../Dropdown.tsx';
import { ReactNode, useContext } from 'react';

interface SubDropdownListProps {
  name: string;
  children: ReactNode;
}

const SubMenu = ({ name, children }: SubDropdownListProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('SubMenu should be used within the Dropdown');
  }
  const { openSub } = context;

  if (name !== openSub) return null;

  return (
    <div className={styles.subMenu}>
      <ul className={styles.subMenuList}>{children}</ul>
    </div>
  );
};

export default SubMenu;
