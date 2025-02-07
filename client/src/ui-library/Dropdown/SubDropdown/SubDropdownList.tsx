import styles from './SubDropdown.module.scss';
import { DropdownContext } from '../Dropdown.tsx';
import { useContext } from 'react';

interface SubDropdownListProps {
  name: string;
}

const SubDropdownList = ({ name }: SubDropdownListProps) => {
  const { openSub, closeDropdown } = useContext(DropdownContext);

  // Dropdown closes on sub item clicks
  const handleSubClick = (e: MouseEvent) => {
    e.preventDefault();
    closeDropdown();
  };

  return name === openSub ? (
    <div className={styles.subDropdown}>
      <ul className={styles.subDropdownList}>
        <li className={styles.subDropdownItem}>One Playlist</li>
        <li className={styles.subDropdownItem}>Two Playlist</li>
        <li className={styles.subDropdownItem}>Three Playlist</li>
      </ul>
    </div>
  ) : null;
};

export default SubDropdownList;
