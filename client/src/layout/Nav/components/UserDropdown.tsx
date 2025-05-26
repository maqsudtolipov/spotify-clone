import NavTooltip from './NavTooltip.jsx';
import Dropdown from '../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks.ts';
import { logout } from '../../../features/user/userThunks.ts';
import { User } from '../../../features/user/userTypes.ts';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const data = useAppSelector((state) => state.user.data) as User;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <NavTooltip
          trigger={
            <div className="size-12 p-1 flex items-center justify-center bg-neutral-800 rounded-full overflow-hidden select-none cursor-pointer">
              <img
                src={data.img.url}
                alt={`${data.name} profile photo`}
                className="rounded-full"
              />
            </div>
            // <Avatar>
            //   <AvatarFallback>M</AvatarFallback>
            // </Avatar>
          }
          position="bottom-left"
          content={data.name}
        />
      </DropdownTrigger>

      <DropdownList>
        <DropdownItem>Home</DropdownItem>
        <DropdownItem onClick={() => navigate(`/${data.role}/${data.id}`)}>
          Profile
        </DropdownItem>
        <DropdownItem underline={true}>Settings</DropdownItem>
        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default UserDropdown;
