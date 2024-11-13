import { createContext, ReactNode, useState } from 'react';

interface DropdownContextValue {
  isOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
}

export const DropdownContext = createContext<DropdownContextValue>(
  {} as DropdownContextValue,
);

interface DropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((state) => !state);

  const contextValue = {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
