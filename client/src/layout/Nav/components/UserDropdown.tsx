import NavTooltip from './NavTooltip.jsx';
import Avatar, { AvatarFallback } from '../../../ui-library/Avatar/Avatar.tsx';
import Dropdown from '../../../ui-library/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';

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
