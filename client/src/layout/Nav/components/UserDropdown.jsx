import Dropdown from '../../../ui-library/Dropdown/Dropdown.jsx';
import NavTooltip from './NavTooltip.jsx';
import Avatar, { AvatarFallback } from '../../../ui-library/Avatar/Avatar.tsx';

const UserDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <NavTooltip
          trigger={
            <Avatar>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
          }
          position="bottom-left"
          content="Maqsud Tolipov"
        />
      </Dropdown.Trigger>

      <Dropdown.List>
        <Dropdown.Item>Home</Dropdown.Item>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item underline={true}>Settings</Dropdown.Item>
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
};

export default UserDropdown;
