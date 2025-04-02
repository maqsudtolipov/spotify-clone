import Dropdown from '../../../ui/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../ui/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiFileCopyLine, RiMoreFill } from 'react-icons/ri';
import styles from './PlaylistActions.module.scss';
import DropdownList from '../../../ui/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui/Dropdown/DropdownItem.tsx';
import { useAppDispatch } from '../../../redux/hooks.ts';
import { deletePlaylist } from '../playlistThunks.ts';
import { useNavigate } from 'react-router-dom';
import EditPlaylistDialog from './editPlaylistDialog/EditPlaylistDialog.tsx';
import { handleCopyLink } from '../../../helpers/handleCopyLink.ts';

interface PlaylistHeaderActionsProps {
  id: string;
  isPersonalPlaylist: boolean;
}

const PlaylistHeaderActions = ({
  id,
  isPersonalPlaylist,
}: PlaylistHeaderActionsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeletePlaylist = async (id: string) => {
    await dispatch(deletePlaylist({ id }));
    navigate('/');
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <RiMoreFill className={styles.actionsButton} role="button" />
      </DropdownTrigger>

      <DropdownList position="bottom-right">
        <EditPlaylistDialog />
        {isPersonalPlaylist && (
          <DropdownItem
            PreIcon={RiDeleteBin6Line}
            underline={true}
            onClick={() => handleDeletePlaylist(id)}
          >
            Delete
          </DropdownItem>
        )}

        <DropdownItem PreIcon={RiFileCopyLine} onClick={handleCopyLink}>
          Copy link
        </DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default PlaylistHeaderActions;
