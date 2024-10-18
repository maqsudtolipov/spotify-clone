import styles from './Dropdown.module.scss';
import { createContext, useContext, useState } from 'react';

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

  return <div onClick={toggleDropdown}>{children}</div>;
};

const DropdownList = ({ children }) => {
  const { isOpen } = useContext(DropdownContext);

  return isOpen ? <ul className={styles.list}>{children}</ul> : null;
};

const DropdownItem = ({ children, underline = false }) => (
  <li className={`${styles.item} ${underline ? styles.underline : ''}`}>
    {children}
  </li>
);

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
