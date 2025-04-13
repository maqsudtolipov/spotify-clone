import { MouseEvent, ReactNode, useContext } from 'react';
import { DropdownContext } from './Dropdown.tsx';

interface DropdownTriggerProps {
  className?: string;
  children: ReactNode;
}

const DropdownTrigger = ({ className, children }: DropdownTriggerProps) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('DropdownTrigger should be used within the Dropdown');
  }

  const { toggleDropdown } = context;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleDropdown();
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default DropdownTrigger;
