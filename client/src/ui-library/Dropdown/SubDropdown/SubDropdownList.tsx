import { DropdownContext } from '../Dropdown.tsx';
import { useContext } from 'react';

interface SubDropdownListProps {
  name: string;
}

const SubDropdownList = ({ name }: SubDropdownListProps) => {
  const { openSub } = useContext(DropdownContext);

  return name === openSub ? (
    <p className="absolute top-0 right-0">yay</p>
  ) : null;
};

export default SubDropdownList;
