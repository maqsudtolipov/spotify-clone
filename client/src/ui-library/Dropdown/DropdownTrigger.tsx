import { MouseEvent, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownTriggerProps {
  children: ReactNode;
}

const DropdownTrigger = ({ children, ...rest }: DropdownTriggerProps) => {
  const { toggleDropdown } = useContext(DropdownContext);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDropdown();
  };

  return (
    <div onClick={handleClick} {...rest}>
      {children}
    </div>
  );
};

export default DropdownTrigger;
