import Dropdown from '../../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiFileCopyLine } from 'react-icons/ri';
import { handleCopyLink } from '../../../../helpers/handleCopyLink.ts';

const UserActions = () => {
  return (
    <Dropdown>
      <DropdownTrigger>click me</DropdownTrigger>

      <DropdownList position="bottom-right" removeOutsideClick={true}>
        <DropdownItem PreIcon={RiFileCopyLine} onClick={handleCopyLink}>
          Copy link
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default UserActions;
