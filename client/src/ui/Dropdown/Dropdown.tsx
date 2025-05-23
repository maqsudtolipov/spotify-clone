import styles from './Dropdown.module.scss';
import { createContext, ReactNode, Ref, useRef, useState } from 'react';

interface DropdownContextValue {
  isOpen: boolean;
  openSub: string;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  openSubMenu: (name: string) => void;
  closeSubMenu: () => void;
  ignoreRef: Ref<HTMLDivElement | HTMLUListElement | null>;
}

interface DropdownProps {
  children: ReactNode;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSub, setOpenSub] = useState('');

  const ignoreRef = useRef(null); // useOutside click ignores this ref, used for bugs with portals

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
    name === openSub ? setOpenSub('') : setOpenSub(name);
  };
  const closeSubMenu = () => setOpenSub('');

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        openSub,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        openSubMenu,
        closeSubMenu,
        ignoreRef,
      }}
    >
      <div className={styles.dropdown}>{children}</div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
