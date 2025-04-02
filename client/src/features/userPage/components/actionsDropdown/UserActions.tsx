import Dropdown, { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiFileCopyLine } from 'react-icons/ri';
import { handleCopyLink } from '../../../../helpers/handleCopyLink.ts';
import EditUserDialog from '../editUserDialog.tsx';
import useOutsideClick from '../../../../hooks/useOutsideClick.tsx';
import { useContext } from 'react';

const UserDropdownList = () => {
  const { closeDropdown } = useContext(DropdownContext);
  const { ref, exceptionRef } = useOutsideClick(closeDropdown);

  return (
    <DropdownList ref={ref} position="bottom-right" removeOutsideClick={true}>
      <EditUserDialog ref={exceptionRef} />
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
