import Dropdown from '../Dropdown.tsx';
import DropdownTrigger from '../DropdownTrigger.tsx';
import { RiDeleteBin6Line, RiHeartFill, RiMoreFill, RiShareForwardBoxFill, RiUserHeartLine } from 'react-icons/ri';
import DropdownList from '../DropdownList.tsx';
import EditSongDialog from '../../../features/artist/components/editSong/EditSongDialog.tsx';
import DropdownItem from '../DropdownItem.tsx';
import AddToPlaylistItem from './AddToPlaylistItem.tsx';
import { useAppDispatch } from '../../../redux/hooks.ts';
import { deleteSong } from '../../../features/artist/artistThunks.ts';

interface SongActionsDropdownProps {
  id: string;
}

const SongActionsDropdown = ({ id }: SongActionsDropdownProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteSong = (id: string) => {
    dispatch(deleteSong(id));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <RiMoreFill />
      </DropdownTrigger>
      <DropdownList removeOutsideClick={true}>
        <EditSongDialog id={id} />
        <DropdownItem
          PreIcon={RiDeleteBin6Line}
          underline={true}
          onClick={() => handleDeleteSong(id)}
        >
          Delete
        </DropdownItem>
        <AddToPlaylistItem id={id} />
        <DropdownItem PreIcon={RiHeartFill}>Save to Liked Songs</DropdownItem>
        <DropdownItem PreIcon={RiShareForwardBoxFill}>Share</DropdownItem>
        <DropdownItem PreIcon={RiUserHeartLine}>Go to Artist</DropdownItem>
      </DropdownList>
    </Dropdown>
  );
};

export default SongActionsDropdown;
