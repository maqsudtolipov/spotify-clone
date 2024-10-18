import styles from './Dropdown.module.scss';
import { createContext, useContext, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick.jsx';

const DropdownContext = createContext(null);

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((state) => !state);

  return (
    <DropdownContext.Provider
      value={{ isOpen, openDropdown, closeDropdown, toggleDropdown }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({ children }) => {
  const { toggleDropdown } = useContext(DropdownContext);

  const handleClick = (event) => {
    event.stopPropagation();
    toggleDropdown();
  };

  return <div onClick={handleClick}>{children}</div>;
};

const DropdownList = ({ children }) => {
  const { isOpen, closeDropdown } = useContext(DropdownContext);
  const ref = useOutsideClick(closeDropdown);

  return isOpen ? (
    <ul ref={ref} className={styles.list}>
      {children}
    </ul>
  ) : null;
};

// TODO: Add onClick prop
const DropdownItem = ({ children, underline = false, PreIcon, PostIcon }) => {
  const { closeDropdown } = useContext(DropdownContext);

  const handleClick = () => {
    closeDropdown();
  };

  return (
    <li
      className={`${styles.item} ${underline ? styles.underline : ''}`}
      onClick={handleClick}
    >
      {PreIcon && <PreIcon className={styles.icon} />}
      <span>{children}</span>
      {PostIcon && (
        <PostIcon className={`${styles.icon} ${styles.iconRight}`} />
      )}
    </li>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
