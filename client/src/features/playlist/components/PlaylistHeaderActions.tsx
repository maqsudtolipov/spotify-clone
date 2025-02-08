import Dropdown from '../../../ui-library/Dropdown/Dropdown.tsx';
import DropdownTrigger from '../../../ui-library/Dropdown/DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiMoreFill } from 'react-icons/ri';
import styles from '../../../components/PlayHeader/PlayHeader.module.scss';
import DropdownList from '../../../ui-library/Dropdown/DropdownList.tsx';
import DropdownItem from '../../../ui-library/Dropdown/DropdownItem.tsx';
import { useAppDispatch } from '../../../app/hooks.ts';
import { deletePlaylist } from '../playlistThunks.ts';
import { useNavigate } from 'react-router-dom';

interface PlaylistHeaderActionsProps {
  id: string;
}

const PlaylistHeaderActions = ({ id }: PlaylistHeaderActionsProps) => {
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
        {/*<DropdownItem PreIcon={RiEditLine}>Edit Details</DropdownItem>*/}
        <DropdownItem
          PreIcon={RiDeleteBin6Line}
          underline={false}
          onClick={() => handleDeletePlaylist(id)}
        >
          Delete
        </DropdownItem>
        {/*<DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>*/}
      </DropdownList>
    </Dropdown>
  );
};

export default PlaylistHeaderActions;
