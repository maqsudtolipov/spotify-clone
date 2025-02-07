import styles from './DropdownSubMenu.module.scss';
import { DropdownContext } from '../Dropdown.tsx';
import { useContext } from 'react';
import DropdownSubItem from './DropdownSubItem.tsx';

interface SubDropdownListProps {
  name: string;
}

const DropdownSubMenu = ({ name }: SubDropdownListProps) => {
  const { openSub, closeDropdown } = useContext(DropdownContext);

  const handleSubClick = () => {
    closeDropdown();
  };

  return name === openSub ? (
    <div className={styles.subDropdown}>
      <ul className={styles.subDropdownList}>
        <DropdownSubItem onClick={handleSubClick}>One Playlist</DropdownSubItem>
        <DropdownSubItem onClick={handleSubClick}>Two Playlist</DropdownSubItem>
        <DropdownSubItem onClick={handleSubClick}>
          Three Playlist
        </DropdownSubItem>
      </ul>
    </div>
  ) : null;
};

export default DropdownSubMenu;
