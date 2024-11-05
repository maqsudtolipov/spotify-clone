import Button from '../../../ui-library/Button/Button.jsx';
import NavTooltip from './NavTooltip.jsx';
import NavButton from './NavButton.jsx';
import { RiNotification3Line } from 'react-icons/ri';
import UserDropdown from './UserDropdown.jsx';

const UserActions = () => {
  return (
    <div className="flex items-center gap-4">
      <Button>Login</Button>
      <NavTooltip
        trigger={
          <NavButton
            isTransparent={true}
            isSmall={true}
            icon={<RiNotification3Line />}
          />
        }
        position="bottom"
        content="Whats New"
      />
      <UserDropdown />
    </div>
  );
};

export default UserActions;
