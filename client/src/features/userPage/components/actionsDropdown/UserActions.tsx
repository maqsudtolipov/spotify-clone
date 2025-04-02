import Dropdown, { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiFileCopyLine } from 'react-icons/ri';
import { handleCopyLink } from '../../../../helpers/handleCopyLink.ts';
import EditUserDialog from '../editUser/editUserDialog.tsx';
import { useContext } from 'react';

const UserDropdownList = () => {
  const { ignoreRef } = useContext(DropdownContext); // Outside click does not work inside ignoreRef

  return (
    <DropdownList position="bottom-right">
      <EditUserDialog ref={ignoreRef} />
      <DropdownItem PreIcon={RiFileCopyLine} onClick={handleCopyLink}>
        Copy link
      </DropdownItem>
    </DropdownList>
  );
};

const UserActions = () => {
  return (
    <Dropdown>
      <DropdownTrigger>click me</DropdownTrigger>
      <UserDropdownList />
    </Dropdown>
  );
};

export default UserActions;
