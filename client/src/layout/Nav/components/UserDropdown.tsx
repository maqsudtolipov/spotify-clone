import NavTooltip from './NavTooltip.jsx';
import { Avatar, AvatarFallback } from '../../../ui/Avatar/Avatar.tsx';
import Dropdown from '../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';

const UserDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <NavTooltip
          trigger={
            <Avatar>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          }
          position="bottom-left"
          content="Maqsud Tolipov"
        />
      </DropdownTrigger>

      <DropdownList>
        <DropdownItem>Home</DropdownItem>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem underline={true}>Settings</DropdownItem>
        <DropdownItem>Logout</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default UserDropdown;
