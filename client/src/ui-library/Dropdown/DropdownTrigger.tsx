import { MouseEvent, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownTriggerProps {
  children: ReactNode;
}

const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
  const { toggleDropdown } = useContext(DropdownContext);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDropdown();
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default DropdownTrigger;
