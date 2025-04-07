import Dropdown, { DropdownContext } from '../../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../../ui/Dropdown/DropdownTrigger.tsx';
import DropdownList from '../../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../../ui/Dropdown/DropdownItem.tsx';
import { RiFileCopyLine, RiMoreFill } from 'react-icons/ri';
import { handleCopyLink } from '../../../../helpers/handleCopyLink.ts';
import EditUserDialog from '../editUserDialog/editUserDialog.tsx';
import { useContext } from 'react';
import { useAppSelector } from '../../../../redux/hooks.ts';
import styles from '../../../playlist/components/PlaylistActions.module.scss';

const UserDropdownList = ({ profileId }: { profileId: string }) => {
  const contextValue = useContext(DropdownContext);
  if (!contextValue)
    throw new Error('UserDropdownList requires DropdownContext value.');

  const id = useAppSelector((state) => state?.user?.data?.id) || '';

  const { ignoreRef } = contextValue; // Outside click does not work inside ignoreRef

  return (
    <DropdownList position="bottom-right">
      {id === profileId && <EditUserDialog ref={ignoreRef} />}
      <DropdownItem PreIcon={RiFileCopyLine} onClick={handleCopyLink}>
        Copy link
      </DropdownItem>
    </DropdownList>
  );
};

const UserActions = ({ id }: { id: string }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <RiMoreFill className={styles.actionsButton} role="button" />
      </DropdownTrigger>
      <UserDropdownList profileId={id} />
    </Dropdown>
  );
};

export default UserActions;
