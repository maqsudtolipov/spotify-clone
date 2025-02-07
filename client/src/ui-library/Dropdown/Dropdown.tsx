import styles from './Dropdown.module.scss';
import { createContext, ReactNode, useState } from 'react';

interface DropdownContextValue {
  isOpen: boolean;
  openSub: string;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  openSubMenu: (name: string) => void;
  closeSubMenu: () => void;
}

export const DropdownContext = createContext<DropdownContextValue>(
  {} as DropdownContextValue,
);

interface DropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children, ...rest }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSub, setOpenSub] = useState('');

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => {
    setIsOpen(false);
    setOpenSub('');
  };
  const toggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      setOpenSub('');
    } else {
      setIsOpen(true);
    }
  };

  const openSubMenu = (name: string) => {
    // Closes on double click
    if (name === openSub) {
      setOpenSub('');
    } else {
      setOpenSub(name);
    }
  };
  const closeSubMenu = () => setOpenSub('');

  const contextValue = {
    isOpen,
    openSub,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    openSubMenu,
    closeSubMenu,
  };

  return (
    <DropdownContext.Provider value={contextValue} {...rest}>
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
